import Stripe from "stripe";
import { AccountRepo } from "../repository/Account.js";
import { CommentRepo } from "../repository/Comment.js";
import { FEATURE_STATUS, FeatureRepo } from "../repository/Feature.js";
import { FundingRepo } from "../repository/Funding.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { FindManyOptions, FindOptionsWhere } from "typeorm";
import MessageRoute from "./MessageRoute.js";



class FeatureRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/features",
			feature_repo: "/typeorm/features",
			comment_repo: "/typeorm/comments",
			message_route: "/http/routers/public/messages",
			routers: [
				{ path: "/", verb: "get", method: "getAll" },
				{ path: "/:id", verb: "get", method: "getById" },
				{ path: "/", verb: "post", method: "create" },
				{ path: "/", verb: "patch", method: "update" },
				{ path: "/:id", verb: "delete", method: "delete" },

				{ path: "/:id/engagement", verb: "post", method: "engagement" },
				{ path: "/:id/leave", verb: "post", method: "leave" },
				{ path: "/:id/released", verb: "post", method: "released" },
				{ path: "/:id/cancelled", verb: "post", method: "cancelled" },
				{ path: "/:id/completed", verb: "post", method: "completed" },

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


	/**
	 * Chiamata dall'AUTHOR
	 * Creo una nuova FEATURE
	 * (new) -> PROPOSED
	 */
	async create(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		let { feature }: { feature: FeatureRepo } = req.body
		if (!feature) return res.status(400).json({ error: "Feature data is required" })

		// preparo la FEATURE
		feature.accountId = userJwt.id
		delete feature.id
		delete feature.status
		delete feature.comments
		delete feature.fundings

		// se c'e' un DEV gli mando un messaggio
		if (!!feature.accountDevId) {
			const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
			await messageService.sendMessage(
				null,
				feature.accountDevId,
				`Hello,\n\nYou have been assigned as the developer for the feature titled "${feature.title}". Please log in to your account to view the details and get started.\n\nBest regards,\nFeature Fortune Team`
			)
		}

		// salvo
		const featureNew: AccountRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: feature
		})

		res.json({ feature: featureNew })
	}

	/**
	 * Chiamata dall'AUTHOR
	 * Permette di aggiornare alcuni campi della FEATURE
	 * lo stato non puo' essere cmabiato
	 * PROPOSED -> PROPOSED
	 */
	async update(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		let { feature }: { feature: FeatureRepo } = req.body
		if (!feature) return res.status(400).json({ error: "Feature data is required" })

		// carico la vecchia FEATURE 
		const featureOld = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: feature.id
		})
		if (!featureOld) return res.status(404).json({ error: "Feature not found" })
		if (featureOld.accountId !== userJwt.id) return res.status(403).json({ error: "You are not allowed to modify this feature" })

		// controllo i permessi
		if (featureOld.status !== FEATURE_STATUS.PROPOSED) {
			return res.status(400).json({ error: `You can modify a feature only if its status is ${FEATURE_STATUS.PROPOSED}` })
		}

		// preparo la FEATURE
		delete feature.status
		delete feature.comments
		delete feature.fundings

		// se c'e' un developer nuovo gli mando un messaggio
		if (feature.accountDevId && feature.accountDevId != featureOld?.accountDevId) {
			const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
			await messageService.sendMessage(
				null,
				feature.accountDevId,
				`Hello,\n\nYou have been assigned as the developer for the feature titled "${feature.title}". Please log in to your account to view the details and get started.\n\nBest regards,\nFeature Fortune Team`
			)
		}

		// salvo
		const featureNew: AccountRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: feature
		})

		res.json({ feature: featureNew })
	}

	/**
	 * Chiamata dall'AUTHOR
	 * Elimina una FEATURE.
	 * è possibile farlo solo se la feature è in stato:
	 * PROPOSED, CANCELLED
	 */
	async delete(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		const id = req.params["id"]

		// verifico la FEATURE
		const featureOld = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: id
		})
		if (!featureOld) return res.status(404).json({ error: "Feature not found" })
		if (featureOld.accountId !== userJwt.id) return res.status(403).json({ error: "You are not allowed to delete this feature" })
		if (![FEATURE_STATUS.PROPOSED, FEATURE_STATUS.CANCELLED].includes(featureOld.status)) {
			return res.status(400).json({ error: `You can delete a feature only if its status is ${FEATURE_STATUS.PROPOSED} or ${FEATURE_STATUS.CANCELLED}` })
		}

		// elimino la FEATURE
		await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.DELETE,
			payload: id
		})

		res.json({ data: "ok" })
	}






	/**
	 * Chiamato dal DEV
	 * per accettare lo sviluppo delle FEATURE
	 * PROPOSED -> IN_DEVELOPMENT
	 */
	async engagement(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		const featureId = req.params["id"]
		if (!featureId) return res.status(400).json({ error: "Feature ID is required" })


		// carico la FEATURE
		const feature: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: featureId
		})
		if (!feature) return res.status(404).json({ error: "Feature not found" })


		// contorllo la FEATURE
		if (feature.accountDevId !== userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to engage with this feature" })
		}


		// aggiorno lo stato della FEATURE
		const featureUpdated: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: <Partial<FeatureRepo>>{
				id: featureId,
				status: FEATURE_STATUS.IN_DEVELOPMENT
			}
		})


		// invia un messaggio al creatore della FEATURE
		const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
		await messageService.sendMessage(
			null,
			feature.accountId,
			`Hello,\n\nThe developer has accepted to work on your feature titled "${feature.title}". They are now in development.\n\nBest regards,\nFeature Fortune Team`
		)


		res.json({ data: "ok" })
	}

	/**
	 * Chiamato dal DEV 
	 * per rinunciare alla FEATURE
	 * elimina se stesso come DEV
	 * PROPOSED -> PROPOSED dev=null
	 * IN_DEVELOPMENT -> PROPOSED dev=null
	 */
	async leave(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		const featureId = req.params["id"]
		if (!featureId) return res.status(400).json({ error: "Feature ID is required" })


		// carico la FEATURE
		const feature: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: featureId
		})
		if (!feature) return res.status(404).json({ error: "Feature not found" })


		// controllo la FEATURE
		if (feature.accountDevId !== userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to engage with this feature" })
		}
		if (feature.status != FEATURE_STATUS.PROPOSED && feature.status != FEATURE_STATUS.IN_DEVELOPMENT) {
			return res.status(400).json({ error: `You can leave a feature only if its status is ${FEATURE_STATUS.PROPOSED} or ${FEATURE_STATUS.IN_DEVELOPMENT}` })
		}


		// aggiorno lo stato della FEATURE
		const featureUpdated: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: <Partial<FeatureRepo>>{
				id: featureId,
				status: FEATURE_STATUS.PROPOSED,
				githubDevId: null,
				accountDevId: null,
			}
		})


		// invia un messaggio al creatore della FEATURE
		const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
		await messageService.sendMessage(
			null,
			feature.accountId,
			`Hello,\n\nThe developer has left the feature titled "${feature.title}". You may consider assigning a different developer.\n\nBest regards,\nFeature Fortune Team`
		)


		res.json({ data: "ok" })
	}


	/**
	 * Chiamato dal DEV
	 * Indica che la FEATURE è stata rilasciata
	 * IN_DEVELOPMENT -> RELEASED
	 */
	async released(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		const featureId = req.params["id"] ?? req.body?.featureId
		if (!featureId) return res.status(400).json({ error: "Feature ID is required" })


		// carico la FEATURE
		const feature: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: featureId
		})
		if (!feature) return res.status(404).json({ error: "Feature not found" })


		// solo il DEV assegnato può rilasciare
		if (feature.accountDevId !== userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to release this feature" })
		}
		if (feature.status !== FEATURE_STATUS.IN_DEVELOPMENT) {
			return res.status(400).json({ error: `You can release a feature only if its status is ${FEATURE_STATUS.IN_DEVELOPMENT}` })
		}


		// aggiorno lo stato della FEATURE
		await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: <Partial<FeatureRepo>>{
				id: featureId,
				status: FEATURE_STATUS.RELEASED,
			}
		})

		// avvisa il creatore
		const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
		if (feature.accountId && feature.accountId !== userJwt.id) {
			await messageService.sendMessage(
				null,
				feature.accountId,
				`Hello,\n\nThe developer has marked the feature titled "${feature.title}" as released.\n\nBest regards,\nFeature Fortune Team`
			)
		}


		res.json({ data: "ok" })
	}


	/**
	 * Chiamata dall'AUTHOR
	 * Segna la FEATURE come annullata
	 * PROPOSED | IN_DEVELOPMENT | RELEASED -> CANCELLED
	 */
	async cancelled(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		const featureId = req.params["id"] ?? req.body?.featureId
		if (!featureId) return res.status(400).json({ error: "Feature ID is required" })


		// carico la FEATURE
		const feature: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: featureId
		})
		if (!feature) return res.status(404).json({ error: "Feature not found" })


		// CHECK: verifico i permessi
		if (feature.accountId != userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to cancel this feature" })
		}
		if (![FEATURE_STATUS.PROPOSED, FEATURE_STATUS.IN_DEVELOPMENT, FEATURE_STATUS.RELEASED].includes(feature.status)) {
			return res.status(400).json({ error: `You can cancel a feature only if its status is ${FEATURE_STATUS.PROPOSED}, ${FEATURE_STATUS.IN_DEVELOPMENT}, or ${FEATURE_STATUS.RELEASED}` })
		}


		// DB: aggiorno lo stato della FEATURE
		await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: <Partial<FeatureRepo>>{
				id: featureId,
				status: FEATURE_STATUS.CANCELLED,
			}
		})


		// MESSAGE: avvisa il DEV assegnato
		const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
		if (feature.accountDevId && feature.accountDevId !== userJwt.id) {
			await messageService.sendMessage(
				null,
				feature.accountDevId,
				`Hello,\n\nThe feature titled "${feature.title}" has been cancelled by its creator.\n\nBest regards,\nFeature Fortune Team`
			)
		}


		res.json({ data: "ok" })
	}


	/**
	 * Chiamata dall'AUTHOR
	 * Segna la FEATURE come completata
	 * RELEASED -> COMPLETED
	 */
	async completed(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		const featureId = req.params["id"] ?? req.body?.featureId
		if (!featureId) return res.status(400).json({ error: "Feature ID is required" })


		// carico la FEATURE
		const feature: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: featureId
		})
		if (!feature) return res.status(404).json({ error: "Feature not found" })


		// CHECK: verifico i permessi
		if (feature.accountId != userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to complete this feature" })
		}
		if (feature.status !== FEATURE_STATUS.RELEASED) {
			return res.status(400).json({ error: `You can complete a feature only if its status is ${FEATURE_STATUS.RELEASED}` })
		}


		// DB: aggiorno lo stato della FEATURE
		await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: <Partial<FeatureRepo>>{
				id: featureId,
				status: FEATURE_STATUS.COMPLETED,
			}
		})


		// MESSAGE: avvisa le controparti
		const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
		// TODO: notificare anche ai FUNDERS
		await messageService.sendMessage(
			null,
			feature.accountDevId,
			`Hello,\n\nThe feature titled "${feature.title}" has been marked as completed by its creator.\n\nBest regards,\nFeature Fortune Team`
		)



		res.json({ data: "ok" })
	}

}

export default FeatureRoute


// enum FEATURE_API_FILTER {
// 	RECENT = "recent",
// 	MY = "my",
// 	FINANCED = "financed",
// 	DEVELOPED = "developed",
// }