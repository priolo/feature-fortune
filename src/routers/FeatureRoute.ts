import Stripe from "stripe";
import { AccountRepo } from "../repository/Account.js";
import { CommentRepo } from "../repository/Comment.js";
import { FeatureRepo } from "../repository/Feature.js";
import { FundingRepo } from "../repository/Funding.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { FindManyOptions, FindOptionsWhere } from "typeorm";



class FeatureRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/features",
			feature_repo: "/typeorm/features",
			comment_repo: "/typeorm/comments",
			routers: [
				{ path: "/", verb: "get", method: "getAll" },
				{ path: "/:id", verb: "get", method: "getById" },
				{ path: "/", verb: "post", method: "save" },
				{ path: "/:id", verb: "delete", method: "delete" },
				{ path: "/:id", verb: "patch", method: "update" }
			]
		}
	}
	declare state: typeof this.stateDefault

	async getAll(req: Request, res: Response) {

		const features = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.ALL,
			payload: <FindManyOptions<FeatureRepo>>{
				relations: {
					fundings: { account: true }
				},
				select: {
					fundings: {
						id: true, amount: true, currency: true, status: true,
						account: { id: true, name: true, avatarUrl: true }
					}
				}
			}
		})

		// const userJwt: AccountRepo = req["jwtPayload"]
		// const myId = userJwt?.id
		// const { filter } = req.query as { filter: FEATURE_API_FILTER };

		// const where: FindOptionsWhere<FeatureRepo> = {}
		// if (filter == FEATURE_API_FILTER.MY) where.accountId = myId
		// else if (filter == FEATURE_API_FILTER.DEVELOPED) where.accountDevId = myId
		// else if (filter == FEATURE_API_FILTER.FINANCED) where.fundings = { accountId: myId }

		// const features = await new Bus(this, this.state.feature_repo).dispatch({
		// 	type: typeorm.Actions.FIND,
		// 	payload: <FindManyOptions<FeatureRepo>>{
		// 		where,
		// 		relations: {
		// 			fundings: { account: true }
		// 		},
		// 		select: {
		// 			fundings: {
		// 				id: true, amount: true, currency: true, status: true,
		// 				account: { id: true, name: true, avatarUrl: true }
		// 			}
		// 		}
		// 	}
		// })

		res.json({ features })
	}

	async getById(req: Request, res: Response) {
		const id = req.params["id"]

		const feature: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: {
				where: { id: id },
				//relations: { fundings: true }
			}
		})

		// const comments: CommentRepo[] = await new Bus(this, this.state.comment_repo).dispatch({
		// 	type: typeorm.Actions.FIND,
		// 	payload: {
		// 		where: { entityId: id, entityType: 'feature' },
		// 		//relations: { account: true }
		// 	}
		// })
		// feature.comments = comments

		res.json(feature)
	}


	async save(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		let { feature }: { feature: FeatureRepo } = req.body
		if (!feature) return res.status(400).json({ error: "Feature data is required" })
		feature.accountId = userJwt.id

		// se è nuovo lo creo
		if (feature.id == null) {
			delete feature.id

			// verifico che lo possa modificare
		} else {
			const featureOld: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
				type: typeorm.Actions.GET_BY_ID,
				payload: feature.id
			})
			if (!featureOld) return res.status(404).json({ error: "Feature not found" })
			if (featureOld.accountId !== userJwt.id) return res.status(403).json({ error: "You are not allowed to modify this feature" })
		}

		// non si possono modificare COMMENT e FUNDING
		delete feature.comments
		delete feature.fundings

		// salvo
		const featureNew: AccountRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: feature
		})

		res.json(featureNew)
	}

	async delete(req: Request, res: Response) {
		const id = req.params["id"]
		await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.DELETE,
			payload: id
		})
		res.json({ data: "ok" })
	}

	async update(req: Request, res: Response) {
		const id = req.params["id"]
		const { feature }: { feature: FeatureRepo } = req.body
		if (!id || !feature) return
		const featureUp = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: feature,
		})
		res.json(featureUp)
	}
}

export default FeatureRoute


enum FEATURE_API_FILTER {
	RECENT = "recent",
	MY = "my",
	FINANCED = "financed",
	DEVELOPED = "developed",
}