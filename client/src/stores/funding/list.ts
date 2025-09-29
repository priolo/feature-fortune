import featureApi from "@/api/feature"
import fundingApi from "@/api/funding"
import { Feature } from "@/types/feature/Feature"
import { Funding } from "@/types/Funding"
import { createStore, StoreCore } from "@priolo/jon"




const setup = {

	state: {
		all: <Funding[]>null,
		selected: <Funding>null,
	},

	getters: {
	},

	actions: {

		async fetch(_: void, store?: FundingListStore) {
			const fundings = await fundingApi.index()
			store.setAll(fundings)
		},

		async create(_: void, store?: FundingListStore) {
			
		}

	},

	mutators: {
		setAll: (all: Feature[]) => ({ all }),
	},
}

export type FundingListState = typeof setup.state
export type FundingListGetters = typeof setup.getters
export type FundingListActions = typeof setup.actions
export type FundingListMutators = typeof setup.mutators
export interface FundingListStore extends StoreCore<FundingListState>, FundingListGetters, FundingListActions, FundingListMutators {
	state: FundingListState
}

const fundingListSo = createStore<FundingListState>(setup)
export default fundingListSo as FundingListStore

