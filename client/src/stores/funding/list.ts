import fundingApi from "@/api/funding"
import { Funding, FUNDING_STATUS } from "@/types/Funding"
import { createStore, StoreCore } from "@priolo/jon"




const setup = {

	state: {
		filter: <any>null,
		all: <Funding[]>null,
		selected: <Funding>null,
	},

	getters: {
		getById: (id: string, store?: FundingListStore): Funding => {
			return store.state.all?.find(f => f.id === id) ?? null
		}
	},

	actions: {

		async fetch(filter?: any, store?: FundingListStore) {
			store.state.filter = filter ?? store.state.filter
			const res = await fundingApi.index(store.state.filter)
			store.setAll(res?.fundings)
		},

		async saveSelected(_: void, store?: FundingListStore) {
			const { funding } = await fundingApi.save(store.state.selected)
			store.setSelected(funding)
			await store.fetch()
		},

		async remove(id: string, store?: FundingListStore): Promise<boolean> {
			const res = await fundingApi.remove(id)
			if (!res.success) return false
			const funding = store.getById(id)
			if (!funding) return true
			funding.status = FUNDING_STATUS.CANCELLED
			store._update()
			return true
		}

	},

	mutators: {
		setAll: (all: Funding[]) => ({ all }),
		setSelected: (selected: Funding) => ({ selected })
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

