import { darkTheme, lightTheme } from "@/theme/theme";
import { Theme } from "@mui/material";
import { createStore, StoreCore } from "@priolo/jon";



/**
 * Store for managing theme mode (dark/light)
 */
const setup = {

	state: {
		/** Current theme mode: 'light' or 'dark' */
		current: <Theme>null,
	},

	getters: {},

	actions: {
		/**
		 * Toggle between light and dark mode
		 */
		toggleMode: (_: void, store?: ThemeStore) => {
			const newTheme = store.state.current == lightTheme ? darkTheme : lightTheme
			store.setCurrent(newTheme)
		},
	},

	mutators: {
		/** Set a specific theme mode */
		setCurrent: (theme: Theme) => {
			localStorage.setItem('themeMode', theme == lightTheme ? 'light' : 'dark');
			return { current: theme }
		}
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

// Detect system preference if no theme is saved
//const themeName = localStorage.getItem('themeMode') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const themeName = localStorage.getItem('themeMode') ?? 'dark'
themeSo.state.current = themeName == 'dark' ? darkTheme : lightTheme;

export default themeSo as ThemeStore;
