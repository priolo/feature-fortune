import { createStore, StoreCore } from "@priolo/jon"




const setup = {

	state: {
	},

	getters: {
	},

	actions: {


	},

	mutators: {
	},

}

export type LayoutHeaderState = typeof setup.state
export type LayoutHeaderGetters = typeof setup.getters
export type LayoutHeaderActions = typeof setup.actions
export type LayoutHeaderMutators = typeof setup.mutators
export interface LayoutHeaderStore extends StoreCore<LayoutHeaderState>, LayoutHeaderGetters, LayoutHeaderActions, LayoutHeaderMutators {
	state: LayoutHeaderState
}
const layoutHeaderSo = createStore<LayoutHeaderState>(setup)
export default layoutHeaderSo as LayoutHeaderStore