import { AccountRepo } from "../../repository/Account.js";
import { FUNDING_STATUS, FundingRepo } from "../../repository/Funding.js";
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
					status: FUNDING_STATUS.PENDING,
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
					account: true,
				}
			}
		})


		// check
		if (!funding) throw new Error("Funding not found");
		// *** DA RIPRISTINARE!!! ***
		//if (funding.status !== FUNDING_STATUS.PENDING) throw new Error("Funding not pending");

		// recupero l'id ACCOUNT di chi deve ricevere i soldi (sarebbe il DEV dell FEATURE)
		const dev: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: funding.feature.accountDevId
		})
		if (!dev) {
			throw new Error(`Developer not found for feature ${funding.feature.id}`);
		}



		// setup DATA
		const amount = funding.amount
		const destination = dev.stripeAccountId
		const customer = funding.account.stripeCustomerId
		const paymentMethod = funding.account.stripePaymentMethodId
		console.log(">>> paymentFunding", { amount, destination, customer, paymentMethod })
		
		// Execute the payment using StripeService
		const paymentIntent = await new Bus(this, this.state.stripe_service).dispatch({
			type: Actions.PAYMENT_EXECUTE,
			payload: {
				amount: amount,
				currency: "EUR",
				customer: customer,
				paymentMethod: paymentMethod,
				destination: destination,
			} as PaymentIntentData
		});



		// update funding in DB
		const featureUp = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: {
				id: funding.id,
				status: FUNDING_STATUS.PAIED,
				paidAt: new Date(),
				transactionId: paymentIntent.id,
			}
		})
		funding.feature = featureUp

		return funding
	}

}


export default PaymentCrono


