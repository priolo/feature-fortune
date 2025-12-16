import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import { AccountRepo } from "../repository/Account.js";
import { FUNDING_STATUS, FundingRepo } from "../repository/Funding.js";
import { paymentCheck } from "../services/stripe/utils.js";



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
				{ path: "/:id", verb: "delete", method: "delete" },
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

	async save(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		let { funding }: { funding: FundingRepo } = req.body

		// check
		if (!funding) return res.status(400).json({ error: "Funding data is required" })
		if (!funding.featureId) return res.status(400).json({ error: "Feature ID is required" })
		const error = paymentCheck(funding.amount, funding.currency)
		if (!!error) throw new Error(error)

		// è sempre nuovo un FUNDING non puo' essere modificato
		const fundingNew: FundingRepo = {
			accountId: userJwt.id,
			status: FUNDING_STATUS.PENDING,
			amount: funding.amount,
			currency: funding.currency,
			featureId: funding.featureId,
			message: funding.message,
		}

		// salvo
		const fundingNewDb: FundingRepo = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: fundingNew
		})

		res.json({ funding: fundingNewDb })
	}

	async delete(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		const id = req.params["id"]
		if (!id) return res.status(400).json({ error: "Missing id parameter" })

		// fetch
		const funding: FundingRepo = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: id
		})

		// check
		if (!funding) {
			return res.status(404).json({ error: "Funding not found" })
		}
		if (funding.accountId !== userJwt.id) {
			return res.status(403).json({ error: "You are not the owner of this funding" })
		}

		// update
		const fundingUpdate: FundingRepo = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: {
				id: funding.id,
				status: FUNDING_STATUS.CANCELLED,
			}
		})

		// return
		res.json({ success: true })
	}

}


export default FundingRoute


