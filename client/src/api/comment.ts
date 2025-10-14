import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Comment } from "@/types/Comment"



function index(filter: any, opt?: CallOptions): Promise<{ comments: Comment[] }> {
	const query = new URLSearchParams(filter).toString()
	return ajax.get(`comments?${query}`, opt)
}

function save(comment: Comment, opt?: CallOptions): Promise<{ comment: Comment }> {
	return ajax.post(`comments`, { comment }, opt)
}


const commentApi = {
	index,
	save,
}
export default commentApi