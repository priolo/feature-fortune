import { Uuid } from "./global.js"



export interface Account {
	id: Uuid
	name: string
	email: string

	googleEmail?: string

	
	githubId?: number

	/** 
	 * STRIPE for CONTRIBUTOR
	 * who put the moneys
	 */
	stripeCustomerId?: string
	/** 
	 * STRIPE payment method 
	 */
	stripePaymentMethodId?: string
	/** 
	 * STRIPE for AUTHOR
	 * who receive the moneys
	 */
	stripeAccountId?: string
}
