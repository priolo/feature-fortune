import { Actions } from "../services/stripe/types.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import Stripe from "stripe";
import { AccountRepo } from "../repository/Account.js";
import { TypeLog } from "@priolo/julian/dist/core/types.js";



class PaymentRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/payments",
			account_repo: "/typeorm/accounts",
			stripe_service: "/stripe",
			routers: [
				{ path: "/", verb: "post", method: "createPayment" },
				{ path: "/card", verb: "post", method: "updatePaymentCard" },
				{ path: "/", verb: "delete", method: "removePayment" },
				{ path: "/", verb: "get", method: "getPayment" },
			]
		}
	}
	declare state: typeof this.stateDefault

	/** 
	 * ATTACH 1
	 * Create, in case not exist, the CUSTOMER 
	 * and setupIntents where in future can save cards data
	 */
	async createPayment(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });


		// try get the STRIPE-CUSTOMER
		let customer: Stripe.Customer;
		if (!!user.stripeCustomerId) {
			customer = await new Bus(this, this.state.stripe_service).dispatch({
				type: Actions.CUSTOMER_GET,
				payload: user.stripeCustomerId,
			})
		}
		// or create a new one
		if (!customer?.id) {
			customer = await new Bus(this, this.state.stripe_service).dispatch({
				type: Actions.CUSTOMER_CREATE,
				payload: user.id,
			})
		}


		// Save the customer ID to your database if it's new
		if (customer.id !== user.stripeCustomerId) {
			await new Bus(this, this.state.account_repo).dispatch({
				type: typeorm.Actions.SAVE,
				payload: {
					id: user.id,
					stripeCustomerId: customer.id
				},
			})
		}

		
		// Create setup intent using StripeService
		const setupIntent: Stripe.SetupIntent = await new Bus(this, this.state.stripe_service).dispatch({
			type: Actions.INTENT_SETUP,
			payload: customer.id,
		});

		res.send({
			stripeCustomerId: customer.id,
			clientSecret: setupIntent.client_secret,
		});
	}

	/**
	 * ATTACH 2: 
	 * Complete the paymentMethod add CARD data
	 */
	async updatePaymentCard(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const { paymentMethodId } = req.body
		if (!paymentMethodId) return res.status(400).json({ error: "Missing paymentMethodId parameter" })
		
		// Validation: Check if payment method belongs to the user's customer
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user.stripeCustomerId) return res.status(400).json({ error: "User has no stripe customer" })
		// get payment method details from Stripe
		const paymentMethod: Stripe.PaymentMethod = await new Bus(this, this.state.stripe_service).dispatch({
			type: Actions.PAYMENT_METHOD_GET,
			payload: paymentMethodId
		})
		// check if payment method belongs to the customer
		if (!paymentMethod || paymentMethod.customer !== user.stripeCustomerId) {
			return res.status(403).json({ error: "Invalid payment method" })
		}

		// save payment method id to user
		await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: {
				id: userJwt.id,
				stripePaymentMethodId: paymentMethodId
			},
		})

		res.send({ success: true })
	}

	/**
	 * REMOVE: 
	 * Remove alla paymentMethods saved for this CUSTOMER
	 */
	async removePayment(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" })

		// If user has a Stripe customer ID, remove all payment methods
		if (user.stripeCustomerId) {
			try {
				// Remove all payment methods using StripeService
				await new Bus(this, this.state.stripe_service).dispatch({
					type: Actions.PAYMENT_METHOD_REMOVE_ALL,
					payload: user.stripeCustomerId
				});
			} catch (error) {
				this.log('Error removing payment methods:', error, TypeLog.ERROR);
			}
		}

		// Update user record to remove the saved payment method ID
		await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: {
				id: userJwt.id,
				stripePaymentMethodId: null
			},
		})

		res.send({ success: true })
	}

	/**
	 * GET: 
	 * Fetch the PAYMENT METHOD saved for a CUSTOMER
	 */
	async getPayment(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });
		if (!user.stripePaymentMethodId) return res.status(404).json({ error: "No payment method found for user" });

		let paymentMethods: Stripe.PaymentMethod;
		try {
			paymentMethods = await new Bus(this, this.state.stripe_service).dispatch({
				type: Actions.PAYMENT_METHOD_GET,
				payload: user.stripePaymentMethodId!
			});
		} catch (error) {
			return res.status(500).json({ error });
		}

		res.send({ success: true, paymentMethods })
	}
}


export default PaymentRoute


