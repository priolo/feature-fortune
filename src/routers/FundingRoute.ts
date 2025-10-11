import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { AccountRepo } from "../repository/Account.js";
import { FUNDING_STATE, FundingRepo } from "../repository/Funding.js";



class FundingRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/fundings",
			repository: "/typeorm/fundings",
			account_repo: "/typeorm/accounts",
			stripe_service: "/stripe",
			routers: [
				{ path: "/", verb: "post", method: "create" },
			]
		}
	}
	declare state: typeof this.stateDefault


	/**
	 * 
	 */
	async create(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { funding }: { funding: FundingRepo } = req.body
		if (!funding) return

		// è sempre nuovo
		delete funding.id
		funding.accountId = userJwt.id
		funding.status = FUNDING_STATE.PENDING

		// salvo
		const fundingNew: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.SAVE,
			payload: funding
		})

		res.json({ funding: fundingNew })
	}

}


export default FundingRoute


