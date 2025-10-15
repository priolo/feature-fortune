import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { FindManyOptions, Like } from "typeorm";
import { AccountRepo, accountSendable } from "../repository/Account.js";



/**
 * tutto sugli Account del progetto
 */
class AccountRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/accounts",
			account_repo: "/typeorm/accounts",
			routers: [
				{ path: "/", verb: "get", method: "getAll" },
				{ path: "/:id", verb: "get", method: "getById" },
				{ path: "/github/:id", verb: "get", method: "getByGithubUserId" },
			]
		}
	}
	declare state: typeof this.stateDefault


	async getAll(req: Request, res: Response) {
		const { text } = req.query as { text?: string };

		let findOptions: FindManyOptions<AccountRepo> = {
			take: 10  // Limit to 10 results
		};

		// If text filter is provided, search in text properties
		if (text && text.trim()) {
			const searchText = `%${text.trim()}%`;
			findOptions.where = [
				{ name: Like(searchText) },
				{ email: Like(searchText) },
				{ googleEmail: Like(searchText) }
			];
		}

		const accounts = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: findOptions
		});

		res.json(accounts);
	}

	async getById(req: Request, res: Response) {
		const id = req.params["id"];

		const account: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: id
		});
		if (!account) return res.status(404).json({ error: "Account not found" });

		res.json(account);
	}

	/**
	 * Return the ACCOUNT, if exist, by the GITHUB user id
	 */
	async getByGithubUserId(req: Request, res: Response) {
		const githubId = parseInt(req.params.id)
		const account: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				where: { githubId: githubId },
			}
		})
		res.json({
			account: accountSendable(account),
		})
	}

}

export default AccountRoute


