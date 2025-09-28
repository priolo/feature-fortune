import featureApi from "@/api/feature"
import { Feature } from "@/types/feature/Feature"
import { createStore, StoreCore } from "@priolo/jon"




const setup = {

	state: {
		all: <Feature[]>null,
	},

	getters: {
	},

	actions: {

		async fetch(_: void, store?: FeatureListStore) {
			const features = await featureApi.index()
			store.setAll(features)
		},

		async create(_: void, store?: FeatureListStore) {
			
		}

	},

	mutators: {
		setAll: (all: Feature[]) => ({ all }),
	},
}

export type FeatureListState = typeof setup.state
export type FeatureListGetters = typeof setup.getters
export type FeatureListActions = typeof setup.actions
export type FeatureListMutators = typeof setup.mutators
export interface FeatureListStore extends StoreCore<FeatureListState>, FeatureListGetters, FeatureListActions, FeatureListMutators {
	state: FeatureListState
}

const featureListSo = createStore<FeatureListState>(setup)
export default featureListSo as FeatureListStore

