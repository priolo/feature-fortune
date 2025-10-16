import { Funding } from "@/types/Funding";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import dayjs from "dayjs";
import CurrencyField from "../CurrencyField";


interface Props {

	/** funding da modificare, se non c'è creo un nuovo funding */
	fundingToEdit?: Funding,

	/** se è true la dialog è aperta */
	isOpen: boolean,

	/** restituisco il Funding creato */
	onClose: (repo: Funding | null) => void

}

const FundingDialog: FunctionComponent<Partial<Props>> = ({
	fundingToEdit,
	isOpen,
	onClose,
}) => {


	// HOOKs

	const [funding, setFunding] = useState<Funding>(null)

	useEffect(() => {
		if (!isOpen) return
		const defaultFunding = fundingToEdit ?? {
			amount: 0,
			status: 'created',
			message: '',
			expiresAt: dayjs().add(10, 'day').toDate(),
			featureId: '',
		}
		setFunding(defaultFunding)
	}, [isOpen, fundingToEdit])


	// HANDLERS

	const handlePropChange = (newProp: Partial<Funding>) => {
		setFunding(last => ({ ...last, ...newProp }))
	}

	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		onClose?.(null);
	}

	const handleOk = () => {
		onClose?.(funding);
	};


	// RENDER 
	if (!funding) return null

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>Contribute</DialogTitle>

			<DialogContent>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>

					{/* Amount Section */}
					<CurrencyField 
						value={funding.amount}
						onChange={(amount) => handlePropChange({ amount })}
						label="Amount"
					/>

					<TextField label="Expiration Date" type="date" fullWidth
						value={funding.expiresAt ? dayjs(funding.expiresAt).format('YYYY-MM-DD') : ""}
						onChange={(e) => handlePropChange({ expiresAt: dayjs(e.target.value).toDate() })}
						InputLabelProps={{ shrink: true }}
					/>

					<TextField label="Message" multiline fullWidth
						rows={4}
						value={funding.message ?? ""}
						onChange={(e) => handlePropChange({ message: e.target.value })}
					/>

				</Box>
			</DialogContent>

			<DialogActions>

				<Button
					onClick={() => handleClose()}
				>Cancel</Button>

				<Button variant="contained" color="primary"
					onClick={handleOk}
				>OK</Button>

			</DialogActions>
		</Dialog>
	)
}


export default FundingDialog



