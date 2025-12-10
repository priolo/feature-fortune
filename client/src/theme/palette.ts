import { PaletteOptions } from "@mui/material";

export const paletteDark: PaletteOptions = {
	mode: 'dark',
	primary: {
		main: '#e149fc',		// '#e149fc', // ba52fe // feff34 // ff5e6c
		light: '#e96fff',
		dark: '#c814e7',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	secondary: {
		main: '#91ff00',		// '#91ff00', // 81fe82 // fd5707 // 69c1fc
		light: '#befc6d',
		dark: '#6cbe00',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	background: {
		// default: '#121212',
		// paper: '#1e1e1e',
		// input: 'rgba(0, 0, 0, 0.5)',

		default: '#242424ff',
		paper: '#0e0e0e',
		input: 'rgba(255, 255, 255, 0.08)',
	},
	text: {
		primary: '#fff',
		secondary: 'rgba(255, 255, 255, 0.7)',
	},
}

export const paletteLight: PaletteOptions = {
	mode: 'light',
	primary: {
		main: '#d900ff', 		// '#d900ffff', // ba52fe // feff34 // ff5e6c
		light: '#e96fff',
		dark: '#c814e7',
		contrastText: 'rgba(255, 255, 255, 0.87)',
	},
	secondary: {
		main: '#69c1fc', 		// '#629421ff', // #81fe82 // #fd5707 // #69c1fc
		light: '#8bcefaff',
		dark: '#287fb9ff',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	background: {
		default: '#f5f5f5',
		paper: '#ffffff',
		input: 'rgba(0, 0, 0, 0.1)',
	},
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.6)',
	},
}