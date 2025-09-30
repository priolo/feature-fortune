import { AccountRepo } from "@/repository/Account.js";
import { FundingRepo } from "@/repository/Funding.js";
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
				{ path: "/", verb: "post", method: "create" },


				{ path: "/donate", verb: "post", method: "donate" },
				{ path: "/link", verb: "post", method: "registerLink" },
			]
		}
	}

	/**
	 * 
	 */
	async create(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { funding }: { funding: FundingRepo } = req.body
		if (!funding) return

		funding.accountId = userJwt.id
		// è sempre nuovo
		delete funding.id

		// salvo
		const fundingNew: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: RepoRestActions.SAVE,
			payload: funding
		})

		res.json(fundingNew)
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


