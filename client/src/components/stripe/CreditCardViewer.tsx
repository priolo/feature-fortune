import { Box } from "@mui/material";
import { PaymentMethod } from "@stripe/stripe-js";

interface CreditCardViewerProps {
	card?: PaymentMethod.Card | null;
}

const CreditCardViewer = ({ card }: CreditCardViewerProps) => {
	if (!card) return <Box>No Card Data</Box>;

	return (
		<Box
			sx={{
				border: "1px solid #ccc",
				borderRadius: 1,
				p: 2,
				display: "flex",
				alignItems: "center",
				gap: 2,
			}}
		>
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
