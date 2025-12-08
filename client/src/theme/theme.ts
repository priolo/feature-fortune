import { createTheme } from '@mui/material/styles';
import { commonOptions } from './components';
import { paletteDark, paletteLight } from './palette';

declare module '@mui/material/styles' {
	// interface Theme {
	// 	custom: {
	// 		myNewParam: string;
	// 	};
	// }
	// // allow configuration using `createTheme`
	// interface ThemeOptions {
	// 	custom?: {
	// 		myNewParam?: string;
	// 	};
	// }
	interface TypeBackground {
		input: string;
	}
}

// Light theme
export const lightTheme = createTheme({
	...commonOptions(paletteLight),
	// custom: {
	// 	myNewParam: 'value for light theme',
	// },
	palette: paletteLight,
});


// Dark theme
export const darkTheme = createTheme({
	...commonOptions(paletteDark),
	// custom: {
	// 	myNewParam: 'value for dark theme',
	// },
	palette: paletteDark
});
