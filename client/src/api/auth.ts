import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Account } from "@/types/Account"


/**
 * Cerco di recuperare l'attuale ACCOUNT loggato tramite JWT
 * Se non sono loggato ritorna null
 */
function current(opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.get(`auth/current`, { ...opt, isLogin: true })
}

/**
 * Effettual il logout dell'utente 
 */
function logout(opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.post(`auth/logout`, null, opt)
}
/**
 * Verifico un EMAIL
 */
function emailSendCode(email: string, opt?: CallOptions): Promise<any> {
	return ajax.post(`auth/email_code`, { email }, opt)
}
/**
 * Verifico un EMAIL
 */
function emailVerify(code: string, opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.post(`auth/email_verify`, { code }, opt)
}


/**
 * Non sono loggato quindi effettuo il login 
 * oppure la registrazione se non esiste l'ACCOUNT
 */
function githubLoginUrl(opt?: CallOptions): Promise<any> {
	return ajax.get(`auth/github/login`, opt)
}

/**
 * Sono loggato e voglio collegare il mio ACCOUNT-GITHUB
 */
function githubAttachUrl(opt?: CallOptions): Promise<any> {
	return ajax.get(`accounts/github/link`, opt)
}

/**
 * Elimina la connessione dell'ACCOUNT con ACCOUNT-GITHUB
 */
function githubDetach(opt?: CallOptions): Promise<any> {
	return ajax.delete(`accounts/github`, opt)
}

/**
 * prelevo l'ACCOUNT collegato ad un ACCOUNT-GITHUB
 */
function githubGetAccount(accountId: number, opt?: CallOptions): Promise<{ account: Account }> {
	return ajax.get(`accounts/github/${accountId}`, opt)
}





function loginGoogle(token: string, opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.post(`auth/google/login`, { token }, { ...opt, isLogin: true })
}
/** 
 * aggancio un account GOOGLE all'ACCOUNT attualmente loggato 
 */
function googleAttach(token: string, opt?: CallOptions): Promise<any> {
	return ajax.post(`accounts/google`, { token }, opt)
}






const authApi = {
	current,
	logout,

	emailSendCode,
	emailVerify,

	githubGetAccount,
	githubLoginUrl,
	githubAttachUrl,
	githubDetach,

	loginGoogle,
	googleAttach,
}

export default authApi