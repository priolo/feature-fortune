import { AccountRepo, JWTPayload } from "../repository/Account.js";
import { OAuthApp } from "@octokit/oauth-app";
import { Bus, httpRouter, jwt, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { FindManyOptions } from "typeorm";



class AuthGithubRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/api/auth/github",
			email: "/email",
			account_repo: "/typeorm/accounts",
			provider_repo: "/typeorm/providers",
			jwt: "/jwt",
			routers: [
				{ path: "/login", verb: "get", method: "login" },
				{ path: "/callback", verb: "get", method: "callback" },
			]
		}
	}

	/** 
	 * Login/register with GITHUB
	 * non sono loggato quindi effettuo login/register con GITHUB
	 * GITHUB risponde al callback con `code`
	 */
	login(req: Request, res: Response) {
		const url = githubOAuth.getWebFlowAuthorizationUrl({
			scopes: ["read:user", "user:email"],
			state: customDataToUrl({ act: "lgn", }),
		});
		res.json({ url: url.url })
	}

	/** 
	 * WEBHOOK 
	 * https://github.com/settings/applications/3174659
	 * LOGIN/REGISTER GitHub ritorna con `code` 
	 */
	async callback(req: Request, res: Response) {
		const { code, error, state } = req.query as { code: string, error: string, state: string }
		if (error) return res.status(400).json({ error: `GitHub OAuth error: ${error}` });
		if (!code) return res.status(400).json({ error: "No authorization code received" });

		const customData = urlToCustomData(state)
		if (["lgn", "rgs", "att"].includes(customData?.act) === false) {
			return res.status(400).json({ error: "Invalid state parameter" });
		}

		try {
			const userGithub: any = await this.getGithubUserByCode(code)
			let user: AccountRepo

			// ATTACH to existing user
			if (customData.act == "att") {
				if (!customData.accountId) return res.status(400).json({ error: "Invalid state parameter: no accountId" });
				// cerco lo USER se è gia' registrato
				user = await new Bus(this, this.state.account_repo).dispatch({
					type: typeorm.Actions.GET_BY_ID,
					payload: customData.accountId,
				})
				if (!user) return res.status(404).json({ error: "User not found" });

				// LOGIN or REGISTER
			} else {

				// cerco lo USER se è gia' registrato
				user = await new Bus(this, this.state.account_repo).dispatch({
					type: typeorm.Actions.FIND_ONE,
					payload: <FindManyOptions<AccountRepo>>{
						where: { githubId: userGithub.id, },
					}
				})
				
				// se non c'e allora creo un nuovo USER
				if (!user) {
					user = await new Bus(this, this.state.account_repo).dispatch({
						type: typeorm.Actions.SAVE,
						payload: <AccountRepo>{
							email: userGithub.email ?? userGithub.notification_email,
							name: userGithub.name || userGithub.login,
							avatarUrl: userGithub.avatar_url,
							githubId: userGithub.id,
						}
					})
				}
			}

			// manca githubId lo aggiorno
			if (!user.githubId) {
				user = await new Bus(this, this.state.account_repo).dispatch({
					type: typeorm.Actions.SAVE,
					payload: <AccountRepo>{
						id: user.id,
						githubId: userGithub.id,
					}
				})
			}

			// Genera il token JWT con l'email nel payload
			const jwtToken = await new Bus(this, "/jwt").dispatch({
				type: jwt.Actions.ENCODE,
				payload: {
					payload: <JWTPayload>{
						id: user.id,
						email: user.email,
						name: user.name,
					}
				},
			})

			// memorizzo JWT nei cookies. Imposta il cookie HTTP-only
			res.cookie('jwt', jwtToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production', // Assicurati di usare secure solo in produzione
				maxAge: 24 * 60 * 60 * 1000, // 1 giorno
			});

			// Redirect alla pagina desiderata
			if (customData?.act === "lgn") {
				res.redirect(process.env.GITHUB_WEBHOOK_LOGIN)
			} else {
				res.redirect(process.env.GITHUB_WEBHOOK_REGISTER)
			}

		} catch (err) {
			res.status(400).json({ error: "Authentication failed", details: "Unknown error" });
		}
	}

	/**
	 * Utente GITHUB tramite il `code` ricevuto da GITHUB in fase di callback
	 */
	private async getGithubUserByCode(code: string) {
		// creo il token di accesso e recupero info utente
		const { authentication } = await githubOAuth.createToken({ code });
		const response = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${authentication.token}`,
				"User-Agent": "feature-fortune-app",
				"Accept": "application/vnd.github.v3+json"
			},
		});
		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
		}
		const userGithub: any = await response.json();
		return userGithub
	}

}

export default AuthGithubRoute


/**
 * lib di GITHUB OAUTH
 */
export const githubOAuth = new OAuthApp({
	clientType: "oauth-app",
	clientId: process.env.GITHUB_CLIENT_ID!,
	clientSecret: process.env.GITHUB_CLIENT_SECRET!,
});

/**
 * codifica customData in BASE64 per passaggio nello state di OAuth
 */
export function customDataToUrl(customData: any) {
	if (!customData) return null;
	return Buffer.from(JSON.stringify(customData)).toString('base64');
}

/**
 * decodifica customData da BASE64 passata nello state di OAuth
 */
function urlToCustomData(state: string): CustomData | null {
	if (!state) return null;
	try {
		const decodedState = Buffer.from(state, 'base64').toString('utf-8');
		return JSON.parse(decodedState);
	} catch (err) {
		console.error("Failed to decode state parameter:", err);
	}
	return null
}

export type CustomData = {
	act?: "lgn" | "rgs" | "att",
	accountId?: string,
}