import Stripe from "stripe";
import { AccountRepo } from "../repository/Account.js";
import { CommentRepo } from "../repository/Comment.js";
import { FEATURE_ACTIONS, FEATURE_STATUS, FeatureRepo } from "../repository/Feature.js";
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

				{ path: "/:id/action", verb: "post", method: "action" },

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
		const featureNew: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: feature
		})

		res.json({ feature: featureNew })
	}

	/**
	 * Chiamata dall'AUTHOR
	 * Permette di aggiornare alcuni campi della FEATURE
	 * lo stato non puo' essere cambiato
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

		res.json({
			feature: { ...featureOld, ...featureNew }
		})
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

		res.json({ success: true })
	}


	/**
	 * Chiamato dal DEV
	 * per accettare lo sviluppo delle FEATURE
	 * PROPOSED -> IN_DEVELOPMENT
	 */
	async action(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		if (!userJwt) return res.status(401).json({ error: "Unauthorized" })
		const featureId = req.params["id"]
		if (!featureId) return res.status(400).json({ error: "Feature ID is required" })
		const action: FEATURE_ACTIONS = req.body?.action
		if (!action) return res.status(400).json({ error: "Action is required" })

		// carico la FEATURE
		const feature: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: featureId
		})
		if (!feature) return res.status(404).json({ error: "Feature not found" })


		// calcolo la modifica alla FEATURE
		let partial: Partial<FeatureRepo> = null
		let authorMessage: string = null

		switch (action) {

			case FEATURE_ACTIONS.DEV_ACCEPT:
				if (feature.accountDevId !== userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to engage with this feature" })
				}
				if (feature.status != FEATURE_STATUS.PROPOSED) {
					return res.status(400).json({ error: `You can accept a feature only if its status is ${FEATURE_STATUS.PROPOSED}` })
				}
				partial = { status: FEATURE_STATUS.IN_DEVELOPMENT }
				authorMessage = `Hello,\n\nThe developer has accepted to work on your feature titled "${feature.title}". They are now in development.\n\nBest regards,\nFeature Fortune Team`
				break;

			case FEATURE_ACTIONS.DEV_DECLINE:
				if (feature.accountDevId !== userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to release this feature" })
				}
				if (feature.status !== FEATURE_STATUS.PROPOSED) {
					return res.status(400).json({ error: `You can release a feature only if its status is ${FEATURE_STATUS.IN_DEVELOPMENT}` })
				}
				partial = {
					githubDevId: null,
					accountDevId: null,
				}
				authorMessage = `Hello,\n\nThe developer has left the feature titled "${feature.title}". You may consider assigning a different developer.\n\nBest regards,\nFeature Fortune Team`
				break;

			case FEATURE_ACTIONS.DEV_LEAVE:
				if (feature.accountDevId !== userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to engage with this feature" })
				}
				if (feature.status != FEATURE_STATUS.IN_DEVELOPMENT) {
					return res.status(400).json({ error: `You can leave a feature only if its status is ${FEATURE_STATUS.IN_DEVELOPMENT}` })
				}
				partial = {
					status: FEATURE_STATUS.PROPOSED,
					githubDevId: null,
					accountDevId: null,
				}
				authorMessage = `Hello,\n\nThe developer has left the feature titled "${feature.title}". You may consider assigning a different developer.\n\nBest regards,\nFeature Fortune Team`
				break;

			case FEATURE_ACTIONS.DEV_RELEASE:
				if (feature.accountDevId !== userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to release this feature" })
				}
				if (feature.status !== FEATURE_STATUS.IN_DEVELOPMENT) {
					return res.status(400).json({ error: `You can release a feature only if its status is ${FEATURE_STATUS.IN_DEVELOPMENT}` })
				}
				partial = { status: FEATURE_STATUS.RELEASED }
				authorMessage = `Hello,\n\nThe developer has marked the feature titled "${feature.title}" as released.\n\nBest regards,\nFeature Fortune Team`
				break;

			case FEATURE_ACTIONS.ATH_CANCEL:
				if (feature.accountId != userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to cancel this feature" })
				}
				if (![FEATURE_STATUS.PROPOSED, FEATURE_STATUS.IN_DEVELOPMENT, FEATURE_STATUS.RELEASED].includes(feature.status)) {
					return res.status(400).json({ error: `You can cancel a feature only if its status is ${FEATURE_STATUS.PROPOSED}, ${FEATURE_STATUS.IN_DEVELOPMENT}, or ${FEATURE_STATUS.RELEASED}` })
				}
				partial = { status: FEATURE_STATUS.CANCELLED }
				authorMessage = `Hello,\n\nThe feature titled "${feature.title}" has been cancelled by its creator.\n\nBest regards,\nFeature Fortune Team`
				break;

			case FEATURE_ACTIONS.ATH_REJECTED:
				if (feature.accountId != userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to reject this feature" })
				}
				if (feature.status != FEATURE_STATUS.IN_DEVELOPMENT) {
					return res.status(400).json({ error: `You can reject a feature only if its status is ${FEATURE_STATUS.IN_DEVELOPMENT}` })
				}
				partial = { status: FEATURE_STATUS.IN_DEVELOPMENT }
				authorMessage = `Hello,\n\nThe feature titled "${feature.title}" has been rejected by its creator.\n\nBest regards,\nFeature Fortune Team`
				break;

			case FEATURE_ACTIONS.ATH_COMPLETE:
				if (feature.accountId != userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to cancel this feature" })
				}
				if (feature.status != FEATURE_STATUS.RELEASED) {
					return res.status(400).json({ error: `You can complete a feature only if its status is ${FEATURE_STATUS.IN_DEVELOPMENT}` })
				}
				partial = <Partial<FeatureRepo>>{
					status: FEATURE_STATUS.COMPLETED,
					completedAt: new Date(),
				}
				authorMessage = `Hello,\n\nThe feature titled "${feature.title}" has been marked as completed by its creator.\n\nBest regards,\nFeature Fortune Team`
				break;

			default:
				return res.status(400).json({ error: "Invalid status transition" })
		}
		partial.id = featureId


		// aggiorno lo stato della FEATURE
		await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: { ...partial }
		})


		// invia i messaggi
		// const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
		// await messageService.sendMessage(
		// 	null,
		// 	feature.accountId,
		// 	authorMessage,
		// )


		res.json({ feature: partial })
	}

}

export default FeatureRoute


// enum FEATURE_API_FILTER {
// 	RECENT = "recent",
// 	MY = "my",
// 	FINANCED = "financed",
// 	DEVELOPED = "developed",
// }