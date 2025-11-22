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
			main: '#1976d2',
			light: '#42a5f5',
			dark: '#1565c0',
			contrastText: '#fff',
		},
		secondary: {
			main: '#9c27b0',
			light: '#ba68c8',
			dark: '#7b1fa2',
			contrastText: '#fff',
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
			main: '#ce93d8',
			light: '#f3e5f5',
			dark: '#ab47bc',
			contrastText: 'rgba(0, 0, 0, 0.87)',
		},
		secondary: {
			main: '#90caf9',
			light: '#e3f2fd',
			dark: '#42a5f5',
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
