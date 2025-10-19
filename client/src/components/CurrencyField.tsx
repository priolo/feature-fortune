import { Box, MenuItem, TextField } from "@mui/material";
import { FunctionComponent } from "react";



interface Props {
	/** The ammount in cents */
	value?: number;
	/** currency */
	currency?: string;
	/** Callback when the value changes */
	onChange?: (value: number, currency: string) => void;

	/** Available currencies */
	currencies?: string[];
}

const CurrencyField: FunctionComponent<Props> = ({
	value,
	currency = "USD",
	onChange,

	currencies = ["USD", "EUR", "GBP", "JPY"],
}) => {

	// HOOKS

	// HANDLERS
	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const amount = parseInt(e.target.value) * 100
		onChange?.(isNaN(amount) ? null : amount, currency);
	}
	const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const curr = e.target.value;
		onChange?.(value, curr);
	}


	// RENDER
	const valueStr = value != null ? (value / 100).toFixed(0) : '';

	return (
		<Box sx={{ display: 'flex', gap: 1 }}>

			<TextField select sx={{ minWidth: 100 }}
				value={currency}
				onChange={handleCurrencyChange}
			>
				{currencies.map((curr) => (
					<MenuItem key={curr} value={curr}>
						{curr}
					</MenuItem>
				))}
			</TextField>

			<TextField fullWidth type="number"
				value={valueStr}
				onChange={handleValueChange}
			/>

		</Box>
	);
};

export default CurrencyField;
