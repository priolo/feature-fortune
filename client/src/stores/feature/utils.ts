import { FEATURE_FILTER, FEATURE_SORT } from "./types"
import { Feature, FEATURE_STATUS } from "@/types/feature/Feature"



export function filterByAccount(features: Feature[], filter: FEATURE_FILTER, userId: string): Feature[] {

	if (!features) return []
	if (!filter || !userId) return features

	switch (filter) {
		case FEATURE_FILTER.MY:
			return features.filter(feature => feature.accountId == userId)
		case FEATURE_FILTER.FINANCED:
			return features.filter(f => f.fundings?.some(funding => funding.accountId == userId))
		case FEATURE_FILTER.DEVELOPED:
			return features.filter(f => f.accountDevId == userId)
		case FEATURE_FILTER.ALL:
		default:
			return features
	}
}

export function filterByText(features: Feature[], text: string): Feature[] {
	if (!features) return []
	if (!text) return features
	const lowerText = text.toLowerCase()

	return features.filter(feature =>
		feature.title.toLowerCase().includes(lowerText) 
		||
		(feature.description && feature.description.toLowerCase().includes(lowerText))
		||
		(feature.githubRepoMetadata?.full_name && feature.githubRepoMetadata?.full_name.toLowerCase().includes(lowerText))
	)
}

export function filterByStatus(features: Feature[], status?: FEATURE_STATUS | null): Feature[] {
	if (!features) return []
	if (!status) return features.filter(feature => feature.status != FEATURE_STATUS.CANCELLED)
	return features.filter(feature => feature.status === status)
}

export function sortByCreatedAt(features: Feature[], descending: boolean = true): Feature[] {
	if (!features) return []
	return features.sort((a, b) => {
		const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
		const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
		return descending ? dateB - dateA : dateA - dateB
	})
}

export function sort(features: Feature[], sort: FEATURE_SORT = FEATURE_SORT.RECENT): Feature[] {
	if (!features) return []

	return features.sort((a, b) => {
		let valueA = 0
		let valueB = 0
		switch (sort) {
			case FEATURE_SORT.MOST_FUNDED:
			//case FEATURE_SORT.LESS_FUNDED:
				valueA = a.fundings ? a.fundings.reduce((sum, f) => sum + (f.amount || 0), 0) : 0
				valueB = b.fundings ? b.fundings.reduce((sum, f) => sum + (f.amount || 0), 0) : 0
				break
			default:
			case FEATURE_SORT.RECENT:
			case FEATURE_SORT.OLDEST:
				valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0
				valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0
				break
			// mette in ordine alfabetico sulla base del nomde del repo github sui metadata
			case FEATURE_SORT.GITHUB:
				return (a.githubRepoMetadata?.full_name ?? "").localeCompare(b.githubRepoMetadata?.full_name ?? "")
		}
		const descending = sort == FEATURE_SORT.RECENT || sort == FEATURE_SORT.MOST_FUNDED
		return descending ? valueB - valueA : valueA - valueB
	})
}


