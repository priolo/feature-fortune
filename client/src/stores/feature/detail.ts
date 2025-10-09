import authApi from "@/api/auth"
import commentApi from "@/api/comment"
import featureApi from "@/api/feature"
import fundingApi from "@/api/funding"
import gitHubApi from "@/api/github"
import { Account } from "@/types/Account"
import { Comment } from "@/types/Comment"
import { Feature } from "@/types/feature/Feature"
import { Funding } from "@/types/Funding"
import { GitHubRepository, GitHubRepositoryDetails, GitHubUser } from "@/types/github/GitHub"
import { createStore, StoreCore } from "@priolo/jon"



const setup = {

	state: {

		/** FEATURE in show/edit */
		feature: <Partial<Feature>>null,
		/** dettaglio GITHUB della FEATURE */
		githubRepo: <GitHubRepository>null,
		/** GITHUB owner */
		githubOwner: <GitHubUser>null,

		owner: <Account>null,

		// [II] move in another STORE fundingSo
		fundingSelected: <Funding>null,
	},

	getters: {
	},

	actions: {

		/**
		 * Carico per intero una FEATURE
		 */
		fetch: async (_: void, store?: FeatureDetailStore) => {
			const feature = await featureApi.get(store.state.feature.id)
			store.setFeature(feature)
		},

		/**
		 * Carica l'ACCOUNT GITHUB proprietario della REPO 
		 * caricata e selezionata
		 */
		async fetchOwner(_: void, store?: FeatureDetailStore) {
			if ( !store.state.githubOwner?.id ) {
				store.setOwner(null)
				return
			}
			try {
				const { account } = await authApi.githubGetAccount(store.state.githubOwner.id)
				store.setOwner(account)
			} catch (error) {
				store.setOwner(null)
			}
		},



		async saveFeature(_: void, store?: FeatureDetailStore) {
			const feature = await featureApi.save(store.state.feature as Feature)
			store.setFeature(feature)
		},

		async saveFunding(_: void, store?: FeatureDetailStore) {
			const { funding } = await fundingApi.create(store.state.fundingSelected)
			store.setFeature({
				...store.state.feature,
				fundings: store.state.feature.fundings?.concat(funding) ?? [funding]
			})
		},

		async addComment(comment: Comment, store?: FeatureDetailStore) {
			comment.entityType = 'feature'
			comment.entityId = featureDetailSo.state.feature.id
			const newComment = (await commentApi.create(comment))?.comment
			if (!newComment) return
			store.setFeature({
				...featureDetailSo.state.feature,
				comments: featureDetailSo.state.feature.comments?.concat(newComment) ?? [newComment]
			})
		}

	},

	mutators: {
		setFeature: (feature: Partial<Feature>) => ({ feature }),
		//setFunding: (funding: Funding) => ({ funding }),
		setGithubRepo: (githubRepo: GitHubRepositoryDetails, store?: FeatureDetailStore) => {
			return { githubRepo }
		},
		setGithubOwner: (githubOwner: GitHubUser) => ({ githubOwner }),
		setOwner: (owner: Account) => ({ owner }),
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