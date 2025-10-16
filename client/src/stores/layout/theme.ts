import { createStore, StoreCore } from "@priolo/jon";



/**
 * Store for managing theme mode (dark/light)
 */
const setup = {

	state: {
		/** Current theme mode: 'light' or 'dark' */
		mode: (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light',
	},

	getters: {},

	actions: {
		/**
		 * Toggle between light and dark mode
		 */
		toggleMode: (_: void, store?: ThemeStore) => {
			const newMode = store.state.mode === 'light' ? 'dark' : 'light';
			store.setMode(newMode);
		},
	},

	mutators: {
		/** Set a specific theme mode */
		setMode: (mode: 'light' | 'dark') => {
			localStorage.setItem('themeMode', mode);
			return { mode }
		},
	},
};

export type ThemeState = typeof setup.state;
export type ThemeGetters = typeof setup.getters;
export type ThemeActions = typeof setup.actions;
export type ThemeMutators = typeof setup.mutators;
export interface ThemeStore extends StoreCore<ThemeState>, ThemeGetters, ThemeActions, ThemeMutators {
	state: ThemeState;
}

const themeSo = createStore<ThemeState>(setup);

export default themeSo as ThemeStore;
