import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Account } from "@/types/Account"



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






function current(opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.get(`auth/current`, { ...opt, isLogin: true })
}

function loginGoogle(token: string, opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.post(`auth/google`, { token }, { ...opt, isLogin: true })
}
function googleAttach(token: string, opt?: CallOptions): Promise<any> {
	return ajax.post(`accounts/google`, { token }, opt)
}


function logout(opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.post(`auth/logout`, null, opt)
}





const authApi = {

	githubGetAccount,
	githubLoginUrl,
	githubAttachUrl,
	githubDetach,

	current,
	loginGoogle,
	googleAttach,
	logout,
}

export default authApi