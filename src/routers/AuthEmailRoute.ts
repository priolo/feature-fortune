import { Bus, httpRouter, jwt, typeorm } from "@priolo/julian";
import crypto from "crypto";
import { Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import { AccountRepo, accountSendable, EMAIL_CODE, JWTPayload } from "../repository/Account.js";
import { ENV_TYPE } from "../types/env.js";
import { Actions } from "src/services/email/EmailResendService.js";



class AuthEmailRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/api/auth",
			email_path: "/resend-email",
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
		const code = process.env.NODE_ENV == ENV_TYPE.TEST
			? "AAA"
			: crypto.randomBytes(3).toString('hex').slice(0, 5).toUpperCase();

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

		// INVIO EMAIL con il codice
		await new Bus(this, this.state.email_path).dispatch({
			type: Actions.SEND,
			payload: {
				from: process.env.EMAIL_SENDER ?? "from@support.com",
				to: email,
				subject: "Richiesta registraziuone",
				html: `
				<div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px; border-radius: 8px; max-width: 480px; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
					<h2 style="color: #2d7ff9;">Welcome to Feature Fortune!</h2>
					<p style="font-size: 16px; color: #333;">Thank you for registering your account. To complete your registration, please use the following verification code:</p>
					<div style="margin: 24px 0; text-align: center;">
						<span style="display: inline-block; background: #eaf4ff; color: #2d7ff9; font-size: 28px; font-weight: bold; letter-spacing: 4px; padding: 16px 32px; border-radius: 6px;">${code}</span>
					</div>
					<p style="font-size: 15px; color: #555;">Enter this code in the app to activate your account. If you did not request this, you can safely ignore this email.</p>
					<hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
					<p style="font-size: 13px; color: #aaa;">If you have any questions, please contact our support team.</p>
				</div>
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
		if (!code) return res.status(400).json({ error: "activate:code:missing" })

		// cerco lo USER tramite il codice
		const user: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				where: { emailCode: (<string>code).toUpperCase() }
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