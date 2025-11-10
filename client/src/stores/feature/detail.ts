import commentApi from "@/api/comment"
import featureApi from "@/api/feature"
import fundingApi from "@/api/funding"
import { Comment } from "@/types/Comment"
import { Feature } from "@/types/feature/Feature"
import { Funding } from "@/types/Funding"
import { createStore, StoreCore } from "@priolo/jon"



const setup = {

	state: {

		/** FEATURE in show/edit */
		feature: <Feature>null,
		
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

		async save(_: void, store?: FeatureDetailStore) {
			const feature = store.state.feature
			let updatedFeature: Feature
			if (!!feature.id) {
				updatedFeature = await featureApi.update(feature)
			} else {
				updatedFeature = await featureApi.create(feature)
			} 
			store.setFeature(updatedFeature)
		},

		
		async addComment(comment: Comment, store?: FeatureDetailStore) {
			comment.entityType = 'feature'
			comment.entityId = featureDetailSo.state.feature.id
			const newComment = (await commentApi.save(comment))?.comment
			if (!newComment) return
			store.setFeature({
				...featureDetailSo.state.feature,
				comments: featureDetailSo.state.feature.comments?.concat(newComment) ?? [newComment]
			})
		}

	},

	mutators: {
		setFeature: (feature: Partial<Feature>) => ({ feature }),
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