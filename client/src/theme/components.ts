import { PaletteOptions, ThemeOptions } from "@mui/material";


// Common theme options
export const commonOptions = (palette: PaletteOptions): ThemeOptions => ({
	typography: {
		fontFamily: '"Inter Variable", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h1: { lineHeight: 'unset' },
		h2: { lineHeight: 'unset' },
		h3: { lineHeight: 'unset' },
		h4: { lineHeight: 'unset' },
		h5: { lineHeight: 'unset', fontWeight: 600, },
		h6: { lineHeight: 'unset', fontWeight: 500, fontSize: '1.2rem' },
		subtitle1: { lineHeight: 'unset' },
		subtitle2: { lineHeight: 'unset' },
		body1: { lineHeight: 'unset', fontSize: '1rem' },
		body2: { lineHeight: 'unset', fontSize: '.85rem', fontWeight: 400 },
		button: { lineHeight: 'unset', fontSize: '.92rem' },
		caption: { lineHeight: 'unset', fontSize: '.9rem' },
		overline: { lineHeight: 'unset', fontSize: '.76rem' },
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: palette.background.default,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 150,
					fontWeight: 600,
				},
			},
		},
		// MuiCard: {
		// 	styleOverrides: {
		// 		root: {
		// 			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
		// 		},
		// 	},
		// },
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
					backgroundColor: palette.background.input,
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
});
