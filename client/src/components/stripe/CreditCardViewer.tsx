import themeSo from "@/stores/layout/theme";
import { Box, SxProps } from "@mui/material";
import { PaymentMethod } from "@stripe/stripe-js";

interface CreditCardViewerProps {
	card?: PaymentMethod.Card | null;
}

const CreditCardViewer = ({
	card
}: CreditCardViewerProps) => {


	if (!card) return <Box sx={sxRoot}>No Card Data</Box>;

	return (
		<Box sx={sxRoot}>

			<Box sx={{ fontSize: "1.2em" }}>
				**** **** **** {card.last4}
			</Box>

			<Box sx={{ fontSize: "0.9em", color: "text.secondary" }}>
				{card.brand.toUpperCase()} {card.exp_month}/{card.exp_year}
			</Box>

		</Box>
	);
};

export default CreditCardViewer;

const theme = themeSo.state.current

const sxRoot: SxProps = {
	alignSelf: "start",
	alignItems: "center",
	gap: 2,

	borderRadius: 2,
	px: 3, py: 2,
	bgcolor: theme.palette.action.focus,
	display: "flex",
}