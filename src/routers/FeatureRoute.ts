import { Bus, email as emailNs, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { notifyAssignFeature } from "../services/email/notify.js";
import { loadTemplate, NotificationTemplate } from "../services/templates/index.js";
import { FindManyOptions } from "typeorm";
import { AccountRepo } from "../repository/Account.js";
import { FEATURE_ACTIONS, FEATURE_STATUS, FeatureRepo } from "../repository/Feature.js";
import { FUNDING_STATUS } from "../repository/Funding.js";
import MessageRoute from "./MessageRoute.js";



class FeatureRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/features",
			feature_repo: "/typeorm/features",
			comment_repo: "/typeorm/comments",
			message_route: "/http/routers/public/messages",
			email_path: "/email-noreply",
			routers: [
				{ path: "/", verb: "get", method: "getAll" },
				{ path: "/:id", verb: "get", method: "getById" },
				{ path: "/", verb: "post", method: "create" },
				{ path: "/", verb: "patch", method: "update" },

				{ path: "/:id/action", verb: "post", method: "action" },

			]
		}
	}
	declare state: typeof this.stateDefault

	async getAll(req: Request, res: Response) {
		const { skip, take } = req.query

		const features = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.ALL,
			payload: <FindManyOptions<FeatureRepo>>{
				skip: skip ? Number(skip) : 0,
				take: take ? Number(take) : 1000,
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

		res.json({ features })
	}

	async getById(req: Request, res: Response) {
		const id = req.params["id"]
		if (!id) return res.status(400).json({ error: "Missing id parameter" })

		const feature: FeatureRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: {
				where: { id: id },
			}
		})

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


		// check campi obbligatori
		if (!feature) return res.status(400).json({ error: "Feature data is required" })
		if (!feature.title || feature.title.trim() == "") return res.status(400).json({ error: "Feature title is required" })
		if (!feature.description || feature.description.trim() == "") return res.status(400).json({ error: "Feature description is required" })
		if (!feature.githubRepoId) return res.status(400).json({ error: "GitHub Repository ID is required" })


		// preparo la FEATURE
		feature.accountId = userJwt.id
		delete feature.id
		delete feature.status
		delete feature.comments
		delete feature.fundings


		// se c'e' un DEV gli mando un messaggio
		if (!!feature.accountDevId) {
			notifyAssignFeature(this, feature.accountDevId, feature)
		}


		// salvo e invio
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


		// check campi obbligatori
		if (!feature) return res.status(400).json({ error: "Feature data is required" })
		if (!feature.title || feature.title.trim() == "") return res.status(400).json({ error: "Feature title is required" })
		if (!feature.description || feature.description.trim() == "") return res.status(400).json({ error: "Feature description is required" })
		if (!feature.githubRepoId) return res.status(400).json({ error: "GitHub Repository ID is required" })


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
			notifyAssignFeature(this, feature.accountDevId, feature)
		}

		// salvo e invio
		const featureNew: AccountRepo = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: feature
		})
		res.json({
			feature: { ...featureOld, ...featureNew }
		})
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
			type: typeorm.Actions.FIND_ONE,
			payload: {
				where: { id: featureId },
				relations: {
					account: true,
					accountDev: true,
					fundings: {
						account: true
					}
				},
				select: {
					id: true,
					title: true,
					status: true,
					accountId: true,
					accountDevId: true,
					githubRepoMetadata: true,
					account: {
						id: true,
						name: true,
						notificationsEnabled: true,
						email: true,
						googleEmail: true
					},
					accountDev: {
						id: true,
						name: true,
						notificationsEnabled: true,
						email: true,
						googleEmail: true
					},
					fundings: {
						id: true,
						accountId: true,
						status: true,
						account: {
							id: true,
							notificationsEnabled: true,
							email: true,
							googleEmail: true
						}
					}
				}
			}
		});
		if (!feature) return res.status(404).json({ error: "Feature not found" })


		// calcolo la modifica alla FEATURE
		let partial: Partial<FeatureRepo> = null
		let message: NotificationData = null
		const messageDefault: NotificationData = {
			mainReceiver: feature.account,
			toFounders: true,
			action_url: `${process.env.FRONTEND_URL}/app/feature/${feature.id}`,
		}

		const devName = feature.accountDev?.name ?? "<unknown>"
		const featureTitle = feature.title ?? "<unknow>"
		const repoName = feature.githubRepoMetadata?.full_name ?? "<unknown>"

		switch (action) {

			case FEATURE_ACTIONS.DEV_ACCEPT:
				if (feature.accountDevId !== userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to engage with this feature" })
				}
				if (feature.status != FEATURE_STATUS.PROPOSED) {
					return res.status(400).json({ error: `You can accept a feature only if its status is ${FEATURE_STATUS.PROPOSED}` })
				}
				partial = { status: FEATURE_STATUS.IN_DEVELOPMENT }
				message = {
					title: `Your feature "${featureTitle}" is now in development!`,
					message: `Good news! The developer ${devName} has accepted to work on the feature you proposed for the repository ${repoName}. They are now in development.`,
				}
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
				message = {
					toFounders: false,
					title: `Developer has declined your feature "${featureTitle}"`,
					message: `The developer ${devName} has declined to work on the feature you proposed for the repository ${repoName}. You may consider assigning a different developer.`,
				}
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
				message = {
					toFounders: false,
					title: `Developer has left your feature "${featureTitle}"`,
					message: `The developer ${devName} has left the feature you proposed for the repository ${repoName}. You may consider assigning a different developer.`,
				}
				break;

			case FEATURE_ACTIONS.DEV_RELEASE:
				if (feature.accountDevId !== userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to release this feature" })
				}
				if (feature.status !== FEATURE_STATUS.IN_DEVELOPMENT) {
					return res.status(400).json({ error: `You can release a feature only if its status is ${FEATURE_STATUS.IN_DEVELOPMENT}` })
				}
				partial = { status: FEATURE_STATUS.RELEASED }
				message = {
					title: `Your feature "${featureTitle}" has been released!`,
					message: `Great news! The developer ${devName} has released the feature you proposed for the repository ${repoName}. You can now review and mark it as completed.`,
				}
				break;

			case FEATURE_ACTIONS.ATH_CANCEL:
				if (feature.accountId != userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to cancel this feature" })
				}
				if (![FEATURE_STATUS.PROPOSED, FEATURE_STATUS.IN_DEVELOPMENT, FEATURE_STATUS.RELEASED].includes(feature.status)) {
					return res.status(400).json({ error: `You can cancel a feature only if its status is ${FEATURE_STATUS.PROPOSED}, ${FEATURE_STATUS.IN_DEVELOPMENT}, or ${FEATURE_STATUS.RELEASED}` })
				}
				partial = { status: FEATURE_STATUS.CANCELLED }
				message = {
					mainReceiver: feature.accountDev,
					title: `Your feature "${featureTitle}" has been cancelled`,
					message: `The feature you proposed for the repository ${repoName} has been cancelled by its creator.`,
				}
				break;

			case FEATURE_ACTIONS.ATH_REJECTED:
				if (feature.accountId != userJwt.id) {
					return res.status(403).json({ error: "You are not allowed to reject this feature" })
				}
				if (feature.status != FEATURE_STATUS.RELEASED) {
					return res.status(400).json({ error: `You can reject a feature only if its status is ${FEATURE_STATUS.RELEASED}` })
				}
				partial = { status: FEATURE_STATUS.IN_DEVELOPMENT }
				message = {
					mainReceiver: feature.accountDev,
					toFounders: false,
					title: `Your feature "${featureTitle}" has been rejected by its creator`,
					message: `The developer ${devName} has informed that the feature you are developing for the repository ${repoName} has been rejected by its creator.`,
				}
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
				message = {
					mainReceiver: feature.accountDev,
					title: `Your feature "${featureTitle}" has been completed!`,
					message: `Congratulations! The feature you proposed for the repository ${repoName} has been marked as completed. Thank you for your contribution!`,
				}
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
		message = {
			...messageDefault,
			...message
		}
		// calcolo tutti i destinatati
		const receivers = !!message.mainReceiver ? [message.mainReceiver] : []
		if (message.toFounders) {
			feature.fundings.forEach(f => {
				if (f.status != FUNDING_STATUS.CANCELLED
					&& !receivers.find(r => r.id == f.accountId)
				) receivers.push(f.account)
			})
		}

		// ricavo il template email
		const html = await loadTemplate<NotificationTemplate>(
			{
				title: message.title,
				message: message.message,
				action_url: message.action_url,
				old_status: feature.status,
				new_status: partial.status,
			},
			"templates/email/notification.html",
		)

		const messageService = this.nodeByPath<MessageRoute>(this.state.message_route)
		await Promise.all(receivers.map(async (receiver) => {
			// invio i messaggi di sistema
			await messageService.sendMessage(
				null,
				receiver.id,
				message.message,
			)
			// invio email se abilitata
			const email = receiver.googleEmail ?? receiver.email
			if (receiver?.notificationsEnabled && !!email) {
				await new Bus(this, this.state.email_path).dispatch({
					type: emailNs.Actions.SEND,
					payload: {
						from: process.env.EMAIL_USER,
						to: email,
						subject: message.title,
						html,
					}
				})
			}
		}))


		res.json({ feature: partial })
	}

}

export default FeatureRoute


type NotificationData = NotificationTemplate & {
	toFounders?: boolean,
	mainReceiver?: AccountRepo,
}
