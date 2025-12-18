import { ServiceBase } from "@priolo/julian";
import { TypeLog } from "@priolo/julian/dist/core/types.js";



type State = Partial<CronoService['stateDefault']>
export type CronoServiceConf = Partial<State>

export enum CRONO_STATUS {
	STOPPED = "stopped",
	RUNNING = "running",
}


abstract class CronoService extends ServiceBase {

	get stateDefault() {
		return {
			...super.stateDefault,
			delay: 1000 * 60 * 5, // each 5 minutes
			autoStart: true,
			status: CRONO_STATUS.STOPPED,
		}
	}
	declare state: typeof this.stateDefault

	/** Timeout handle for scheduling the next tick */
	private timeoutId: ReturnType<typeof setTimeout> | null = null;

	

	/** funzione da implementare con la logica da eseguire ad ogni tick */
	protected abstract onCronoTick(): Promise<void> | void;




	/** se cambia qualcosaallora resetto il CRONO */
	protected onStateChanged(oldState: State, newState: State, partial?: State) {
		super.onStateChanged(oldState, newState, partial)
		if (
			oldState.delay !== newState.delay ||
			oldState.autoStart !== newState.autoStart
		) {
			this.startCrono();
		}
	}

	/** all'init del NODE eventualmente avvio il CRONO*/
	protected async onInitAfter(): Promise<void> {
		await super.onInitAfter();
		if (this.state.autoStart) this.startCrono();
	}

	/** sulla distruzione del NODE elimino il CRONO */
	protected async onDestroy(): Promise<void> {
		this.stopCrono();
		await super.onDestroy();
	}



	/** avvia il CRONO */
	startCrono(): void {
		this.clearCrono()
		this.timeoutId = setTimeout(async () => {
			try {
				await this.onCronoTick()
			} catch (error) {
				this.log("CRONO : setTimeout", error, TypeLog.ERROR)
			} finally {
				if ( this.state.status == CRONO_STATUS.STOPPED ) return
				this.startCrono()
			}
		}, this.state.delay)
		this.state.status = CRONO_STATUS.RUNNING
	}

	/** ferma il CRONO */
	stopCrono(): void {
		this.clearCrono()
		this.state.status = CRONO_STATUS.STOPPED
	}

	private clearCrono(): void {
		if (!this.timeoutId) return
		clearTimeout(this.timeoutId);
		this.timeoutId = null;
	}

}

export default CronoService;
