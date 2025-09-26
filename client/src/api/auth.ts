import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Account } from "@/types/Account"




function githubLoginUrl(opt?: CallOptions): Promise<any> {
	return ajax.get(`auth/github/login`, opt)
}
function githubAttachUrl(opt?: CallOptions): Promise<any> {
	return ajax.get(`accounts/github`, opt)
}
function githubDetach(opt?: CallOptions): Promise<any> {
	return ajax.delete(`accounts/github`, opt)
}







function current(opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.get(`auth/current`, { ...opt, isLogin: true })
}

function loginGoogle(token: string, opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.post(`auth/google`, { token }, { ...opt, isLogin: true })
}


function logout(opt?: CallOptions): Promise<{ user: Account }> {
	return ajax.post(`auth/logout`, null, opt)
}





const authApi = {

	githubLoginUrl,
	githubAttachUrl,
	githubDetach,

	current,
	loginGoogle,
	logout,
}

export default authApi