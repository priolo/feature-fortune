import ajax, { CallOptions } from "@/plugins/AjaxService"
import { PaymentMethod } from "@stripe/stripe-js"



/** 
 * Creo il paymentMethod e restituisco il clientSecret per abbinare i dati della CARD
 */
function create(opt?: CallOptions): Promise<{ clientSecret: string, stripeCustomerId: string }> {
	return ajax.post(`payments`, null, opt)
}

/**
 * Salvo il PaymentMethod (ID) associandolo alla CARD
 */
function saveCard(paymentMethodId: string, opt?: CallOptions): Promise<{ success: boolean }> {
	return ajax.post(
		`payments/card`,
		{ paymentMethodId },
		opt
	)
}

function remove(opt?: CallOptions): Promise<{ success: boolean }> {
	return ajax.delete(`payments`, null, opt)
}

function get(opt?: CallOptions): Promise<{ success: boolean, paymentMethods: PaymentMethod }> {
	return ajax.get(`payments`, opt)
}

const paymentApi = {
	create,
	saveCard,
	remove,
	get,
}

export default paymentApi