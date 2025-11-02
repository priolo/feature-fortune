import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Message, MESSAGE_ROLE, MessageContent } from "@/types/Message"



function index(role: MESSAGE_ROLE = MESSAGE_ROLE.RECEIVER, opt?: CallOptions): Promise<{ messages: Message[] }> {
	return ajax.get(`messages?role=${role}`, opt)
}

function save(message: Message, opt?: CallOptions): Promise<{ content: MessageContent, msgReceiver: Message, msgSender: Message }> {
	if (!message || !message.accountId) throw new Error("Message content ID is required")
	return ajax.post(`messages`, { content: message.content, receiverId: message.accountId }, opt)
}

function remove(messageId: string, opt?: CallOptions): Promise<{ content: MessageContent, msgReceiver: Message, msgSender: Message }> {
	if (!messageId) throw new Error("Message content ID is required")
	return ajax.delete(`messages/${messageId}`, null, opt)
}



const messageApi = {
	index,
	save,
	remove,
}
export default messageApi
