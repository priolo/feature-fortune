import { httpRouter } from "@priolo/julian";
import { Request, Response } from "express";



class ReflectionRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/reflection",
			routers: [
				{ path: "/health", verb: "get", method: "health" },
			]
		}
	}
	declare state: typeof this.stateDefault

	async health(req: Request, res: Response) {
		res.json({ state: "ok" })
	}

}

export default ReflectionRoute
