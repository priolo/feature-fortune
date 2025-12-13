import { AvailabeCurrency } from "./types.js"



/**
 * Validates payment amount and currency
 */
export function paymentCheck(amount: number, currency: string): string | null {
	if (!amount || amount <= 0 || amount > 10000) return `Funding amount ${amount} is invalid`
	if (!currency || !AvailabeCurrency.includes(currency)) return `Funding currency ${currency} is invalid`
	return null
}