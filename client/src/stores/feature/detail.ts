import commentApi from "@/api/comment"
import featureApi from "@/api/feature"
import fundingApi from "@/api/funding"
import { Comment } from "@/types/Comment"
import { Feature, FEATURE_ACTIONS, FEATURE_STATUS } from "@/types/feature/Feature"
import { Funding } from "@/types/Funding"
import { createStore, StoreCore } from "@priolo/jon"



const setup = {

	state: {

		/** FEATURE in show/edit */
		feature: <Feature>null,
		/** last FEATURE loaded */
		featureLoaded: <Feature>null,

	},

	getters: {
	},

	actions: {

		/**
		 * Carico per intero una FEATURE
		 */
		fetch: async (_: void, store?: FeatureDetailStore) => {
			const feature = await featureApi.get(store.state.feature.id)
			store.state.featureLoaded = { ...feature }
			store.setFeature(feature)
		},



		updateSelected(featurePartial: Partial<Feature>, store?: FeatureDetailStore) {
			store.state.featureLoaded = { ...store.state.featureLoaded, ...featurePartial, }
			store.setFeature({ ...store.state.feature, ...featurePartial, })
		},


		/**
		 * L'AUTHOR crea o aggiorna la FEATURE
		 */
		async save(_: void, store?: FeatureDetailStore) {
			const feature = store.state.feature
			let updatedFeature: Feature
			if (!!feature.id) {
				updatedFeature = (await featureApi.update(feature))?.feature
			} else {
				updatedFeature = (await featureApi.create(feature))?.feature
			}
			store.state.featureLoaded = { ...updatedFeature }
			store.setFeature(updatedFeature)
		},

		/**
		 * L'AUTHOR cancella la FEATURE
		 */
		async remove(_: void, store?: FeatureDetailStore) {
			const feature = store.state.feature
			await featureApi.remove(feature.id)
		},

		async action(action: FEATURE_ACTIONS, store?: FeatureDetailStore) {
			const feature = store.state.feature
			const updatedFeature: Partial<Feature> = (await featureApi.action(feature.id, action))?.feature
			store.updateSelected(updatedFeature)
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