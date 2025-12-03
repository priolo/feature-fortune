import { Bus, typeorm } from "@priolo/julian";
import { FEATURE_STATUS, FeatureRepo } from "../../repository/Feature.js";
import { FindManyOptions, LessThan } from "typeorm";
import { AccountRepo } from "../../repository/Account.js";
import { FUNDING_STATUS, FundingRepo } from "../../repository/Funding.js";
import { Actions, PaymentIntentData } from "../stripe/types.js";
import CronoService from "./CronoService.js";



class FeaturePaymentCrono extends CronoService {

	get stateDefault() {
		return {
			...super.stateDefault,
			name: "payments-crono",
			/** ogni quanto tempo controllo le FEATURES */
			delay: 1000 * 5,
			/** il tempo (ms) che deve passare dopo il COMPLETE per far partire i pagamenti */
			delayComplete: 1000 * 60 * Number(process.env.PAYMENT_AFTER_COMPLETION_MIN ?? 60),
			funding_repo: "/typeorm/fundings",
			account_repo: "/typeorm/accounts",
			feature_repo: "/typeorm/features",
			stripe_service: "/stripe",
		}
	}
	declare state: typeof this.stateDefault

	protected async onCronoTick(): Promise<void> {
		await this.payAllCompleted()
	}

	/**
	 * Cerco tutte le FEATURE COMPLETED da 24 ore quindi pago tutti i FUNDING collegati
	 */
	async payAllCompleted() {

		// prelevo tutte le FEATURE COMPLETED da più di 24 ore
		const featuresCompleted = await new Bus(this, this.state.feature_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: {
				where: {
					status: FEATURE_STATUS.COMPLETED,
					completedAt: LessThan(new Date(Date.now() - this.state.delayComplete)),
				},
				relations: {
					fundings: true,
				}
			} as FindManyOptions<FeatureRepo>
		})

		// setto tutti i FUNDING allo status = PAYABLE
		for (const feature of featuresCompleted) {

			// aggiorno tutti i suoi FUNDING a PAYABLE
			await new Bus(this, this.state.funding_repo).dispatch({
				type: typeorm.Actions.UPDATE,
				payload: {
					criteria: {
						featureId: feature.id,
						status: FUNDING_STATUS.PENDING
					},
					partial: {
						status: FUNDING_STATUS.PAYABLE
					},
				},
			})

			// aggiorno la FEATURE a PAID
			const ret = await new Bus(this, this.state.feature_repo).dispatch({
				type: typeorm.Actions.SAVE,
				payload: {
					id: feature.id,
					status: FEATURE_STATUS.PAID,
				}
			})
			console.log(ret)
		}




		// cerco tutti i FUNDING di tipo PAYABLE e li pago!!!
		const payableFundings: FundingRepo[] = await new Bus(this, this.state.funding_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: {
				where: {
					status: FUNDING_STATUS.PAYABLE,
				}
			} as FindManyOptions<FundingRepo>
		})
		for (const funding of payableFundings) {
			await this.paymentFunding(funding.id)
		}
	}

	/**
	 * Execute the PAYMENT for a FUNDING
	 */
	async paymentFunding(fundingId: string, ignoreState:boolean = false): Promise<FundingRepo> {

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
		if (funding.status !== FUNDING_STATUS.PAYABLE && !ignoreState) {
			throw new Error("Funding status must be PENDING or PAYABLE to execute payment")
		}

		// recupero l'id ACCOUNT di chi deve ricevere i soldi (sarebbe il DEV dell FEATURE)
		const dev: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: funding.feature.accountDevId
		})
		if (!dev) throw new Error(`Developer not found for feature ${funding.feature.id}`);


		// setup DATA and PAY
		const payload: PaymentIntentData = {
			amount: funding.amount,
			currency: funding.currency,
			customer: funding.account.stripeCustomerId,
			paymentMethod: funding.account.stripePaymentMethodId,
			destination: dev.stripeAccountId,
			fundingId: funding.id, 
			receiptEmail: funding.account.email,
			/** specifico il nome del progetto */
			projectName: funding.feature.githubRepoMetadata?.name,
		}
		let paymentIntent: any
		try {
			paymentIntent = await new Bus(this, this.state.stripe_service).dispatch({
				type: Actions.PAYMENT_EXECUTE,
				payload
			})
		} catch (error) {
			throw error
		} finally {
			await new Bus(this, this.state.funding_repo).dispatch({
				type: typeorm.Actions.SAVE,
				payload: {
					id: funding.id,
					status: FUNDING_STATUS.ERROR,
				}
			})
		}


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


		// log & return
		this.log("funding:payment:", payload)
		return funding
	}

}

export default FeaturePaymentCrono
