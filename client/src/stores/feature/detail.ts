import featureApi from "@/api/feature"
import gitHubApi from "@/api/github"
import { Account } from "@/types/Account"
import { Feature } from "@/types/feature/Feature"
import { Funding } from "@/types/Funding"
import { GitHubRepository, GitHubRepositoryDetails } from "@/types/github/GitHub"
import { createStore, StoreCore } from "@priolo/jon"
import { FORM_MODE } from "../types"



const setup = {

	state: {
		mode: <FORM_MODE>FORM_MODE.VIEW,

		feature: <Partial<Feature>>null,
		/** dettaglio GITHUB della FEATURE */
		githubRepo: <GitHubRepository>null,
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
			const repo = await gitHubApi.getRepositoryByName(store.state.feature.githubName)
			store.setGithubRepo(repo)
		},

	

		async createFunding(_: void, store?: FeatureDetailStore) {
			

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
		setFeature: (feature: Partial<Feature>) => ({ feature }),
		setFunding: (funding: Funding) => ({ funding }),
		setGithubRepo: (githubRepo: GitHubRepositoryDetails | null) => ({ githubRepo }),
		setAuthorUser: (authorUser: Account) => ({ authorUser }),
		
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