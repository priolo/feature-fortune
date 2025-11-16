import messageApi from "@/api/message"
import { Message, MESSAGE_ROLE, MessageContent } from "@/types/Message"
import { createStore, StoreCore } from "@priolo/jon"
import authSo from "../auth/repo"



const setup = {

	state: {
		all: <Message[]>null,
		selected: <Message>null,
		receiverId: <string>null,
	},

	getters: {
	},

	actions: {

		async fetch(_: void, store?: MessageListStore) {
			const messages = (await messageApi.index(MESSAGE_ROLE.RECEIVER))?.messages
			store.setAll(messages)
		},

		async createAndSelect(_: void, store?: MessageListStore) {
			const content: MessageContent = {
				text: "",
			}
			const message: Message = {
				content: content,
				accountId: null,
				role: MESSAGE_ROLE.SENDER,
				isRead: true,
				isArchived: false,
			}
			store.setSelected(message)
			store.setReceiverId(null)
		},

		async sendSelected(_: void, store?: MessageListStore) {
			const message = store.state.selected
			if (!message) throw new Error("No message selected")
			const { content, msgReceiver, msgSender } = await messageApi.save(
				message.content.text,
				message.accountId,
			)
			store.setSelected(null)
			//msgSender.content = content
			//store.setAll([...store.state.all, message])
		},

		/**
		 * rimuove un MESSAGGIO tramite il suo id e aggiorna la lista
		 */
		async remove(messageId: string, store?: MessageListStore) {
			const res = (await messageApi.remove(messageId))?.success
			if (!res) throw new Error("Error deleting message")
			store.setSelected(null)
			store.setAll(store.state.all.filter(m => m.id !== messageId))
		},

	},

	mutators: {
		setAll: (all: Message[]) => ({ all }),
		setSelected: (selected: Message) => ({ selected }),
		setReceiverId: (receiverId: string) => ({ receiverId })
	},
}

export type MessageListState = typeof setup.state
export type MessageListGetters = typeof setup.getters
export type MessageListActions = typeof setup.actions
export type MessageListMutators = typeof setup.mutators
export interface MessageListStore extends StoreCore<MessageListState>, MessageListGetters, MessageListActions, MessageListMutators {
	state: MessageListState
}

const messageListSo = createStore<MessageListState>(setup)
export default messageListSo as MessageListStore
