import authApi from "@/api/auth"
import commentApi from "@/api/comment"
import featureApi from "@/api/feature"
import fundingApi from "@/api/funding"
import gitHubApi from "@/api/github"
import { Account } from "@/types/Account"
import { Comment } from "@/types/Comment"
import { Feature } from "@/types/feature/Feature"
import { Funding } from "@/types/Funding"
import { GitHubRepository, GitHubRepositoryDetails } from "@/types/github/GitHub"
import { createStore, StoreCore } from "@priolo/jon"



const setup = {

	state: {

		/** FEATURE in show/edit */
		feature: <Partial<Feature>>null,
		/** dettaglio GITHUB della FEATURE */
		githubRepo: <GitHubRepository>null,
		/** GITHUB owner */
		githubOwner: <Account>null,

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
		 * Carica a seleziona una REPO GITHUB 
		 * in base all'ID settato nella FEATURE
		 */
		async fetchGithubRepo(_: void, store?: FeatureDetailStore) {
			const repo = await gitHubApi.getRepository(store.state.feature.githubRepoId)
			store.setGithubRepo(repo)
		},

		/**
		 * Carica l'ACCOUNT GITHUB proprietario della REPO 
		 * caricata e selezionata
		 */
		async fetchGithubOwner(_: void, store?: FeatureDetailStore) {
			try {
				const { account } = await authApi.githubGetAccount(store.state.githubRepo.owner.id)
				store.setGithubOwner(account)
			} catch (error) {
				store.setGithubOwner(null)
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
		setGithubRepo: (githubRepo: GitHubRepositoryDetails | null) => ({ githubRepo }),
		setGithubOwner: (githubOwner: Account) => ({ githubOwner }),
		//setAuthorUser: (authorUser: Account) => ({ authorUser }),
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