import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import Stripe from "stripe";
import { AccountRepo } from "../repository/Account.js";
import PaymentCrono from "../services/crono/PaymentCrono.js";
import { Actions } from "../services/stripe/types.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);



class StripeRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/stripe",
			repository: "/typeorm/fundings",
			account_repo: "/typeorm/accounts",
			stripe_service: "/stripe",
			routers: [
				{ path: "/register_link", verb: "post", method: "registerLink" },
				{ path: "/unregister", verb: "post", method: "unregister" },
				{ path: "/pay", verb: "post", method: "pay" },
			]
		}
	}
	declare state: typeof this.stateDefault

	/**
	 * ONLY FOR DEBUG
	 */
	async pay(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { fundingId }: { fundingId: string } = req.body
		if (!fundingId) return
		const paymentCronoService = this.nodeByPath("/crono-payments") as PaymentCrono
		const funding = await paymentCronoService.paymentFunding(fundingId)
		res.json({ funding })
	}

	/**
	 * link per registrazione STRIPE-EXPRESS dell AUTHOR 
	 */
	async registerLink(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})



		if (!user) return res.status(404).json({ error: "User not found" });
		const email = user.email ?? user.googleEmail
		if (!email) return res.status(400).json({ error: "User has no email" });

		// check if the user have already a stripe account and are READY
		if (!!user.stripeAccountId && user.stripeAccountStatus === "ready") {
			return res.status(400).json({ error: "User already have a stripe account" });
		}

		// [DA CONTROLLARE] controllo che non ci sia un altro account con la stessa email
		const userEmail = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: {
				where: [{ email: email }, { googleEmail: email }]
			}
		})
		if (userEmail && userEmail.id !== user.id && !!userEmail.stripeAccountId) {
			return res.status(400).json({ error: "Another user with the same email already have a stripe account" });
		}



		// se l'account non ha ancora uno stripe account lo creo
		if (!user.stripeAccountId) {
			const stripeAccount = await new Bus(this, this.state.stripe_service).dispatch({
				type: Actions.EXPRESS_ACCOUNT_CREATE,
				payload: {
					email: email,
					accountId: userJwt.id
				}
			})
			if (!stripeAccount.id) return res.status(500).json({ error: "Stripe account not created" });

			// salvo lo stripe account id
			user = await new Bus(this, this.state.account_repo).dispatch({
				type: typeorm.Actions.SAVE,
				payload: <AccountRepo>{
					id: user.id,
					stripeAccountId: stripeAccount.id,
					stripeAccountStatus: "pending",
				},
			});
		}

		// creo il link per la registrazione
		const url = await new Bus(this, this.state.stripe_service).dispatch({
			type: Actions.EXPRESS_ACCOUNT_URL,
			payload: user.stripeAccountId!
		})

		// ritorno il link
		res.status(200).json({ url })
	}

	/**
	 * Unregister and delete Stripe Express account
	 * Removes the account from Stripe and unlinks it from the database
	 */
	async unregister(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });

		// Check if user has a Stripe account to delete
		if (!user.stripeAccountId) return res.status(200).json({ message: "User does not have a Stripe account to delete" });

		try {
			const deletedAccount = await stripe.accounts.del(user.stripeAccountId);

			if (deletedAccount.deleted) {

				await new Bus(this, this.state.account_repo).dispatch({
					type: typeorm.Actions.SAVE,
					payload: <AccountRepo>{
						id: user.id,
						stripeAccountId: null,
						stripeAccountStatus: null,
					},
				});

				res.status(200).json({
					message: "Stripe account successfully deleted and unlinked",
					deletedAccountId: user.stripeAccountId
				});

			} else {
				throw new Error("Account deletion failed - Stripe returned deleted: false");
			}

		} catch (error: any) {
			res.status(500).json({
				error: "Failed to delete Stripe account",
				stripeError: error.message || "Unknown error",
				accountId: user.stripeAccountId
			});
		}
	}

}


export default StripeRoute


