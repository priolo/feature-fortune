import { AccountRepo, EMAIL_CODE } from "@/repository/Account.js";
import { ENV_TYPE } from "@/types/env.js";
import { Bus, email as emailNs, ServiceBase, typeorm } from "@priolo/julian";
import crypto from "crypto";
import { FindManyOptions } from "typeorm";



export async function accountEmailSendCode(node: ServiceBase, email: string, logged?: AccountRepo): Promise<boolean> {

	// creo il codice segreto da inviare per email
	const code = process.env.NODE_ENV == ENV_TYPE.TEST ? "AAA" : crypto.randomBytes(8).toString('hex')

	// verifico che non esista gia' un utente con questa email
	const user = await new Bus(node, node.state.repository).dispatch({
		type: typeorm.Actions.FIND_ONE,
		payload: <FindManyOptions<AccountRepo>>{
			where: [
				{ email: email, emailCode: EMAIL_CODE.VERIFIED },
				{ googleEmail: email }
			]
		}
	})
	// if exist and is already registered 
	if (!user) return false

	// altrimenti creo un utente temporaneo con il codice da attivare
	await new Bus(node, node.state.repository).dispatch({
		type: typeorm.Actions.SAVE,
		payload: <AccountRepo>{
			email,
			emailCode: code,
		}
	})

	// invio l'email per l'attivazione del codice
	await new Bus(node, node.state.email).dispatch({
		type: emailNs.Actions.SEND,
		payload: {
			from: "from@test.com",
			to: "to@test.com",
			subject: "Richiesta registraziuone",
			html: `
					<div>ue ueue ti vuoi reggggistrare! he?</div> 
					<div>questo è il codice</div> 
					<div>${code}</div> 
				`,
		}
	})

	return true
}

export async function accountEmailVerify(code: string, email: string, logged?: AccountRepo): Promise<boolean> {


}