import { Bus, httpRouter, jwt, typeorm } from "@priolo/julian";
import crypto from "crypto";
import { Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import { AccountRepo, accountSendable, JWTPayload } from "../repository/Account.js";
import { ENV_TYPE } from "../types/env.js";



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
				{ path: "/autologin", verb: "post", method: "autoLogin" },
			]
		}
	}
	declare state: typeof this.stateDefault

	/** se esiste JWT restituisce l'utente */
	async current(req: Request, res: Response) {

		if (process.env.NODE_ENV == ENV_TYPE.DEV && process.env.AUTO_AUTH_ENABLE === "true") {
			return this.autoLogin(req, res);
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
	async autoLogin(req: Request, res: Response) {
		// fai autologin solo in DEV o TEST
		if (!(
			process.env.NODE_ENV == ENV_TYPE.TEST
			|| (process.env.NODE_ENV == ENV_TYPE.DEV && process.env.AUTO_AUTH_ENABLE == "true")
		)) {
			return res.status(401).json({ user: null });
		}

		let { userId }: { userId: string } = req.body
		if ( !userId ) userId = "id-user-1"

		// carico l'account DEMO
		const user: AccountRepo = await new Bus(this, this.state.repository).dispatch({
			type: typeorm.Actions.FIND_ONE,
			payload: <FindManyOptions<AccountRepo>>{
				where: { id: userId },
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
			secure: true,
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
		const token = await jwtService.putPayload(user, res as any)
		res.json({ token })
	}
}

export default AuthRoute