import { AccountRepo } from "@/repository/Account.js";
import { FUNDING_STATE, FundingRepo } from "@/repository/Funding.js";
import PaymentCrono from "@/services/crono/PaymentCrono.js";
import { Actions, ExpressAccountData } from "@/services/stripe/types.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";



class FundingRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/fundings",
			repository: "/typeorm/fundings",
			account_repo: "/typeorm/accounts",
			stripe_service: "/stripe",
			routers: [
				{ path: "/", verb: "post", method: "create" },

				{ path: "/link", verb: "post", method: "registerLink" },
				{ path: "/pay", verb: "post", method: "pay" },
			]
		}
	}

	async pay(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { fundingId }: { fundingId: string } = req.body
		if (!fundingId) return
		const paymentCronoService = this.nodeByPath("/crono-payments") as PaymentCrono
		const funding = await paymentCronoService.paymentFunding(fundingId)
		res.json({ funding })
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
			type: typeorm.Actions.SAVE,
			payload: funding
		})

		res.json({ funding: fundingNew })
	}

	/**
	 * link per registrazione STRIPE-EXPRESS dell AUTHOR 
	 */
	async registerLink(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" });


		// check if the user have already a stripe account
		if (!!user.stripeAccountId) {
			return res.status(400).json({ error: "User already have a stripe account" });
		}

		// Create Express account using StripeService
		const expressAccountData: ExpressAccountData = {
			email: userJwt.email,
			accountId: userJwt.id,
			refreshUrl: "http://localhost:5173/app/feature",
			returnUrl: "http://localhost:5173/app/feature",
		};

		const { account, accountLink } = await new Bus(this, this.state.stripe_service).dispatch({
			type: Actions.CREATE_EXPRESS_ACCOUNT_URL,
			payload: expressAccountData
		});

		res.status(200).json(
			{ url: accountLink.url }
		)
	}

}


export default FundingRoute


