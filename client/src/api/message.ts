import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Message } from "@/types/Message"



function index(_:void, opt?: CallOptions): Promise<{ messages: Message[] }> {
	return ajax.get(`messages`, opt)
}

function save(message: Message, opt?: CallOptions): Promise<{ message: Message }> {
	return ajax.post(`messages`, { message }, opt)
}


const messageApi = {
	index,
	save,
}
export default messageApi
