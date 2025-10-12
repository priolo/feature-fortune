import { Feature } from "./Feature";



export function buildNewFeature(): Feature {
	return {
		id: null,
		title: '',
		description: '',
		fundings: [],
		comments: [],
	}
}