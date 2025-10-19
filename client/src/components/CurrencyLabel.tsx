import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";



interface Props {
	/** The amount in cents */
	amount?: number;
	/** Currency code (e.g., USD, EUR, GBP) */
	currency?: string;
}

const CurrencyLabel: FunctionComponent<Props> = ({
	amount,
	currency = "USD",
}) => {

	// RENDER

	if (amount == null) {
		return null;
	}

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
			<Typography>
				{amount.toLocaleString()}
			</Typography>
			<Typography variant="overline" color="textSecondary">
				{currency}
			</Typography>

		</Box>
	);
};

export default CurrencyLabel;
