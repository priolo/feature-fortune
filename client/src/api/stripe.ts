import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Funding } from "@/types/Funding"



function pay(fundingId: string, opt?: CallOptions): Promise<{ funding: Funding }> {
	return ajax.post(`stripe/pay`, { fundingId }, opt)
}

function registerLink(opt?: CallOptions): Promise<any> {
	return ajax.post(`stripe/register_link`, null, opt)
}

function unregister(opt?: CallOptions): Promise<any> {
	return ajax.post(`stripe/unregister`, null, opt)
}


const stripeApi = {
	pay,
	registerLink,
	unregister,
}
export default stripeApi