import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Feature } from "@/types/Feature"



/** INDEX */
function createIntent(amount:number, contributorEmail:string, github:string, authorGithub:string,  opt?: CallOptions): Promise<{client_secret: string}> {
	return ajax.post(`fundings/create`, {amount, contributorEmail, github, authorGithub}, opt)
}



const fundingApi = {
	createIntent,
}
export default fundingApi