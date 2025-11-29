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
	currency,
}) => {

	// RENDER
	const displayAmount = amount !=null ?  Math.round(amount/100).toLocaleString() : "--";

	return (
		<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>

			<span>
				{displayAmount}
			</span>
			
			<span style={{ fontFamily: 'monospace', opacity: 0.7, fontSize: '0.75em' }}>
				{currency ?? "---"}
			</span>

		</Box>
	);
};

export default CurrencyLabel;
