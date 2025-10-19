import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { AccountRepo } from "../repository/Account.js";
import { FUNDING_STATUS, FundingRepo } from "../repository/Funding.js";
import { FindManyOptions } from "typeorm";



class FundingRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/fundings",
			funding_repo: "/typeorm/fundings",
			account_repo: "/typeorm/accounts",
			stripe_service: "/stripe",
			routers: [
				{ path: "/", verb: "get", method: "index" },
				{ path: "/", verb: "post", method: "save" },
			]
		}
	}
	declare state: typeof this.stateDefault

	async index(req: Request, res: Response) {
		const { featureId } = req.query as { featureId?: string };

		// If no featureId filter is provided, return empty array
		if (!featureId) {
			return res.json({ fundings: [] });
		}

		// Get fundings filtered by feature ID
		const fundings: FundingRepo[] = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: <FindManyOptions<FundingRepo>>{
				where: {
					featureId: featureId
				},
				relations: {
					account: true
				},
				select: {
					account: {
						id: true,
						name: true,
						avatarUrl: true
					}
				},
				order: { createdAt: 'DESC' }  // Order by creation date, newest first
			}
		});

		res.json({ fundings });
	}

	/**
	 * 
	 */
	async save(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { funding }: { funding: FundingRepo } = req.body
		if (!funding) return

		// è sempre nuovo
		delete funding.id
		funding.accountId = userJwt.id
		funding.status = FUNDING_STATUS.PENDING

		// salvo
		const fundingNew: AccountRepo = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: funding
		})

		res.json({ funding: fundingNew })
	}

}


export default FundingRoute


