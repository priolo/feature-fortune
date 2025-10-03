import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Funding } from "@/types/Funding"



function index(filter: any, opt?: CallOptions): Promise<{ fundings: Funding[] }> {
	return null
	//return ajax.post(`fundings/new`, { funding }, opt)
}

function create(funding: Funding, opt?: CallOptions): Promise<{ funding: Funding }> {
	return ajax.post(`fundings`, { funding }, opt)
}





function pay(fundingId: string, opt?: CallOptions): Promise<{ funding: Funding }> {
	return ajax.post(`fundings/pay`, { fundingId }, opt)
}

function stripeAuthorRegisterLink(opt?: CallOptions): Promise<any> {
	return ajax.post(`fundings/link`, null, opt)
}





const fundingApi = {
	pay,
	stripeAuthorRegisterLink,


	index,
	create,
}
export default fundingApi