import { AvailabeCurrency } from "@/types/Currency";
import { Box, MenuItem, Select, TextField } from "@mui/material";
import { FunctionComponent } from "react";



interface Props {
	/** The ammount in cents */
	value?: number;
	/** currency */
	currency?: string;
	/** Callback when the value changes */
	onChange?: (value: number, currency: string) => void;
}

const CurrencyField: FunctionComponent<Props> = ({
	value,
	currency = "usd",
	onChange,
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
		<Box sx={{ flex: 1, display: 'flex', gap: 1 }}>

			<Select
				value={currency}
				onChange={handleCurrencyChange}
			>
				{AvailabeCurrency.map((curr) => (
					<MenuItem key={curr} value={curr}>
						{curr.toUpperCase()}
					</MenuItem>
				))}
			</Select>

			<TextField fullWidth type="number"
				value={valueStr}
				onChange={handleValueChange}
			/>

		</Box>
	);
};

export default CurrencyField;
