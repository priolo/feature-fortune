import { AccountRepo } from "@/repository/Account.js";
import { Bus, httpRouter } from "@priolo/julian";
import { RepoRestActions } from "@priolo/julian/dist/services/typeorm/types.js";
import { Request, Response } from "express";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_API_KEY!);

class FundingRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/fundings",
			repository: "/typeorm/fundings",
			account_repo: "/typeorm/accounts",
			routers: [
				{ path: "/create", verb: "post", method: "createPaymentMethod" },
				{ path: "/save", verb: "post", method: "savePaymentMethod" },
				{ path: "/remove", verb: "post", method: "removePaymentMethod" },
				{ path: "/get", verb: "post", method: "getPaymentMethod" },

				{ path: "/donate", verb: "post", method: "donate" },
				{ path: "/link", verb: "post", method: "registerLink" },
			]
		}
	}

	/** 
	 * creo eventualmente il CUSTOMER e lo associoad un PAYMENT METHOD
	 */
	async createPaymentMethod(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: RepoRestActions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });


		// First, check if customer already exists
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
	 * Completo la creazione del PAYMENT METHOD 
	 */
	async savePaymentMethod(req: Request, res: Response) {
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
	 * Rimuovo tutti i PAYMENT METHOD salvati per questo CUSTOMER
	 */
	async removePaymentMethod(req: Request, res: Response) {
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

	async getPaymentMethod(req: Request, res: Response) {
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







	/**
	 * 2) Quando autore è pronto → creazione PaymentIntent
	 */
	async donate(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: RepoRestActions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });


		// Creazione PaymentIntent usando il payment_method salvato
		const paymentIntent = await stripe.paymentIntents.create({
			amount: 2000, // in centesimi
			currency: "EUR",
			customer: user.stripeCustomerId,
			payment_method: user.stripePaymentMethodId,
			off_session: true, // il contributor non deve reinserire la carta
			confirm: true,
			transfer_data: {
				destination: "acct_1SAGZZKfacmp3sya", // soldi all'autore
			},
		});

		res.send(paymentIntent);
	}



	/**
	 * link per registrazione STRIPE-EXPRESS dell AUTHOR 
	 */
	async registerLink(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: RepoRestActions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });


		// check if the user have already a stripe account
		if (!!user.stripeAccountId) {
			return res.status(400).json({ error: "User already have a stripe account" });
		}

		// Create a new Stripe account for the user
		const account = await stripe.accounts.create({
			type: "express", // Express account
			country: "IT",
			email: userJwt.email,
			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},
			metadata: { accountId: userJwt.id }
		});
		const accountLink = await stripe.accountLinks.create({
			account: account.id,
			refresh_url: "http://localhost:5173/app/feature",
			return_url: "http://localhost:5173/app/feature",
			type: "account_onboarding",
		});

		res.status(200).json(
			{ url: accountLink.url }
		)
	}

}


export default FundingRoute


