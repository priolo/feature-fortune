import { Feature, FEATURE_STATUS } from "./Feature";



export function buildNewFeature(): Feature {
	return {
		title: '',
		description: '',
		status: FEATURE_STATUS.PROPOSED,

		fundings: [],
		comments: [],
	}
}