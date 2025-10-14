import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Funding } from "@/types/Funding"



function index(filter: any, opt?: CallOptions): Promise<{ fundings: Funding[] }> {
	const query = new URLSearchParams(filter).toString()
	return ajax.get(`fundings?${query}`, opt)
}

function save(funding: Funding, opt?: CallOptions): Promise<{ funding: Funding }> {
	return ajax.post(`fundings`, { funding }, opt)
}



const fundingApi = {
	index,
	save,
}
export default fundingApi