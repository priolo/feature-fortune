import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { AccountRepo } from "../repository/Account.js";
import { customDataToUrl, githubOAuth } from "./AuthGithubRoute.js";



class GithubRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/github",
			account_repo: "/typeorm/accounts",
			routers: [
				{ path: "/link", verb: "get", method: "getUrlAttachGithub" },
				{ path: "/", verb: "delete", method: "detachGithub" },
			]
		}
	}
	declare state: typeof this.stateDefault

	/**
	 * Sono loggato e voglio collegare il mio account GITHUB
	 */
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

	async detachGithub(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]

		await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: <Partial<AccountRepo>>{
				id: userJwt.id,
				githubId: null,
			},
		})

		res.send({ success: true })
	}

}

export default GithubRoute


