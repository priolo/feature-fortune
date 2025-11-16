import { ServiceBase } from "@priolo/julian";



type State = Partial<CronoService['stateDefault']>
export type CronoServiceConf = Partial<State>

abstract class CronoService extends ServiceBase {

	get stateDefault() {
		return {
			...super.stateDefault,
			delay: 1000 * 60 * 5,
			autoStart: true,
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
	protected startCrono(): void {
		this.stopCrono()
		this.timeoutId = setTimeout(async () => {
			try {
				await this.onCronoTick()
			} catch (error) {
				console.error("Error in startCrono:", error)
			} finally {
				this.startCrono()
			}
		}, this.state.delay)
	}

	/** ferma il CRONO */
	protected stopCrono(): void {
		if (!this.timeoutId) return
		clearTimeout(this.timeoutId);
		this.timeoutId = null;
	}
	
}

export default CronoService;
