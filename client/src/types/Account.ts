import { Uuid } from "./global.js"



export interface Account {

	id: Uuid

	name: string

	email: string
	emailVerified?: boolean

	avatarUrl?: string

	googleEmail?: string
	
	githubId?: number

	/** 
	 * STRIPE for CONTRIBUTOR
	 * who put the moneys
	 */
	//stripeCustomerId?: string
	/** 
	 * STRIPE payment method 
	 */
	//stripePaymentMethodId?: string
	stripeHaveCard?: boolean
	/** 
	 * STRIPE for AUTHOR
	 * who receive the moneys
	 */
	//stripeAccountId?: string
	stripeHaveAccount?: boolean
}
