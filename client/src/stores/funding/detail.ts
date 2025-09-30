import featureApi from "@/api/feature"
import gitHubApi from "@/api/github"
import { Account } from "@/types/Account"
import { Feature } from "@/types/feature/Feature"
import { Funding } from "@/types/Funding"
import { GitHubRepository, GitHubRepositoryDetails } from "@/types/github/GitHub"
import { createStore, StoreCore } from "@priolo/jon"
import { FORM_MODE } from "../types"
import fundingApi from "@/api/funding"



const setup = {

	state: {
		mode: <FORM_MODE>FORM_MODE.VIEW,

		feature: <Partial<Feature>>null,
		/** dettaglio GITHUB della FEATURE */
		githubRepo: <GitHubRepository>null,

		fundingSelected: <Funding>null,
	},

	getters: {
	},

	actions: {

		fetch: async (_: void, store?: FeatureDetailStore) => {
			const feature = await featureApi.get(store.state.feature.id)
			store.setFeature(feature)
		},

		// async fetchIfVoid(_: void, store?: FeatureDetailStore) {
		// 	if (!!store.state.feature) return
		// 	await store.fetch()
		// },

		async fetchGithubRepo(_: void, store?: FeatureDetailStore) {
			const repo = await gitHubApi.getRepository(store.state.feature.githubId ?? store.state.feature.githubName)
			store.setGithubRepo(repo)
		},

		async saveFeature(_: void, store?: FeatureDetailStore) {
			const feature = await featureApi.save(store.state.feature as Feature)
			store.setFeature(feature)
		},
	

		async saveFunding(_: void, store?: FeatureDetailStore) {
			const fundingNew = await fundingApi.create(store.state.fundingSelected)
			

			// const stripe = await stripePromise;
			// if (!stripe) return // error

			// const { error } = await stripe.confirmPayment({
			// 	clientSecret: store.state.clientSecret,
			// 	confirmOptions: {
			// 		return_url: 'http://localhost:3000', // URL di reindirizzamento dopo il pagamento
			// 	},
			// });

			// if (error) {
			// 	alert(error.message);
			// } else {
			// 	alert('Pagamento completato!');
			// }
		}

	},

	mutators: {
		setMode: (mode: FORM_MODE) => ({ mode }),
		setFeature: (feature: Partial<Feature>) => ({ feature }),
		setFunding: (funding: Funding) => ({ funding }),
		setGithubRepo: (githubRepo: GitHubRepositoryDetails | null) => ({ githubRepo }),
		setAuthorUser: (authorUser: Account) => ({ authorUser }),
		setFundingSelected: (fundingSelected: Funding) => ({ fundingSelected })
	},

}

export type FeatureDetailState = typeof setup.state
export type FeatureDetailGetters = typeof setup.getters
export type FeatureDetailActions = typeof setup.actions
export type FeatureDetailMutators = typeof setup.mutators
export interface FeatureDetailStore extends StoreCore<FeatureDetailState>, FeatureDetailGetters, FeatureDetailActions, FeatureDetailMutators {
	state: FeatureDetailState
}
const featureDetailSo = createStore<FeatureDetailState>(setup)
export default featureDetailSo as FeatureDetailStore