import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Comment } from "@/types/Comment"



function create(comment: Comment, opt?: CallOptions): Promise<{ comment: Comment }> {
	return ajax.post(`comments`, { comment }, opt)
}




const commentApi = {
	create,
}
export default commentApi