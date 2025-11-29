import { Funding, FUNDING_STATUS } from "@/types/Funding";


/**
 * Calculate the total amount funded for a feature, grouped by currency
 */

export function amountFunded(fundings: Funding[]): [string, number][] {
	if (!fundings) return []
	const valuesDic = fundings.reduce((acc, funding) => {
		if (funding.status == FUNDING_STATUS.CANCELLED || funding.status == FUNDING_STATUS.ERROR) return acc
		const key = funding.currency
		acc[key] = (acc[key] ?? 0) + (funding.amount ?? 0)
		return acc
	}, {} as Record<string, number>)

	return Object.entries(valuesDic)
}
