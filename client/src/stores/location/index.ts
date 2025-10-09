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
	Home = "Home",
	FeatureDetail = "Feature Detail",
	Login = "Login",
	Register = "Register",
	Account = "Account",
	NotFound = "Not Found"
}