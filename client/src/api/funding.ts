import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Feature } from "@/types/Feature"



/** 
 * Creo INTENT per salvare i dati della CARD e restituire il client_secret
 */
//function createIntent(amount:number, contributorId:string, github:string, authorGithub:string,  opt?: CallOptions): Promise<{client_secret: string}> {
function createPaymentMethod(contributorId: string, opt?: CallOptions): Promise<{ clientSecret: string }> {
	return ajax.post(
		`fundings/create`,
		{
			//amount, 
			contributorId,
			//github, 
			//authorGithub
		},
		opt
	)
}

function donate(paymentMethodId: string, opt?: CallOptions): Promise<{ clientSecret: string }> {
	return ajax.post(
		`fundings/donate`,
		{
			paymentMethodId,
			// 	//amount, 
			// 	contributorId,
			// 	//github, 
			// 	//authorGithub
		},
		opt
	)
}

function stripeAuthorRegisterLink(email: string, opt?: CallOptions): Promise<any> {
	return ajax.post(`fundings/link`, { email }, opt)
}


const fundingApi = {
	createPaymentMethod,
	donate,
	stripeAuthorRegisterLink,
}
export default fundingApi