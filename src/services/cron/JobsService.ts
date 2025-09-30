import { ServiceBase } from "@priolo/julian"
import { TypeLog } from "@priolo/julian/dist/core/types.js"
import { randomUUID } from "crypto"
import dayjs from "dayjs"




export type JobsConf = Partial<JobsService['stateDefault']>

/**
 * Permette di gestire i log.. per esempio su console o su file
 * essenzialmente utilizza winstonjs
 */
export class JobsService extends ServiceBase {

	get stateDefault() {
		return {
			...super.stateDefault,
			retryDelta: 1000 * 60 * 5, // 5 minuti
			retryMaxDelay: 1000 * 60 * 60 * 24, // 24 ore
			schedulings: [] as Scheduling[],
			onSchedulingsLoad: null as () => Promise<Scheduling[]>,
			onSchedulingEnd: null as (scheduling: Scheduling) => void,
		}
	}




	/**
	 * Creao l'istanza del logger
	 */
	protected async onInitAfter(): Promise<void> {
		await super.onInitAfter()

		if (!!this.state.onSchedulingsLoad) {
			this.state.schedulings = await this.state.onSchedulingsLoad()
		}
		for (const scheduling of this.state.schedulings) {
			this.addScheduling(scheduling)
		}
	}

	getScheduling(schedulingId: string) {
		return this.state.schedulings.find(s => s.id === schedulingId)
	}

	addScheduling(scheduling: Scheduling) {
		const existing = this.getScheduling(scheduling.id!)
		if (existing) return this.log("CRON", `Cannot add scheduling ${scheduling.id}, already exists`, TypeLog.ERROR)
		if ( scheduling.state !== JOB_STATE.PENDING ) return this.log("CRON", `Cannot add scheduling ${scheduling.id}, state is not PENDING`, TypeLog.ERROR)
		if ( scheduling.date < Date.now() ) return this.log("CRON", `Cannot add scheduling in the past (${dayjs(scheduling.date).format("YYYY-MM-DD HH:mm:ss")})`, TypeLog.ERROR)
		if ( !!scheduling.dateRetry && scheduling.dateRetry < Date.now() ) return this.log("CRON", `Cannot add scheduling with retry in the past (${dayjs(scheduling.dateRetry).format("YYYY-MM-DD HH:mm:ss")})`, TypeLog.ERROR)

		if (!scheduling.id) scheduling.id = randomUUID()

		const date = scheduling.dateRetry ?? scheduling.date
		scheduling.timeoutId = setTimeout(
			() => this.executeScheduling(scheduling.id),
			date - Date.now()
		)

		this.state.schedulings.push(scheduling)
		this.setState({ schedulings: this.state.schedulings })
	}

	removeScheduling(schedulingId: string) {
		const scheduling = this.getScheduling(schedulingId)
		if (!scheduling) return this.log("CRON", `Cannot remove scheduling ${schedulingId}, not found`, TypeLog.ERROR)

		if (!!scheduling.timeoutId) clearTimeout(scheduling.timeoutId)
		this.state.schedulings = this.state.schedulings.filter(s => s.id !== schedulingId)
		this.setState({ schedulings: this.state.schedulings })
	}

	async executeScheduling(schedulingId: string) {
		const scheduling = this.getScheduling(schedulingId)
		this.removeScheduling(schedulingId)

		// eseguo il JOB
		scheduling.state = await scheduling.job(scheduling)

		// se non c'e' qualche parametro c'e' un problema
		if (!scheduling.date || !scheduling.job || !scheduling.state) {
			this.log("CRON", `Cron job missing parameters, aborting`)
			scheduling.state = JOB_STATE.ABORT
		}

		// se c'e il Retry controllo che non l'abbia fatto per troppo tempo
		if (!!scheduling.dateRetry) {
			const maxRetryTime = scheduling.date + this.state.retryMaxDelay
			if (scheduling.dateRetry > maxRetryTime) {
				this.log("CRON", `Cron job reached max retry time, aborting`)
				scheduling.state = JOB_STATE.RETRY_FAIL
			}
		}

		// in base allo stato decido cosa fare
		switch (scheduling.state) {

			case JOB_STATE.PENDING: {
				scheduling.dateRetry = undefined
				this.addScheduling(scheduling)
			} break

			case JOB_STATE.RETRY: {
				scheduling.dateRetry = Date.now() + this.state.retryDelta
				this.log("CRON", `Cron job will retry at ${dayjs(scheduling.dateRetry).format("YYYY-MM-DD HH:mm:ss")}`)
				this.addScheduling(scheduling)
			} break

			case JOB_STATE.RETRY_FAIL: {
				this.state.onSchedulingEnd?.(scheduling)
			} break

			case JOB_STATE.SUCCESS: {
				this.state.onSchedulingEnd?.(scheduling)
			} break

			case JOB_STATE.ABORT: {
				this.state.onSchedulingEnd?.(scheduling)
			} break

		}
	}

}


export type Scheduling = {
	id?: string,
	date: number,
	dateRetry?: number,
	timeoutId?: NodeJS.Timeout,
	job: JobCallback,
	state: JOB_STATE,
}

export type JobCallback = (scheduling:Scheduling) => Promise<JOB_STATE>

export enum JOB_STATE {
	PENDING = 1,
	SUCCESS,
	ABORT,
	RETRY,
	RETRY_FAIL,
}