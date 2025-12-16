import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import { AccountRepo, accountSendable } from "../repository/Account.js";
import { client } from "./AuthGoogleRoute.js";



class GoogleRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/google",
			account_repo: "/typeorm/accounts",
			routers: [
				{ path: "/", verb: "post", method: "attachGoogle" },
				{ path: "/", verb: "delete", method: "detachGoogle" },
			]
		}
	}
	declare state: typeof this.stateDefault

	
	/** 
	 * Aggancio un account GOOGLE all'ACCOUNT attualmente loggato
	 */
	async attachGoogle(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const user: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: userJwt.id,
		})
		if (!user) return res.status(404).json({ error: "User not found" })



		const { token } = req.body
		if (!token) return res.status(400).json({ error: "Missing token parameter" });
		try {

			// Verifico GOOGLE token e ricavo PAYLOAD
			const ticket = await client.verifyIdToken({
				idToken: token,
				audience: process.env.GOOGLE_CLIENT_ID,
			})
			const payload = ticket.getPayload()

			// se è gia' settato come email google allora tutto ok
			if (user.googleEmail === payload.email) {
				return res.status(200).json({ user })
			}

			// cerco lo USER tramite l'email
			const userDuplicate: AccountRepo = await new Bus(this, this.state.account_repo).dispatch({
				type: typeorm.Actions.FIND_ONE,
				payload: <FindManyOptions<AccountRepo>>{
					where: { googleEmail: payload.email },
				}
			})
			
			// se c'e' allora l'email è gia' utilizzata
			if (!!userDuplicate) {
				return res.status(400).json({ error: "Email already in use" });
			}

			await new Bus(this, this.state.account_repo).dispatch({
				type: typeorm.Actions.SAVE,
				payload: <Partial<AccountRepo>>{
					id: userJwt.id,
					googleEmail: payload.email,
				},
			})
			res.status(200).json({ 
				user: accountSendable(user),
			})

		} catch (error) {
			res.status(401).json({ error: 'Invalid Token' })
		}
	}

	async detachGoogle(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]

		await new Bus(this, this.state.account_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: <Partial<AccountRepo>>{
				id: userJwt.id,
				googleEmail: null,
			},
		})

		res.send({ success: true })
	}
}

export default GoogleRoute


