import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";
import { FunctionComponent, useState, useEffect } from "react";

interface Props {
	/** The current numeric value */
	value?: number;
	
	/** Callback when the value changes */
	onChange?: (value: number) => void;
	
	/** Label for the field */
	label?: string;
	
	/** Default currency */
	defaultCurrency?: string;
	
	/** Available currencies */
	currencies?: string[];
	
	/** If true, the field is disabled */
	disabled?: boolean;
	
	/** If true, the field is required */
	required?: boolean;
}

const CurrencyField: FunctionComponent<Props> = ({
	value = 0,
	onChange,
	label = "Amount",
	defaultCurrency = "USD",
	currencies = ["USD", "EUR", "GBP", "JPY"],
	disabled = false,
	required = false,
}) => {
	const [currency, setCurrency] = useState<string>(defaultCurrency);
	const [amountInteger, setAmountInteger] = useState<string>('0');
	const [amountDecimal, setAmountDecimal] = useState<string>('00');

	// Initialize from value prop
	useEffect(() => {
		const amountStr = value.toString();
		const parts = amountStr.split('.');
		setAmountInteger(parts[0] || '0');
		setAmountDecimal(parts[1] || '00');
	}, [value]);

	const handleAmountIntegerChange = (inputValue: string) => {
		// Only allow numbers
		const numericValue = inputValue.replace(/[^0-9]/g, '');
		setAmountInteger(numericValue);
		const amount = parseFloat(`${numericValue}.${amountDecimal}`);
		onChange?.(isNaN(amount) ? 0 : amount);
	};

	const handleAmountDecimalChange = (inputValue: string) => {
		// Only allow numbers, max 2 digits
		const numericValue = inputValue.replace(/[^0-9]/g, '').slice(0, 2);
		setAmountDecimal(numericValue);
		const amount = parseFloat(`${amountInteger}.${numericValue}`);
		onChange?.(isNaN(amount) ? 0 : amount);
	};

	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
			<TextField 
				select 
				label="Currency" 
				value={currency}
				onChange={(e) => setCurrency(e.target.value)}
				sx={{ minWidth: 100 }}
				disabled={disabled}
			>
				{currencies.map((curr) => (
					<MenuItem key={curr} value={curr}>
						{curr}
					</MenuItem>
				))}
			</TextField>

			<TextField 
				label={label} 
				fullWidth
				value={amountInteger}
				onChange={(e) => handleAmountIntegerChange(e.target.value)}
				disabled={disabled}
				required={required}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							.{amountDecimal.padEnd(2, '0')}
						</InputAdornment>
					),
				}}
			/>

			<TextField 
				label="Decimals" 
				value={amountDecimal}
				onChange={(e) => handleAmountDecimalChange(e.target.value)}
				sx={{ width: 100 }}
				inputProps={{ maxLength: 2 }}
				disabled={disabled}
			/>
		</Box>
	);
};

export default CurrencyField;
