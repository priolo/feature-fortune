import { AccountRepo } from "@/repository/Account.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { customDataToUrl, githubOAuth } from "./AuthGithubRoute.js";



class AccountRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/accounts",
			repository: "/typeorm/accounts",
			account_repo: "/typeorm/accounts",
			routers: [
				{ path: "/github", verb: "get", method: "getUrlAttachGithub" },
				{ path: "/github", verb: "delete", method: "detachGithub" },
			]
		}
	}

	async getUrlAttachGithub(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.RepoRestActions.GET_BY_ID,
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
			type: typeorm.RepoRestActions.SAVE,
			payload: <Partial<AccountRepo>>{
				id: userJwt.id,
				githubId: null,
			},
		})

		res.send({ success: true })
	}
}

export default AccountRoute


