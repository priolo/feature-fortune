import logSo from "@/stores/log"
import { MESSAGE_TYPE } from "@/stores/log/utils"



enum METHOD {
	POST = "post",
	GET = "get",
	PATCH = "PATCH",
	PUT = "put",
	DELETE = "delete"
}

const optionsDefault = {
	baseUrl: import.meta.env.VITE_API_URL ?? "/api/",
	/** si tratta di una richiesta di login */
	isLogin: false,
	loading: true,
	noError: false,
	store: null,
	/** utilizza questo signal per fare l'abort */
	signal: <AbortSignal>null,
	/** se true setto nello store l'oggetto per l'abort */
	manageAbort: false,
	/** [DISABILITATO] non restituire trasformato in camelCase */
	noCamel: false,

}
export type CallOptions = Partial<typeof optionsDefault>


export class AjaxService {

	async post(url: string, data?: any, options?: CallOptions) {
		return await this.send(url, METHOD.POST, data, options)
	}
	async get(url: string, options?: CallOptions) {
		return await this.send(url, METHOD.GET, null, options)
	}
	async patch(url: string, data?: any, options?: CallOptions) {
		return await this.send(url, METHOD.PATCH, data, options)
	}
	async put(url: string, data?: any, options?: CallOptions) {
		return await this.send(url, METHOD.PUT, data, options)
	}
	async delete(url: string, data?: any, options?: CallOptions) {
		return await this.send(url, METHOD.DELETE, data, options)
	}

	/**
	 * Send a ajax to server
	 */
	async send(url: string, method: METHOD, data?: any, options: Partial<CallOptions> = {}) {
		options = { ...optionsDefault, ...options }

		// PREPARE DATA
		//data = camelToSnake(data)
		const headers = {
			"Content-Type": "application/json",
			"Accept": "application/json",
		}

		// SEND REQUEST
		let response = null
		try {
			response = await fetch(
				`${options.baseUrl}${url}`,
				{
					method: method,
					headers,
					body: data ? JSON.stringify(data) : undefined,
					signal: options.signal,
					...(options.isLogin ? { credentials: 'include' } : {})
				}
			)
		} catch (e) {
			if (options.noError) return
			if (e.code != 20) {
				logSo.add({
					type: MESSAGE_TYPE.ERROR,
					title: "http:error:fetch",
					body: e.toString(),
					targetId: options.store?.state?.uuid,
				})
			}
			throw e
		} finally {
		}

		// GET DATA
		let ret = null
		let jsonError: string = null
		try {
			const raw = await response.json()
			ret = raw//options.noCamel ? raw : snakeToCamel(raw)
		} catch (e) {
			jsonError = e.toString()
		}

		// MANAGE HTTP ERRORS
		const status = response.status
		if (status >= 400 && !options.noError) {
			const error = ret?.error as string ?? jsonError ?? `${status} generic`
			logSo.add({
				type: MESSAGE_TYPE.ERROR,
				title: `http:error:${status}`,
				body: error,
				targetId: options.store?.state?.uuid,
			})
			throw error
		}
		
		return ret
	}
}

export default new AjaxService()
