import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Funding } from "@/types/Funding"



function index(filter: any, opt?: CallOptions): Promise<{ fundings: Funding[] }> {
	const query = new URLSearchParams(filter).toString()
	return ajax.get(`fundings?${query}`, opt)
}

function save(funding: Funding, opt?: CallOptions): Promise<{ funding: Funding }> {
	return ajax.post(`fundings`, { funding }, opt)
}

/** DELETE */
function remove(id: string, opt?: CallOptions): Promise<{ success: boolean }> {
	return ajax.delete(`fundings/${id}`, null, opt)
}


const fundingApi = {
	index,
	save,
	remove
}
export default fundingApi