import { Feature } from "./Feature";



export function buildNewFeature(): Feature {
	return {
		id: null,
		title: '',
		description: '',
		createdAt: new Date(),
		fundings: [],
		comments: [],
	}
}