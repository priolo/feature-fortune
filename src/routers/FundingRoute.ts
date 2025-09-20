import { AccountRepo } from "@/repository/Account.js";
import { FeatureRepo } from "@/repository/Feature.js";
import { FundingRepo } from "@/repository/Funding.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import Stripe from "stripe";



const stripe = new Stripe("sk_test_51S9Cab3oUVTivUNZyoaysY2yrobENo6QBulkV7i2fRmbFzVmWXDP4KX61rSBsNCcmTRUwYFe3TKsM2u7cUllUHd2000hexAzG8");
const endpointSecret = "whsec_d5aa13a069a45123d9ebc272b742e8c76f8856eb5d59f908673d735511a53643";


class FundingRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/fundings",
			repository: "/typeorm/fundings",
			routers: [
				{ path: "/create", verb: "post", method: "createIntent" },
				{ path: "/webhook", verb: "post", method: "webhook", isRaw: true },
			]
		}
	}

	async createIntent(req: Request, res: Response) {
		const { amount, contributorEmail, github, authorGithub } = req.body

		// creo il PaymentIntent su Stripe
		const intent = await stripe.paymentIntents.create({
			amount,
			currency: "EUR",
			capture_method: 'manual',        // FONDAMENTALE: non addebitare ora
			metadata: { contributorEmail, github, authorGithub }
		})

		// cerco o creo l'ACCOUNT dell'autore GITHUB
		// let author = await new Bus(this, "/typeorm/accounts").dispatch({
		// 	type: typeorm.RepoRestActions.FIND_ONE,
		// 	payload: { github: authorGithub }
		// })
		// if (!author) {
		// 	author = await new Bus(this, "/typeorm/accounts").dispatch({
		// 		type: typeorm.RepoRestActions.SAVE,
		// 		payload: <AccountRepo>{
		// 			github: authorGithub,
		// 			username: authorGithub,
		// 			email: "", // non lo so
		// 			avatar: `https://unavatar.io/github/${authorGithub}`
		// 		}
		// 	})
		// }

		// creo il FUNDING a stato "created"
		const funding: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.RepoRestActions.SAVE,
			payload: <FundingRepo>{
				amount: amount, // in centesimi
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // scade in una settimana
				status: "created",
				userId: "",
				featureId: "temporary", // lo aggiorno dopo
				stripePi: intent.id      // salvo l'ID del PaymentIntent di Stripe
			}
		})

		// rispondo al client con il client_secret del PaymentIntent
		res.status(200).json({ 
			client_secret: intent.client_secret 
		});
	}




	async webhook(request: Request, response: Response) {
		
		const sig = request.headers['stripe-signature'];
		let event;



		try {
			event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
		} catch (err) {
			response.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		// Handle the event
		switch (event.type) {
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
				console.log(`Unhandled event type ${event.type}`);
		}

		// Return a 200 response to acknowledge receipt of the event
		response.send();
	}
}


export default FundingRoute


