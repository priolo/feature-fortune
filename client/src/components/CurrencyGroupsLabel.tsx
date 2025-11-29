import { Box, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import CurrencyLabel from "./CurrencyLabel";



interface Props {
	values: [string, number][]
}

const CurrencyGroupsLabel: FunctionComponent<Props> = ({
	values
}) => {

	// RENDER
	return (
		<Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
			{values.length == 0 && '--'}
			{values.map(([currency, amount], index) => <React.Fragment key={currency}>
				<CurrencyLabel amount={amount} currency={currency} />
				{index < values.length - 1 && <span>+</span>}
			</React.Fragment>)}
		</Box>
	);
};

export default CurrencyGroupsLabel;
