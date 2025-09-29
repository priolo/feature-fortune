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
				{ path: "/", verb: "post", method: "save" },
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


	async save(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { feature }: { feature: FeatureRepo } = req.body
		if (!feature) return
		feature.accountId = userJwt.id

		// se è nuovo lo creo
		if (feature.id == null) {
			delete feature.id

		// verifico che lo possa modificare
		} else {
			const featureOld: FeatureRepo = await new Bus(this, this.state.repository).dispatch({
				type: typeorm.RepoRestActions.GET_BY_ID,
				payload: feature.id
			})
			if (!featureOld) return res.status(404).json({ error: "Feature not found" })
			if (featureOld.accountId !== userJwt.id) return res.status(403).json({ error: "You are not allowed to modify this feature" })
		}

		// non si possono modificare COMMENT e FUNDING
		delete feature.comments
		delete feature.fundings

		// salvo
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


