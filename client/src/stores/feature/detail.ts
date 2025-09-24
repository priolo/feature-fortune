import accountApi from "@/api/account"
import featureApi from "@/api/feature"
import fundingApi from "@/api/funding"
import gitHubApi from "@/api/github"
import { Account } from "@/types/Account"
import { Feature } from "@/types/Feature"
import { Funding } from "@/types/Funding"
import { GitHubRepositoryDetails } from "@/types/GitHub"
import { createStore, StoreCore } from "@priolo/jon"




// const fetchClientSecret = () => {
// 	return fetch('/create-checkout-session', { method: 'POST' })
// 		.then((response) => response.json())
// 		.then((json) => json.checkoutSessionClientSecret)
// };

const setup = {

	state: {
		feature: <Partial<Feature>>null,
		githubRepo: null as GitHubRepositoryDetails | null,
		authorUser: <Account>null,
		funding: <Funding>null,
	},

	getters: {
	},

	actions: {

		fetch: async (_: void, store?: FeatureDetailStore) => {
			const feature = await featureApi.get(store.state.feature.id)
			store.setFeature(feature)
		},

		async fetchIfVoid(_: void, store?: FeatureDetailStore) {
			if (!!store.state.feature) return
			await store.fetch()
		},

		async fetchGithubRepo(_: void, store?: FeatureDetailStore) {
			const githubQuery = store.state.feature?.github;
			try {
				// Check if it's a URL format
				const parsedUrl = gitHubApi.parseGitHubUrl(githubQuery);
				// Direct repository lookup
				const repoDetails: GitHubRepositoryDetails = !!parsedUrl
					? await gitHubApi.getRepositoryWithOwnerDetails(parsedUrl.owner, parsedUrl.repo)
					: await gitHubApi.searchAndGetFirstRepositoryWithDetails(githubQuery)
				if (!repoDetails) return // error
				store.setFeature({ ...store.state.feature, github: repoDetails.html_url });
				store.setGithubRepo(repoDetails);
			} catch (error) {
				//  error
			}
		},

		async fetchGithubUser(_: void, store?: FeatureDetailStore) {
			if (!store.state.githubRepo) return
			const user = await accountApi.getByGithub(store.state.githubRepo.id)
			if (!user) return // error
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