import authApi from "@/api/auth";
import authEmailApi from "@/api/authEmail";
import { Account } from "@/types/Account.js";
import { StoreCore, createStore } from "@priolo/jon";
import { loadStripe } from "@stripe/stripe-js";
import i18n from "@/plugins/i18n";



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

		userInEdit: <Partial<Account>>null,

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
			let user: Account = (await authApi.current({ noError: true, noBusy: true }))?.user
			store.setUser(user)
		},

		update: async (_: void, store?: AuthStore) => {
			if (!store.state.userInEdit?.name) return
			const newAccount: Partial<Account> = {
				name: store.state.userInEdit?.name,
				language: store.state.userInEdit?.language ?? undefined,
				notificationsEnabled: store.state.userInEdit?.notificationsEnabled ?? undefined,
				preferredCurrency: store.state.userInEdit?.preferredCurrency ?? undefined,
			}
			const updateAccount = (await authApi.update(newAccount))?.account
			store.setUser({
				...store.state.user,
				...newAccount,
			})
		},




		/**
		 * Invia il codice di verifica all'email specificata
		 */
		emailSendCode: async (email: string, store?: AuthStore) => {
			await authEmailApi.emailSendCode(email)
		},
		emailVerifyCode: async (code: string, store?: AuthStore) => {
			const user = (await authEmailApi.emailVerify(code))?.user
			store.setUser(user)
		},




		loginWithGithub: async (_: void, store?: AuthStore) => {
			const res = await authApi.githubLoginUrl()
			window.location.href = `${res.url}&prompt=select_account`
		},
		attachGithub: async (_: void, store?: AuthStore) => {
			const res = await authApi.githubAttachUrl()
			window.location.href = `${res.url}&prompt=select_account`
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
			authSo.setUser(user)
		},
		/** 
		 * attacca un account GOOGLE all'ACCOUNT attualmente loggato 
		 */
		attachGoogle: async (token: string, store?: AuthStore) => {
			const res = await authApi.googleAttach(token)
			const user = res.user as Account
			store.setUser(<Account>{
				...store.state.user,
				googleEmail: user.googleEmail,
			})
		},
		detachGoogle: async (_: void, store?: AuthStore) => {
			const res = await authApi.googleDetach()
			store.setUser({
				...store.state.user,
				googleEmail: null,
			})
		},


		logout: async (_: void, store?: AuthStore) => {
			store.setUser(null)
			await authApi.logout()
		},

	},

	mutators: {
		setUser: (user: Account) => {
			if (user?.language) i18n.changeLanguage(user.language)
			return { user }
		},
		setUserInEdit: (userInEdit: Partial<Account>) => ({ userInEdit }),
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


// effettua una chiamata allo startup per vedere se c'e' un login attivo
authSo.current()