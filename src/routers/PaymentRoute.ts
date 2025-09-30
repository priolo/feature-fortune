import { AccountRepo } from "@/repository/Account.js";
import { Bus, httpRouter } from "@priolo/julian";
import { RepoRestActions } from "@priolo/julian/dist/services/typeorm/types.js";
import { Request, Response } from "express";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_API_KEY!);

class PaymentRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/payments",
			account_repo: "/typeorm/accounts",
			routers: [
				{ path: "/", verb: "post", method: "createPayment" },
				{ path: "/card", verb: "post", method: "saveCard" },
				{ path: "/", verb: "delete", method: "removePayment" },
				{ path: "/", verb: "get", method: "getPayment" },
			]
		}
	}

	/** 
	 * ATTACH: creo eventualmente il CUSTOMER e lo associoad un PAYMENT METHOD
	 */
	async createPayment(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: RepoRestActions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });


		// First, check if customer already exists in Stripe
		let customer: Stripe.Customer | Stripe.DeletedCustomer;
		if (user.stripeCustomerId) {
			customer = await stripe.customers.retrieve(user.stripeCustomerId);
		}

		// Only create if doesn't exist
		if (!customer) {
			customer = await stripe.customers.create({
				metadata: { accountId: user.id }
			});
			// Save the customer ID to your database for future use
			await new Bus(this, this.state.account_repo).dispatch({
				type: RepoRestActions.SAVE,
				payload: {
					id: user.id,
					stripeCustomerId: customer.id
				},
			})
		}


		// create payment method
		const setupIntent = await stripe.setupIntents.create({
			customer: customer.id,
			payment_method_types: ["card"],
		});

		res.send({
			stripeCustomerId: customer.id,
			clientSecret: setupIntent.client_secret
		});
	}

	/**
	 * ATTACH2: Completo la creazione del PAYMENT METHOD 
	 */
	async saveCard(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const { paymentMethodId } = req.body

		await new Bus(this, this.state.account_repo).dispatch({
			type: RepoRestActions.SAVE,
			payload: {
				id: userJwt.id,
				stripePaymentMethodId: paymentMethodId
			},
		})

		res.send({ success: true })
	}

	/**
	 * REMOVE: Rimuovo tutti i PAYMENT METHOD salvati per questo CUSTOMER
	 */
	async removePayment(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: RepoRestActions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });

		// If user has a Stripe customer ID, remove all payment methods
		if (user.stripeCustomerId) {
			try {
				// List all payment methods for the customer
				const paymentMethods = await stripe.paymentMethods.list({
					customer: user.stripeCustomerId,
					type: 'card', // You can also use 'all' to get all types
				});

				// Detach each payment method
				for (const paymentMethod of paymentMethods.data) {
					await stripe.paymentMethods.detach(paymentMethod.id);
				}
			} catch (error) {
				console.error('Error removing payment methods:', error);
				return res.status(500).json({ error });
			}
		}

		// Update user record to remove the saved payment method ID
		await new Bus(this, this.state.account_repo).dispatch({
			type: RepoRestActions.SAVE,
			payload: {
				id: userJwt.id,
				stripePaymentMethodId: null
			},
		})

		res.send({ success: true })
	}

	/**
	 * GET: Recupero il PAYMENT METHOD salvato per questo CUSTOMER
	 */
	async getPayment(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: RepoRestActions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });

		let paymentMethods: Stripe.Response<Stripe.PaymentMethod>
		try {
			paymentMethods = await stripe.paymentMethods.retrieve(user.stripePaymentMethodId!);
		} catch (error) {
			return res.status(500).json({ error });
		}

		res.send({ success: true, paymentMethods })
	}
}


export default PaymentRoute


