import { createStore, StoreCore } from "@priolo/jon"



const setup = {

	state: {
		email: "iorioivano@gmail.com",
	},

	getters: {
	},

	actions: {
	},

	mutators: {
		setEmail: (email: string) => ({ email }),
	},

}

export type AuthorRegisterState = typeof setup.state
export type AuthorRegisterGetters = typeof setup.getters
export type AuthorRegisterActions = typeof setup.actions
export type AuthorRegisterMutators = typeof setup.mutators
export interface AuthorRegisterStore extends StoreCore<AuthorRegisterState>, AuthorRegisterGetters, AuthorRegisterActions, AuthorRegisterMutators {
	state: AuthorRegisterState
}
const authorRegisterSo = createStore<AuthorRegisterState>(setup)
export default authorRegisterSo as AuthorRegisterStore