import messageApi from "@/api/message"
import { Message } from "@/types/Message"
import { createStore, StoreCore } from "@priolo/jon"



const setup = {

	state: {
		filter: <any>null,
		all: <Message[]>null,
		selected: <Message>null,
	},

	getters: {
	},

	actions: {

		async fetch(filter?: any, store?: MessageListStore) {
			store.state.filter = filter ?? store.state.filter
			const res = await messageApi.index(store.state.filter)
			store.setAll(res?.messages)
		},

		async saveSelected(_: void, store?: MessageListStore) {
			const { message } = await messageApi.save(store.state.selected)
			store.setSelected(message)
			await store.fetch()
		}

	},

	mutators: {
		setAll: (all: Message[]) => ({ all }),
		setSelected: (selected: Message) => ({ selected })
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
