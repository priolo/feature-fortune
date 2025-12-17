import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { TypeLog } from "@priolo/julian/dist/core/types.js";
import { Request, Response } from "express";
import { FUNDING_STATUS, FundingRepo } from "src/repository/Funding.js";
import Stripe from "stripe";
import { FindOneOptions } from "typeorm";
import { AccountRepo } from "../repository/Account.js";



const stripe = new Stripe(process.env.STRIPE_API_KEY!, { apiVersion: "2025-10-29.clover" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

class StripeHookRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/api/stripe",
			account_repo: "/typeorm/accounts",
			funding_repo: "/typeorm/fundings",
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


			case 'payment_intent.succeeded': {
				const paymentIntent = event.data.object
				this.setFundingStatusByPaymentIntent(paymentIntent, FUNDING_STATUS.PAIED)
				break
			}

			case 'payment_intent.payment_failed': {
				const paymentIntent = event.data.object
				this.setFundingStatusByPaymentIntent(paymentIntent, FUNDING_STATUS.ERROR)
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

			case 'payment_intent.processing':
				const paymentIntentProcessing = event.data.object;
				// Then define and call a function to handle the event payment_intent.processing
				break;
			case 'payment_intent.requires_action':
				const paymentIntentRequiresAction = event.data.object;
				// Then define and call a function to handle the event payment_intent.requires_action
				break;
			// ... handle other event types
			default:
				break
		}

		// Return a 200 response to acknowledge receipt of the event
		response.send();
	}

	/**
	 * Cerca un FUNDING tramite il paymenti intent di Stripe e lo setta ad un nuovo stato.
	 */
	private async setFundingStatusByPaymentIntent(paymentIntent: Stripe.PaymentIntent, newStatus: FUNDING_STATUS) {

		// load FUNDING from DB
		const funding: FundingRepo = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindOneOptions<FundingRepo>>{
				where: { transactionId: paymentIntent.id },
			}
		})

		// check
		if (!funding) {
			this.log(`set status : funding not found`, { payment_intent_id: paymentIntent.id }, TypeLog.ERROR)
			return
		}
		if (funding.status != FUNDING_STATUS.WAITING) {
			this.log(`set status : status is not WAITING `,
				{ payment_intent_id: paymentIntent.id, new_status: newStatus, current_status: funding.status },
				TypeLog.ERROR
			)
			return
		}

		// update status
		await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: {
				id: funding.id,
				status: newStatus,
			}
		})
	}

}

export default StripeHookRoute