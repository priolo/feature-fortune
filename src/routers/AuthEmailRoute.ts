import { Bus, httpRouter, jwt, typeorm } from "@priolo/julian";
import crypto from "crypto";
import { Request, Response } from "express";
import { Actions } from "../services/email/EmailService.js";
import { FindManyOptions } from "typeorm";
import { AccountRepo, accountSendable, EMAIL_CODE, JWTPayload } from "../repository/Account.js";
import { ENV_TYPE } from "../types/env.js";



class AuthEmailRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/api/auth",
			email: "/google-email",
			repository: "/typeorm/accounts",
			jwt: "/jwt",
			routers: [
				{ path: "/email_code", verb: "post", method: "emailSendCode" },
				{ path: "/email_verify", verb: "post", method: "emailVerify" },
			]
		}
	}
	declare state: typeof this.stateDefault
	

	/**
	 * Grazie all'"email" registra un nuovo utente
	 */
	async emailSendCode(req: Request, res: Response) {
		const { email } = req.body

		// creo il codice segreto da inviare per email
		const code = process.env.NODE_ENV == ENV_TYPE.TEST ? "AAA" : crypto.randomBytes(8).toString('hex')



		// FIND ACCOUNT
		let user = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				where: [
					{ email: email },
					{ googleEmail: email }
				]
			}
		}) ?? { email }

		// ACCOUNT UPDATE
		user = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.SAVE,
			payload: { 
				...user, 
				emailCode: code, 
			},
		})



		// invio l'email per l'attivazione del codice
		await new Bus(this, this.state.email).dispatch({
			type: Actions.SEND,
			payload: {
				from: process.env.EMAIL_SENDER ?? "from@support.com",
				to: email,
				subject: "Richiesta registraziuone",
				html: `
					<div>ue ueue ti vuoi reggggistrare! he?</div> 
					<div>questo è il codice</div> 
					<div>${code}</div> 
				`,
			}
		})

		res.status(200).json({ data: "ok" })
	}

	/**
	 * Permette di attivare un utente confermado con il "code" e la "password"
	 */
	async emailVerify(req: Request, res: Response) {
		var { code } = req.body

		// cerco lo USER tramite il codice
		const user: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				where: { emailCode: code }
			}
		})
		if (!user) return res.status(404).json({ error: "activate:code:not_found" })

		// verifico l'email
		user.emailCode = EMAIL_CODE.VERIFIED
		await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.SAVE,
			payload: user,
		})

		// Genera il token JWT con l'email nel payload
		const jwtToken: string = await new Bus(this, "/jwt").dispatch({
			type: jwt.Actions.ENCODE,
			payload: {
				payload: <JWTPayload>{
					id: user.id,
					name: user.name ?? user.email,
					email: user.email,
				}
			},
		})
		// memorizzo JWT nei cookies. Imposta il cookie HTTP-only
		res.cookie('jwt', jwtToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // Assicurati di usare secure solo in produzione
			maxAge: 24 * 60 * 60 * 1000, // 1 giorno
		});

		// restituisco i dati dell'utente loggato
		res.status(200).json({
			user: accountSendable(user),
		});
	}

}

export default AuthEmailRoute