import themeSo from "@/stores/layout/theme";
import { Box, Divider, SxProps, Theme } from "@mui/material";
import { PaymentMethod } from "@stripe/stripe-js";

interface CreditCardViewerProps {
	card?: PaymentMethod.Card | null;
}

const CreditCardViewer = ({
	card
}: CreditCardViewerProps) => {

	const theme = themeSo.state.current

	if (!card) return <Box sx={sxRoot(theme)}>NO CARD DATA</Box>;

	return (
		<Box sx={sxRoot(theme)}>

			<Box sx={{ fontSize: "1em", fontWeight: "500" }}>
				**** **** **** {card.last4}
			</Box>

			<Divider orientation="vertical" flexItem />

			<Box sx={{ fontSize: "0.7em", color: "text.secondary" }}>
				{card.brand.toUpperCase()} {card.exp_month}/{card.exp_year}
			</Box>

		</Box>
	);
};

export default CreditCardViewer;

const sxRoot = (theme: Theme): SxProps => ({
	alignSelf: "start",
	alignItems: "center",
	gap: 2,

	borderRadius: 2,
	px: 2, py: 1,
	bgcolor: theme.palette.background.input,
	display: "flex",
})