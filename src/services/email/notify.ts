import { Bus, NodeConf, typeorm, email as emailNs } from "@priolo/julian";
import { AccountRepo } from "../../repository/Account.js";
import { FeatureRepo } from "../../repository/Feature.js";
import { loadTemplate, NotificationTemplate } from "../templates/index.js";
import MessageRoute from "../../routers/MessageRoute.js";


/**
 * Manda una notifica al developer assegnato alla FEATURE
 */
export async function notifyAssignFeature(node: NodeConf, devId: string, feature: FeatureRepo) {
	if (!node || !devId || !feature) return;

	await notify(node, devId,
		{
			title: `You have been assigned as developer for the feature "${feature.title}"`,
			message: `Hello,\n\nYou have been assigned as the developer for the feature titled "${feature.title}". Please log in to your account to view the details and get started.\n\nBest regards`,
			action_url: `${process.env.FRONTEND_URL}/app/feature/${feature.id}`,
		},
		"templates/email/notification_no_status.html"
	);
}


/**
 * Manda una notifica ad un utente
 */
async function notify(node: NodeConf, receiverId: string, message: NotificationTemplate, template: string) {
	if ( !node || !receiverId || !message || !template ) return;

	const receiver: AccountRepo = await new Bus(node, "/typeorm/accounts").dispatch({
		type: typeorm.Actions.GET_BY_ID,
		payload: receiverId,
	})

	// invio comunicazoine interna
	const messageService = node.nodeByPath<MessageRoute>("/http/routers/public/messages")
	await messageService.sendMessage(
		null,
		receiver.id,
		message.message,
	)

	// se non vuole ricevere email allora finisco qua
	if (!receiver?.notificationsEnabled) return;

	// ricavo il template email
	const html = await loadTemplate<NotificationTemplate>(message, template)
	// invio email
	const email = receiver.googleEmail ?? receiver.email
	if (!email) return;
	await new Bus(node, "/email-noreply").dispatch({
		type: emailNs.Actions.SEND,
		payload: {
			from: process.env.EMAIL_USER,
			to: email,
			subject: message.title,
			html,
		}
	})
}