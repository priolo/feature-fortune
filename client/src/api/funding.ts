import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Feature } from "@/types/Feature"
import { PaymentMethod } from "@stripe/stripe-js"



/** 
 * Creo INTENT per salvare i dati della CARD e restituire il client_secret
 */
function createPaymentMethod(opt?: CallOptions): Promise<{ clientSecret: string, stripeCustomerId: string }> {
	return ajax.post(`fundings/create`, null, opt)
}

/**
 * Salvo il PaymentMethod (ID) associandolo all'utente loggato
 */
function savePaymentMethod(paymentMethodId: string, opt?: CallOptions): Promise<{ success: boolean }> {
	return ajax.post(
		`fundings/save`,
		{ paymentMethodId },
		opt
	)
}

function getPaymentMethod(opt?: CallOptions): Promise<{ success: boolean, paymentMethods: PaymentMethod }> {
	return ajax.post(`fundings/get`, null, opt)
}

function removePaymentMethod(opt?: CallOptions): Promise<{ success: boolean }> {
	return ajax.post(`fundings/remove`, null, opt)
}









function donate(opt?: CallOptions): Promise<{ success: boolean }> {
	return ajax.post(`fundings/donate`, null, opt)
}

function stripeAuthorRegisterLink(opt?: CallOptions): Promise<any> {
	return ajax.post(`fundings/link`, null, opt)
}


const fundingApi = {
	createPaymentMethod,
	savePaymentMethod,
	getPaymentMethod,
	removePaymentMethod,
	
	donate,
	stripeAuthorRegisterLink,
}
export default fundingApi