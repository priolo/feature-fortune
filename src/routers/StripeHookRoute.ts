import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import Stripe from "stripe";
import { AccountRepo } from "../repository/Account.js";



const stripe = new Stripe(process.env.STRIPE_API_KEY!, { apiVersion: "2025-10-29.clover" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

class StripeHookRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/api/stripe",
			account_repo: "/typeorm/accounts",
			routers: [
				{ path: "/webhook", verb: "post", method: "webhook" },
			]
		}
	}
	declare state: typeof this.stateDefault

	/**
	 * eventi da STRIPE
	 */
	async webhook(request: Request, response: Response) {
		const sig = request.headers['stripe-signature'];
		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
		} catch (err) {
			response.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
			return;
		}

		// Handle the event
		switch (event.type) {
			case 'account.updated': {
				const stripeAccount = event.data.object;
				const accountId = stripeAccount.metadata.accountId
				const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
					type: typeorm.Actions.GET_BY_ID,
					payload: accountId,
				})

				if (!user) return response.status(404).json({ error: "User not found" });
				if (!user.stripeAccountId) return response.status(404).json({ error: "User not linked with any stripe account" });
				if (user.stripeAccountId != stripeAccount.id) {
					return response.status(401).json({ error: "Account already linked with another stripe account" });
				}

				// se lo stripe account è cambiato lo aggiorno
				const canReceiveMoney = stripeAccount.charges_enabled && stripeAccount.payouts_enabled;
				const newStatus = canReceiveMoney ? "ready" : "pending";
				if (user.stripeAccountStatus !== newStatus) {
					await new Bus(this, this.state.account_repo).dispatch({
						type: typeorm.Actions.SAVE,
						payload: {
							id: user.id,
							stripeAccountStatus: newStatus
						},
					})
					return response.status(200).json({ message: `Account status updated: ${newStatus}` });
				}
				break
			}

			case 'payment_intent.amount_capturable_updated':
				const paymentIntentAmountCapturableUpdated = event.data.object;
				// Then define and call a function to handle the event payment_intent.amount_capturable_updated
				break;
			case 'payment_intent.canceled':
				const paymentIntentCanceled = event.data.object;
				// Then define and call a function to handle the event payment_intent.canceled
				break;
			case 'payment_intent.created':
				const paymentIntentCreated = event.data.object;
				// Then define and call a function to handle the event payment_intent.created
				break;
			case 'payment_intent.partially_funded':
				const paymentIntentPartiallyFunded = event.data.object;
				// Then define and call a function to handle the event payment_intent.partially_funded
				break;
			case 'payment_intent.payment_failed':
				const paymentIntentPaymentFailed = event.data.object;
				// Then define and call a function to handle the event payment_intent.payment_failed
				break;
			case 'payment_intent.processing':
				const paymentIntentProcessing = event.data.object;
				// Then define and call a function to handle the event payment_intent.processing
				break;
			case 'payment_intent.requires_action':
				const paymentIntentRequiresAction = event.data.object;
				// Then define and call a function to handle the event payment_intent.requires_action
				break;
			case 'payment_intent.succeeded':
				const paymentIntentSucceeded = event.data.object;
				// Then define and call a function to handle the event payment_intent.succeeded
				break;
			// ... handle other event types
			default:
				break
		}
		// Return a 200 response to acknowledge receipt of the event
		response.send();
	}

}

export default StripeHookRoute