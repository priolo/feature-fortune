import { AccountRepo } from "@/repository/Account.js";
import { PROVIDER_NAME, ProviderRepo } from "@/repository/Provider.js";
import { OAuthApp } from "@octokit/oauth-app";
import { Bus, httpRouter, jwt, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { FindManyOptions } from "typeorm";



// Configurazione OAuthApp
const githubOAuth = new OAuthApp({
	clientType: "oauth-app",
	clientId: process.env.GITHUB_CLIENT_ID!,
	clientSecret: process.env.GITHUB_CLIENT_SECRET!,
});


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
				{ path: "/register", verb: "get", method: "register" },
				{ path: "/callback", verb: "get", method: "callback" },
			]
		}
	}

	/** 
	 * Login → redirect verso GitHub
	 */
	login(req: Request, res: Response) {
		const url = githubOAuth.getWebFlowAuthorizationUrl({
			scopes: ["read:user", "user:email"],
			state: customDataToUrl({ act: "lgn", }),
		});
		res.json({ url: url.url })
	}

	/**
	 * Register → redirect verso GitHub
	 */
	register(req: Request, res: Response) {
		const url = githubOAuth.getWebFlowAuthorizationUrl({
			scopes: ["read:user", "user:email"],
			state: customDataToUrl({ act: "rgs", }),
		});
		res.json({ url: url.url })
	}

	/** 
	 * Callback → GitHub ritorna con `code` 
	 */
	async callback(req: Request, res: Response) {
		const { code, error, state } = req.query as { code: string, error: string, state: string }
		if (error) return res.status(400).json({ error: `GitHub OAuth error: ${error}` });
		if (!code) return res.status(400).json({ error: "No authorization code received" });

		const customData = urlToCustomData(state)
		if (["lgn", "rgs"].includes(customData?.act) === false) {
			return res.status(400).json({ error: "Invalid state parameter" });
		}

		try {

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


			let user: AccountRepo

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
					type: typeorm.RepoRestActions.SAVE,
					payload: <AccountRepo>{
						email: userGithub.email ?? userGithub.notification_email ?? userGithub.login,
						name: userGithub.name || userGithub.login,
						avatarUrl: userGithub.avatar_url,
						githubId: userGithub.id,
						description: userGithub.bio || "",
						// password, salt lasciano vuoti perch' l'accesso avviene SOLO via GITHUB
					}
				})
			}

			// cancello eventuali vecchi PROVIDER
			await new Bus(this, "/typeorm/providers").dispatch({
				type: typeorm.RepoRestActions.DELETE,
				payload: <ProviderRepo>{
					name: PROVIDER_NAME.GITHUB,
					accountId: user.id,
				}
			})

			// inserisco il PROVIDER per questo USER
			await new Bus(this, "/typeorm/providers").dispatch({
				type: typeorm.RepoRestActions.SAVE,
				payload: <ProviderRepo>{
					name: PROVIDER_NAME.GITHUB,
					key: authentication.token,
					accountId: user.id,
				}
			})

			// Genera il token JWT con l'email nel payload
			const jwtToken = await new Bus(this, "/jwt").dispatch({
				type: jwt.Actions.ENCODE,
				payload: {
					payload: {
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
			if ( customData?.act === "lgn" ) {
				res.redirect(`${process.env.FRONTEND_URL}/app/`);	
			} else {
				res.redirect(`${process.env.FRONTEND_URL}/register/`);
			}

		} catch (err) {
			res.status(400).json({ error: "Authentication failed", details: "Unknown error" });
		}
	}

}

export default AuthGithubRoute


function customDataToUrl(customData: any) {
	if (!customData) return null;
	return Buffer.from(JSON.stringify(customData)).toString('base64');
}

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

type CustomData = {
	act?: "lgn" | "rgs",
}