import { createTheme, ThemeOptions } from '@mui/material/styles';

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

// Common theme options
const commonOptions = (theme: string): ThemeOptions => ({
	typography: {
		h1: { lineHeight: 'unset' },
		h2: { lineHeight: 'unset' },
		h3: { lineHeight: 'unset' },
		h4: { lineHeight: 'unset' },
		h5: { lineHeight: 'unset' },
		h6: { lineHeight: 'unset', fontWeight: 500, fontSize: '1.2rem' },
		subtitle1: { lineHeight: 'unset' },
		subtitle2: { lineHeight: 'unset' },
		body1: { lineHeight: 'unset', fontSize: '1rem' },
		body2: { lineHeight: 'unset', fontSize: '.85rem' },
		button: { lineHeight: 'unset', fontSize: '.92rem' },
		caption: { lineHeight: 'unset', fontSize: '.9rem' },
		overline: { lineHeight: 'unset', fontSize: '.76rem' },
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 150,
					fontWeight: 600,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					//boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'none',
				},
			},
		},
		MuiLink: {
			defaultProps: {
				target: '_blank',
				rel: 'noopener noreferrer',
				color: 'inherit',
				underline: 'hover',
			},
		},
		MuiChip: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				root: {
					height: 20,
					fontSize: '0.65rem',
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					width: 40,
					height: 40,
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				size: 'small',
				fullWidth: true,
			},
		},
		MuiOutlinedInput: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				notchedOutline: {
					border: "none",
					borderRadius: 15,
					backgroundColor: theme == "dark" ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 24,
				},
			},
		},
	},
})

// Light theme
export const lightTheme = createTheme({
	...commonOptions("light"),
	// custom: {
	// 	myNewParam: 'value for light theme',
	// },
	palette: {
		mode: 'light',
		primary: {
			main: '#d900ffff',
			light: '#e96fff',
			dark: '#c814e7',
			contrastText: 'rgba(255, 255, 255, 0.87)',
		},
		secondary: {
			main: '#91ff00ff',
			light: '#befc6dff',
			dark: '#6cbe00ff',
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
	},
});


// Dark theme
export const darkTheme = createTheme({
	...commonOptions("dark"),
	// custom: {
	// 	myNewParam: 'value for dark theme',
	// },
	palette: {
		mode: 'dark',
		primary: {
			main: '#e149fcff',
			light: '#e96fff',
			dark: '#c814e7',
			contrastText: 'rgba(0, 0, 0, 0.87)',
		},
		secondary: {
			main: '#91ff00ff',
			light: '#befc6dff',
			dark: '#6cbe00ff',
			contrastText: 'rgba(0, 0, 0, 0.87)',
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
			input: 'rgba(0, 0, 0, 0.2)',
		},
		text: {
			primary: '#fff',
			secondary: 'rgba(255, 255, 255, 0.7)',
		},
	},
});
