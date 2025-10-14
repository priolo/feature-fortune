import commentApi from "@/api/comment"
import { Comment } from "@/types/Comment"
import { createStore, StoreCore } from "@priolo/jon"



const setup = {

	state: {
		filter: <any>null,
		all: <Comment[]>null,
		selected: <Comment>null,
	},

	getters: {
	},

	actions: {

		async fetch(filter?: any, store?: CommentListStore) {
			store.state.filter = filter ?? store.state.filter
			const res = await commentApi.index(store.state.filter)
			store.setAll(res?.comments)
		},

		async saveSelected(_: void, store?: CommentListStore) {
			const { comment } = await commentApi.save(store.state.selected)
			store.setSelected(comment)
			await store.fetch()
		}

	},

	mutators: {
		setAll: (all: Comment[]) => ({ all }),
		setSelected: (selected: Comment) => ({ selected })
	},
}

export type CommentListState = typeof setup.state
export type CommentListGetters = typeof setup.getters
export type CommentListActions = typeof setup.actions
export type CommentListMutators = typeof setup.mutators
export interface CommentListStore extends StoreCore<CommentListState>, CommentListGetters, CommentListActions, CommentListMutators {
	state: CommentListState
}

const commentListSo = createStore<CommentListState>(setup)
export default commentListSo as CommentListStore

