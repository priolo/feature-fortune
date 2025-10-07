import { AccountRepo, accountSendable, EMAIL_CODE, JWTPayload } from "../repository/Account.js";
import { ENV_TYPE } from "../types/env.js";
import { Bus, email as emailNs, httpRouter, jwt, typeorm } from "@priolo/julian";
import crypto from "crypto";
import { Request, Response } from "express";
import { Actions } from "src/services/email/EmailService.js";
import { FindManyOptions } from "typeorm";



class AuthRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/api/auth",
			email: "/google-email",
			repository: "/typeorm/accounts",
			jwt: "/jwt",
			routers: [
				{ path: "/current", verb: "get", method: "current" },
				{ path: "/logout", verb: "post", method: "logout" },
				{ path: "/email_code", verb: "post", method: "emailSendCode" },
				{ path: "/email_verify", verb: "post", method: "emailVerify" },
			]
		}
	}
	declare state: typeof this.stateDefault

	/** se esiste JWT restituisce l'utente */
	async current(req: Request, res: Response) {

		if (process.env.NODE_ENV == ENV_TYPE.DEV && process.env.AUTO_AUTH_ENABLE === "true") {
			return this.currentDemo(req, res);
		}

		// ricavo JWT dai cookies
		const token: string = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ user: null });
		}

		try {

			// decodifico il JWT per andare a cercarlo nel DB
			const userJwt: JWTPayload = await new Bus(this, "/jwt").dispatch({
				type: jwt.Actions.DECODE,
				payload: token,
			})

			// cerco lo USER tramite email
			// const users: AccountRepo[] = await new Bus(this, this.state.repository).dispatch({
			// 	type: typeorm.Actions.FIND,
			// 	payload: <FindManyOptions<AccountRepo>>{
			// 		//select: ["id", "email", "name", "avatar"],
			// 		where: { email: data.email },
			// 	}
			// })
			const user: AccountRepo = await new Bus(this, this.state.repository).dispatch({
				type: typeorm.Actions.GET_BY_ID,
				payload: userJwt.id
			})

			// se non c'e' allora errore
			if (!user) return res.status(404).json({ user: null })

			//#region GOOGLE

			// Verifica il token (puoi usare una libreria come jsonwebtoken per verificarlo)
			// const ticket = await client.verifyIdToken({
			// 	idToken: token,
			// 	audience: '106027300810-0udm0cjghhjr87626qrvcoug5ahgq1bh.apps.googleusercontent.com',
			// })
			// verificato. mando il payload di JWT
			//const user = ticket.getPayload();

			//#endregion

			// restituisco i dati dell'utente loggato
			res.status(200).json({
				user: accountSendable(user),
			});

		} catch (error) {
			// NON verificato
			res.status(401).json({ user: null })
		}
	}
	private async currentDemo(req: Request, res: Response) {
		// carico l'account DEMO
		const user: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				//select: ["id", "email", "name", "avatar"],
				where: { id: "id-user-1" },
			}
		})
		// Genera il token JWT con l'email nel payload
		const jwtToken: string = await new Bus(this, "/jwt").dispatch({
			type: jwt.Actions.ENCODE,
			payload: {
				payload: <JWTPayload>{
					id: user.id,
					email: user.email,
					name: user.name,
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

	/** elimino il cookie JWT cosi da chiudere la sessione */
	async logout(req: Request, res: Response) {
		res.clearCookie('jwt');
		res.status(200).send('Logout successful');
	}







	/**
	 * Grazie all'"email" registra un nuovo utente
	 */
	async emailSendCode(req: Request, res: Response) {
		const { email } = req.body

		// creo il codice segreto da inviare per email
		const code = process.env.NODE_ENV == ENV_TYPE.TEST ? "AAA" : crypto.randomBytes(8).toString('hex')

		// verifico che non esista gia' un utente con questa email
		let user = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				where: [
					{ email: email, emailCode: EMAIL_CODE.VERIFIED },
					{ googleEmail: email }
				]
			}
		})

		// se sono gia' loggato e trovo questa 
		// email allora è un errore perchè in questo caso voglio fare un ATTACH
		//if (!!user) return res.status(400).json({ error: "register:email:exists" })

		// altrimenti creo un utente temporaneo con l'email
		if (!user) user = { email, }

		// aggiorno l'account con il codice di verifica
		await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.SAVE,
			payload: { ...user, emailCode: code, },
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


		// // Creating a unique salt for a particular user 
		// user.salt = crypto.randomBytes(16).toString('hex');
		// // Hashing user's salt and password with 1000 iterations, 
		// user.password = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);

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

	/**
	 * eseguo il login grazie a "email" e "password"
	 */
	async login(req: Request, res: Response) {
		const { repository } = this.state
		var { email, password } = req.body

		// get user
		const users = await new Bus(this, repository).dispatch({
			type: typeorm.Actions.FIND,
			payload: { where: { email } }
		})
		if (users.length == 0) return res.sendStatus(404)
		const user = users[0]

		// check password
		const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`)
		const correct = hash == user.password
		if (!correct) return res.status(404).json({ error: "login:account:not_found" })

		// inserisco user nel payload jwt
		const jwtService = this.nodeByPath<httpRouter.jwt.Service>("/http/route/route-jwt")
		const token = await jwtService.putPayload(user, res)
		res.json({ token })
	}
}

export default AuthRoute