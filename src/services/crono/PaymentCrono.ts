import { AccountRepo } from "@/repository/Account.js";
import { FUNDING_STATE, FundingRepo } from "@/repository/Funding.js";
import { Octokit } from "@octokit/rest";
import { Bus, ServiceBase, typeorm } from "@priolo/julian";
import { FindManyOptions, LessThan } from "typeorm";
import { Actions, PaymentIntentData } from "../stripe/types.js";



const octokit = new Octokit({
	auth: process.env.GITHUB_REST_TOKEN,
})
type GithubRepo = {
	id: number;
	name: string;
	owner: { id: number; login: string; };
}

export type PaymentCronoConf = Partial<PaymentCrono['stateDefault']>

class PaymentCrono extends ServiceBase {

	get stateDefault() {
		return {
			...super.stateDefault,
			name: "crono-payments",
			delay: 1000 * 60 * 10, // ogni 10 minuti
			funding_repo: "/typeorm/fundings",
			account_repo: "/typeorm/accounts",
			stripe_service: "/stripe",
		}
	}
	declare state: typeof this.stateDefault;



	protected onStateChanged(oldState: PaymentCronoConf, newState: PaymentCronoConf) {
		if (oldState.delay !== newState.delay) this.startTimeout()
	}
	protected async onInitAfter(): Promise<void> {
		await super.onInitAfter()
		this.startTimeout()
	}
	protected async onDestroy(): Promise<void> {
		this.stopTimeout()
		await super.onDestroy()
	}






	private timeoutId: any

	private startTimeout() {
		this.stopTimeout()
		this.timeoutId = setTimeout(async () => {
			try {
				await this.paymentAllExpired()
			} catch (error) {
				console.error("Error in payAllExpired:", error)
			} finally {
				this.startTimeout()
			}
		}, this.state.delay)
	}

	private stopTimeout() {
		if (this.timeoutId) clearTimeout(this.timeoutId)
		this.timeoutId = null
	}

	private async paymentAllExpired() {
		const now = Date.now()
		const expiredFundings: FundingRepo[] = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: {
				where: {
					status: FUNDING_STATE.PENDING,
					expiresAt: LessThan(new Date()),
				}
			} as FindManyOptions<FundingRepo>
		})
		for (const funding of expiredFundings) {
			await this.paymentFunding(funding.id)
		}
	}

	/**
	 * Execute the PAYMENT for a FUNDING
	 */
	async paymentFunding(fundingId: string): Promise<FundingRepo> {

		// load FUNDING from DB
		const funding: FundingRepo = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<FundingRepo>>{
				where: { id: fundingId },
				relations: {
					feature: true,
					account: true
				}
			}
		})
		if (!funding) throw new Error("Funding not found");
		if (funding.status !== FUNDING_STATE.PENDING) throw new Error("Funding not pending");


		// load GITHUB REPO		
		const githubRepo:GithubRepo = (await octokit.request("GET /repositories/{id}", {
			id: funding.feature.githubId,
		}))?.data
		console.log(">>> GitHub repo data:", githubRepo)
		

		// load the owner of GITHUB. how get the money
		const githubOwner: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				where: { githubId: githubRepo.owner.id },
			}
		})
		if (!githubOwner) {
			throw new Error(`GitHub repository owner not found in accounts: ${githubRepo.owner.login}`)
		}


		// setup DATA
		const amount = funding.amount
		const destination = githubOwner.stripeAccountId
		const customer = funding.account.stripeCustomerId
		const paymentMethod = funding.account.stripePaymentMethodId
		console.log(">>> paymentFunding", { amount, destination, customer, paymentMethod })


		// Execute the payment using StripeService
		const paymentIntent = await new Bus(this, this.state.stripe_service).dispatch({
			type: Actions.EXECUTE_PAYMENT,
			payload: {
				amount: amount,
				currency: "EUR",
				customer: customer,
				paymentMethod: paymentMethod,
				destination: destination,
			} as PaymentIntentData
		});


		// update funding in DB
		funding.status = FUNDING_STATE.PAIED
		funding.paidAt = new Date()
		funding.transactionId = paymentIntent.id
		await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: funding
		})

		return funding
	}

}


export default PaymentCrono


