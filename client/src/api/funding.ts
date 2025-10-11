import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Funding } from "@/types/Funding"



function index(filter: any, opt?: CallOptions): Promise<{ fundings: Funding[] }> {
	return null
	//return ajax.post(`fundings/new`, { funding }, opt)
}

function create(funding: Funding, opt?: CallOptions): Promise<{ funding: Funding }> {
	return ajax.post(`fundings`, { funding }, opt)
}



const fundingApi = {
	index,
	create,
}
export default fundingApi