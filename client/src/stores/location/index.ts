import { createStore, StoreCore } from "@priolo/jon"




const setup = {

	state: {
		current: <LOCATION_PAGE>null,
	},

	getters: {
	},

	actions: {
	},

	mutators: {
		setCurrent: (current: LOCATION_PAGE) => ({ current }),
	},

}

export type LocationState = typeof setup.state
export type LocationGetters = typeof setup.getters
export type LocationActions = typeof setup.actions
export type LocationMutators = typeof setup.mutators
export interface LocationStore extends StoreCore<LocationState>, LocationGetters, LocationActions, LocationMutators {
	state: LocationState
}
const locationSo = createStore<LocationState>(setup)
export default locationSo as LocationStore

export enum LOCATION_PAGE {
	FeaturesList = "feature-list",
	FeatureDetail = "feature-detail",

	Login = "auth-login",
	Account = "auth-account",
	Messages = "messages",
}