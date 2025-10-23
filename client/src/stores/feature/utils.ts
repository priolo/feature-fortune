import { FEATURE_FILTER, FEATURE_SORT } from "./types"
import { Feature } from "@/types/feature/Feature"



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
		feature.title.toLowerCase().includes(lowerText) ||
		(feature.description && feature.description.toLowerCase().includes(lowerText))
	)
}

export function sortByCreatedAt(features: Feature[], descending: boolean = true): Feature[] {
	if (!features) return []
	return features.sort((a, b) => {
		const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
		const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
		return descending ? dateB - dateA : dateA - dateB
	})
}

export function sort(features: Feature[], sort: FEATURE_SORT): Feature[] {
	if (!features) return []
	if (!sort || sort == FEATURE_SORT.ALL) return features

	return features.sort((a, b) => {
		let valueA = 0
		let valueB = 0
		switch (sort) {
			case FEATURE_SORT.RECENT:
			case FEATURE_SORT.OLDEST:
				valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0
				valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0
				break
			case FEATURE_SORT.RICHEST:
			case FEATURE_SORT.POOREST:
				valueA = a.fundings ? a.fundings.reduce((sum, f) => sum + (f.amount || 0), 0) : 0
				valueB = b.fundings ? b.fundings.reduce((sum, f) => sum + (f.amount || 0), 0) : 0
				break
		}
		const descending = sort == FEATURE_SORT.RECENT || sort == FEATURE_SORT.RICHEST
		return descending ? valueB - valueA : valueA - valueB
	})
}

