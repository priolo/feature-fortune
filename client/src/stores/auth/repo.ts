import authApi from "@/api/auth";
import { Account } from "@/types/Account.js";
import { StoreCore, createStore } from "@priolo/jon";
import { loadStripe } from "@stripe/stripe-js";



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/**
 * Contiene le info dell'utente loggato
 * e gestisce il login/logout
 */
const setup = {

	state: {
		token: <string>null,
		user: <Account>null,

		clientSecret: <string>null,
	},

	getters: {
	},

	actions: {

		/**
		 * Chiamato allo startup dell'app
		 */
		current: async (_: void, store?: AuthStore) => {
			if (!!store.state.user) return
			let user: Account = null
			try {
				user = (await authApi.current())?.user
			} catch (error) {
				console.error('Error fetching current user:', error);
			}
			store.setUser(user)
		},


		loginWithGithub: async (_: void, store?: AuthStore) => {
			const res = await authApi.githubLoginUrl()
			console.log(res)
			window.location.href = res.url
		},
		attachGithub: async (_: void, store?: AuthStore) => {
			const res = await authApi.githubAttachUrl()
			console.log(res)
			window.location.href = res.url
		},
		detachGithub: async (_: void, store?: AuthStore) => {
			const res = await authApi.githubDetach()
			store.setUser({
				...store.state.user,
				githubId: null,
			})
		},


		loginWithGoogle: async (token: string, store?: AuthStore) => {
			let user: Account = null
			try {
				user = (await authApi.loginGoogle(token))?.user
			} catch (error) {
				console.error('Error fetching current user:', error);
				return
			}
			console.log('User data:', user);
			authSo.setUser(user)
		},
		/** 
		 * attacca un account GOOGLE all'ACCOUNT attualmente loggato 
		 */
		attachGoogle: async (token: string, store?: AuthStore) => {
			const res = await authApi.googleAttach(token)
			const user = res.user as Account
			console.log(user)
			store.setUser(<Partial<Account>>{
				...store.state.user,
				googleEmail: user.googleEmail,
			})
		},


		logout: async (_: void, store?: AuthStore) => {
			store.setUser(null)
			await authApi.logout()
		},

	},

	mutators: {
		setUser: (user) => ({ user }),
		setClientSecret: (clientSecret: string) => ({ clientSecret }),
	},
}

export type AuthState = typeof setup.state
export type AuthGetters = typeof setup.getters
export type AuthActions = typeof setup.actions
export type AuthMutators = typeof setup.mutators
export interface AuthStore extends StoreCore<AuthState>, AuthGetters, AuthActions, AuthMutators {
	state: AuthState
}
const authSo = createStore(setup) as AuthStore
export default authSo
