import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { FUNDING_STATUS, FundingRepo } from "../repository/Funding.js";
import Stripe from "stripe";
import { AccountRepo } from "../repository/Account.js";
import PaymentCrono from "../services/crono/FeaturePaymentCrono.js";
import { Actions } from "../services/stripe/types.js";
import { getGithubHtmlUrl } from "./GithubRoute.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);



class StripeRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/stripe",
			repository: "/typeorm/fundings",
			account_repo: "/typeorm/accounts",
			funding_repo: "/typeorm/fundings",
			payment_service: "/payments-crono",
			stripe_service: "/stripe",
			routers: [
				{ path: "/register_link", verb: "post", method: "registerLink" },
				{ path: "/unregister", verb: "post", method: "unregister" },
				// [II] DA ELIMINARE
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
		if (!fundingId) return res.status(400).json({ error: "Funding ID is required" })

		// check
		const funding: FundingRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: fundingId
		})
		// const funding: FundingRepo = await new Bus(this, this.state.funding_repo).dispatch({
		// 	type: typeorm.Actions.FIND_ONE,
		// 	payload: <FindManyOptions<FundingRepo>>{
		// 		where: { id: fundingId },
		// 		relations: {
		// 			feature: true,
		// 			account: true,
		// 		}
		// 	}
		// })
		if (funding.accountId !== userJwt.id) {
			return res.status(403).json({ error: "You are not the owner of this funding" })
		}
		if (funding.status !== FUNDING_STATUS.PENDING && funding.status !== FUNDING_STATUS.ERROR) {
			return res.status(400).json({ error: `Funding status must be PENDING or ERROR, current status is ${funding.status}` })
		}

		// // transform in PAYABLE
		// const featureUp = await new Bus(this, this.state.funding_repo).dispatch({
		// 	type: typeorm.Actions.SAVE,
		// 	payload: {
		// 		id: funding.id,
		// 		status: FUNDING_STATUS.PAYABLE,
		// 	}
		// })
		// if (!featureUp) {
		// 	return res.status(500).json({ error: "Funding not updated to PAYABLE" });
		// }

		// get payment service and pay
		const paymentCronoService = this.nodeByPath(this.state.payment_service) as PaymentCrono
		await paymentCronoService.paymentFunding(fundingId, true)

		res.json({ success: true })
	}

	/**
	 * link per registrazione STRIPE-STANDARD dell AUTHOR 
	 */
	async registerLink(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})


		// CHECK
		if (!user) return res.status(404).json({ error: "User not found" });
		const email = user.email ?? user.googleEmail
		if (!email) return res.status(400).json({ error: "User has no email" });


		// GET the existing STRIPE ACCOUNT to check if still exist
		let isNewAccount = false;
		let stripeAccount: Stripe.Account | null = null;
		if (!!user.stripeAccountId) {
			try {
				stripeAccount = await new Bus(this, this.state.stripe_service).dispatch({
					type: Actions.ACCOUNT_GET,
					payload: user.stripeAccountId,
				})
			} catch (error) {
				// se non esiste lo resetto
				await new Bus(this, this.state.account_repo).dispatch({
					type: typeorm.Actions.SAVE,
					payload: <AccountRepo>{
						id: user.id,
						stripeAccountId: null,
						stripeAccountStatus: null,
					},
				});
				user.stripeAccountId = null;
				user.stripeAccountStatus = null;
			}
		}

		// CREATE se l'account non ha ancora uno stripe account lo creo
		if (!user.stripeAccountId) {
			isNewAccount = true;
			const githubUrl = await getGithubHtmlUrl(user.githubId!)

			stripeAccount = await new Bus(this, this.state.stripe_service).dispatch({
				type: Actions.ACCOUNT_CREATE,
				payload: {
					name: user.name,
					email: email,
					accountId: userJwt.id,
					url: githubUrl,
				}
			})
			if (!stripeAccount?.id) return res.status(500).json({ error: "Stripe account not created" });

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


		// LINK creo il link per la registrazione
		// Se l'account è nuovo o non ha ancora inviato i dettagli, uso onboarding
		const useOnboarding = isNewAccount || (stripeAccount && !stripeAccount.details_submitted);

		const url = await new Bus(this, this.state.stripe_service).dispatch({
			type: Actions.ACCOUNT_URL,
			payload: user.stripeAccountId!,
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

		} finally {

			await new Bus(this, this.state.account_repo).dispatch({
				type: typeorm.Actions.SAVE,
				payload: <AccountRepo>{
					id: user.id,
					stripeAccountId: null,
					stripeAccountStatus: null,
				},
			});

		}
	}

}

export default StripeRoute
