import { AccountRepo } from "@/repository/Account.js";
import { FUNDING_STATE, FundingRepo } from "@/repository/Funding.js";
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

		// è sempre nuovo
		delete funding.id
		funding.accountId = userJwt.id
		funding.status = FUNDING_STATE.PENDING

		// salvo
		const fundingNew: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: RepoRestActions.SAVE,
			payload: funding
		})

		res.json(fundingNew)
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


