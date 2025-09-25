import { Uuid } from "./global.js"



export interface Account {
	id: Uuid
	name: string
	email: string

	githubId?: number

	stripeCustomerId?: string
	stripePaymentMethodId?: string
	stripeAccountId?: string
}
