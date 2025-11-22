import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Message, MESSAGE_ROLE, MessageContent } from "@/types/Message"



function index(role: MESSAGE_ROLE = MESSAGE_ROLE.RECEIVER, opt?: CallOptions): Promise<{ messages: Message[] }> {
	return ajax.get(`messages?role=${role}`, opt)
}

function save(text: string, toAccountId:string, opt?: CallOptions): Promise<{ content: MessageContent, msgReceiver: Message, msgSender: Message }> {
	if (!text || !toAccountId) throw new Error("Message content ID is required")
	return ajax.post(`messages`, { text, toAccountId }, opt)
}

function remove(messageId: string, opt?: CallOptions): Promise<{ success: boolean }> {
	if (!messageId) throw new Error("Message content ID is required")
	return ajax.delete(`messages/${messageId}`, null, opt)
}

function markAsRead(messageId: string, opt?: CallOptions): Promise<{ content: MessageContent, msgReceiver: Message, msgSender: Message }> {
	if (!messageId) throw new Error("Message content ID is required")
	return ajax.patch(`messages/${messageId}/read`, null, opt)
}

function getUnreadCount(opt?: CallOptions): Promise<{ count: number }> {
	return ajax.get(`messages/unread-count`, opt)
}



const messageApi = {
	index,
	save,
	remove,
	markAsRead,
	getUnreadCount,
}
export default messageApi
