import accountApi from "@/api/account"
import featureApi from "@/api/feature"
import fundingApi from "@/api/funding"
import gitHubApi from "@/api/github"
import { Account } from "@/types/Account"
import { Feature } from "@/types/Feature"
import { Funding } from "@/types/Funding"
import { GitHubRepositoryDetails } from "@/types/GitHub"
import { createStore, StoreCore } from "@priolo/jon"
import { loadStripe } from "@stripe/stripe-js"



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe('pk_test_51S9Cab3oUVTivUNZHbQYRGlbEErimwbDooNuVnwNewJQcSCjVU923z7Y40zJZVPwEw9xaav03rBwtQkNKnRlE3km00KRH91N8Q');

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
		clientSecret: <string>null,
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
			const res = await fundingApi.createIntent(
				store.state.funding.amount,
				"contributor@gmail.com",
				store.state.githubRepo.full_name,
				store.state.githubRepo.owner.login
			)
			if (!res) return // error
			console.log(res.client_secret)
			store.setClientSecret( res.client_secret)

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
		setClientSecret: (clientSecret: string) => ({ clientSecret })
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