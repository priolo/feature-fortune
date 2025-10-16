import { createTheme, ThemeOptions } from '@mui/material/styles';

// Common theme options
const commonOptions: ThemeOptions = {
	typography: {
		fontFamily: '"Inter Variable", "Roboto", "Helvetica", "Arial", sans-serif',
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 500,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
				},
			},
		},
	},
};

// Light theme
export const lightTheme = createTheme({
	...commonOptions,
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
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.6)',
		},
	},
});

// Dark theme
export const darkTheme = createTheme({
	...commonOptions,
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9',
			light: '#e3f2fd',
			dark: '#42a5f5',
			contrastText: 'rgba(0, 0, 0, 0.87)',
		},
		secondary: {
			main: '#ce93d8',
			light: '#f3e5f5',
			dark: '#ab47bc',
			contrastText: 'rgba(0, 0, 0, 0.87)',
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#fff',
			secondary: 'rgba(255, 255, 255, 0.7)',
		},
	},
});
