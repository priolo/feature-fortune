import { Funding } from "@/types/Funding";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from "@mui/material";
import { FunctionComponent, useState } from "react";



interface Props {

	/**
	 * se è true la dialog è aperta
	 */
	isOpen: boolean,

	/** 
	 * chiamata quando si clicca sul btt colose o fuori dalla dialog 
	 * restituisco il Funding creato
	 */
	onClose: (repo: Funding | null) => void

}

const FundingDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	onClose,
}) => {


	// HOOKs
	const [amount, setAmount] = useState<number>(0);
	const [message, setMessage] = useState<string>("");
	const [expiresAt, setExpiresAt] = useState<string>("");
	const [errors, setErrors] = useState<{ amount?: string, expiresAt?: string }>({});


	// HANDLERS
	const validateForm = (): boolean => {
		const newErrors: { amount?: string, expiresAt?: string } = {};

		if (amount <= 0) {
			newErrors.amount = "Amount must be greater than 0";
		}

		if (!expiresAt) {
			newErrors.expiresAt = "Expiration date is required";
		} else {
			const selectedDate = new Date(expiresAt);
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			if (selectedDate <= today) {
				newErrors.expiresAt = "Expiration date must be in the future";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		// Reset form when closing
		setAmount(0);
		setMessage("");
		setExpiresAt("");
		setErrors({});
		onClose?.(null);
	};

	const handleOk = () => {
		if (!validateForm()) {
			return;
		}

		const funding: Funding = {
			amount,
			message: message.trim() || undefined,
			expiresAt: new Date(expiresAt),
			status: "created",
			featureId: "" // This should be provided by the parent component
		};

		onClose?.(funding);
	};


	// RENDER 

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>Contribute</DialogTitle>

			<DialogContent>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
					<TextField
						label="Amount"
						type="number"
						value={amount || ''}
						onChange={(e) => setAmount(Number(e.target.value))}
						error={!!errors.amount}
						helperText={errors.amount}
						inputProps={{ min: 0, step: 0.01 }}
						fullWidth
						required
					/>

					<TextField
						label="Expiration Date"
						type="date"
						value={expiresAt}
						onChange={(e) => setExpiresAt(e.target.value)}
						error={!!errors.expiresAt}
						helperText={errors.expiresAt}
						InputLabelProps={{ shrink: true }}
						fullWidth
						required
					/>

					<TextField
						label="Message"
						multiline
						rows={4}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Add a message for contributors (optional)"
						fullWidth
					/>
				</Box>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => handleClose()}>Cancel</Button>
				<Button onClick={handleOk} variant="contained" color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}


export default FundingDialog



