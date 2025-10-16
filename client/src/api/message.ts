import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Message } from "@/types/Message"



function index(filter: any, opt?: CallOptions): Promise<{ messages: Message[] }> {
	const query = new URLSearchParams(filter).toString()
	return ajax.get(`messages?${query}`, opt)
}

function save(message: Message, opt?: CallOptions): Promise<{ message: Message }> {
	return ajax.post(`messages`, { message }, opt)
}


const messageApi = {
	index,
	save,
}
export default messageApi
