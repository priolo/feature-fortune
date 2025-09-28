import { AccountRepo } from "@/repository/Account.js";
import { FeatureRepo } from "@/repository/Feature.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";



class FeatureRoute extends httpRouter.Service {

	get stateDefault(): httpRouter.conf & any {
		return {
			...super.stateDefault,
			path: "/features",
			repository: "/typeorm/features",
			routers: [
				{ path: "/", verb: "get", method: "getAll" },
				{ path: "/:id", verb: "get", method: "getById" },
				{ path: "/", verb: "post", method: "create" },
				{ path: "/:id", verb: "delete", method: "delete" },
				{ path: "/:id", verb: "patch", method: "update" }
			]
		}
	}

	async getAll(req: Request, res: Response) {
		const features = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.RepoRestActions.ALL
		})
		res.json(features)
	}

	async getById(req: Request, res: Response) {
		const id = req.params["id"]
		const feature: FeatureRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: {
				where: { id: id },
				relations: { comments: true, fundings: true, account: true }
			}
		})
		res.json(feature)
	}


	async create(req: Request, res: Response) {
		const { feature }: { feature: FeatureRepo } = req.body
		const featureNew: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.RepoRestActions.SAVE,
			payload: feature
		})
		res.json(featureNew)
	}

	async delete(req: Request, res: Response) {
		const id = req.params["id"]
		await new Bus(this, this.state.repository).dispatch({
			type: typeorm.RepoRestActions.DELETE,
			payload: id
		})
		res.json({ data: "ok" })
	}

	async update(req: Request, res: Response) {
		const id = req.params["id"]
		const { feature }: { feature: FeatureRepo } = req.body
		if (!id || !feature) return
		const userUp = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.RepoRestActions.SAVE,
			payload: feature,
		})
		res.json(userUp)
	}
}

export default FeatureRoute


