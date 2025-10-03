import { AccountRepo } from "@/repository/Account.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { customDataToUrl, githubOAuth } from "./AuthGithubRoute.js";
import { client } from "./AuthGoogleRoute.js";
import { FindManyOptions } from "typeorm";



class AccountRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/accounts",
			repository: "/typeorm/accounts",
			account_repo: "/typeorm/accounts",
			routers: [
				{ path: "/github/link", verb: "get", method: "getUrlAttachGithub" },
				{ path: "/github/:id", verb: "get", method: "getAccountGithub" },
				{ path: "/github", verb: "delete", method: "detachGithub" },

				{ path: "/google", verb: "post", method: "attachGoogle" },


			]
		}
	}


	async getUrlAttachGithub(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });

		const url = githubOAuth.getWebFlowAuthorizationUrl({
			scopes: ["read:user", "user:email"],
			state: customDataToUrl({
				act: "att",
				accountId: user.id
			}),
		});
		res.json({ url: url.url })
	}

	/**
	 * Return the ACCOUNT, if exist, owner of the GITHUB repo
	 */
	async getAccountGithub(req: Request, res: Response) {
		const githubId = parseInt(req.params.id)
		
		const account: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				where: { githubId: githubId },
			}
		})
		if (!account) return res.status(404).json({ error: "Account not found" });
		res.json({ account })
	}

	async detachGithub(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]

		await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.RepoRestActions.SAVE,
			payload: <Partial<AccountRepo>>{
				id: userJwt.id,
				githubId: null,
			},
		})

		res.send({ success: true })
	}


	/** eseguo il login con GOOGLE */
	async attachGoogle(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.RepoRestActions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });



		const { token } = req.body;
		try {

			// Verifico GOOGLE token e ricavo PAYLOAD
			const ticket = await client.verifyIdToken({
				idToken: token,
				audience: process.env.GOOGLE_CLIENT_ID,
			});
			const payload = ticket.getPayload();

			// se è gia' settato come email google allora tutto ok
			if (user.googleEmail === payload.email) {
				return res.status(200).json({ user });
			}

			// cerco lo USER tramite l'email
			const userDuplicate: AccountRepo = await new Bus(this, this.state.repository).dispatch({
				type: typeorm.Actions.FIND_ONE,
				payload: <FindManyOptions<AccountRepo>>{
					where: { googleEmail: payload.email },
				}
			})
			
			// se c'e' allora l'email è gia' utilizzata
			if (!!userDuplicate) {
				return res.status(400).json({ error: "Email already in use" });
			}

			await new Bus(this, this.state.account_repo).dispatch({
				type: typeorm.RepoRestActions.SAVE,
				payload: <Partial<AccountRepo>>{
					id: userJwt.id,
					googleEmail: payload.email,
				},
			})
			res.status(200).json({ user });

		} catch (error) {
			res.status(401).json({ error: 'Invalid Token' });
		}
	}

}

export default AccountRoute


