import messageApi from "@/api/message"
import { Message, MESSAGE_ROLE, MessageContent } from "@/types/Message"
import { createStore, StoreCore } from "@priolo/jon"



const setup = {

	state: {
		all: <Message[]>null,
		selected: <Message>null,
		receiverId: <string>null,
		unreadCount: 0,
	},

	getters: {
	},

	actions: {

		async fetch(_: void, store?: MessageListStore) {
			const messages = (await messageApi.index(MESSAGE_ROLE.RECEIVER))?.messages
			store.setAll(messages)
		},

		async fetchIfVoid(_: void, store?: MessageListStore) {
			if (store.state.all === null) {
				await store.fetch()
			}
		},

		async createAndSelect(receiverId?: string, store?: MessageListStore) {
			const content: MessageContent = {
				accountId: receiverId,
				text: "",
			}
			const message: Message = {
				content: content,
				accountId: null, // non usato: è lo stesso dell'utente loggato
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
				message.content.accountId,
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

		async fetchUnreadCount(_: void, store?: MessageListStore) {
			const { count } = await messageApi.getUnreadCount({ noError: true, noBusy: false })
			store.setUnreadCount(count)
		},

	},

	mutators: {
		setAll: (all: Message[]) => {
			const unreadCount = all?.filter(m => !m.isRead).length || 0
			return { all, unreadCount }
		},
		setSelected: (selected: Message) => ({ selected }),
		setReceiverId: (receiverId: string) => ({ receiverId }),
		setUnreadCount: (unreadCount: number) => ({ unreadCount }),
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
