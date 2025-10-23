import { Funding, FUNDING_STATUS } from "@/types/Funding";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import dayjs from "dayjs";
import CurrencyField from "../CurrencyField";
import Paragraph from "@/layout/Paragraph";



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
			currency: 'USD',
			amount: 500,
			status: FUNDING_STATUS.PENDING,
			message: '',
			expiresAt: dayjs().add(10, 'day').toDate(),
			featureId: null,
		}
		setFunding(defaultFunding)
	}, [isOpen, fundingToEdit])


	// HANDLERS

	const handlePropChange = (newProp: Partial<Funding>) => {
		setFunding(last => ({ ...last, ...newProp }))
	}

	const handleClose = () => {
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

					<Paragraph title="AMOUNT">
						<CurrencyField
							currency={funding.currency}
							value={funding.amount}
							onChange={(value, currency) => handlePropChange({ amount: value, currency })}
						/>
					</Paragraph>

					<Paragraph title="EXPIRATION">
						<TextField type="date" fullWidth
							value={funding.expiresAt ? dayjs(funding.expiresAt).format('YYYY-MM-DD') : ""}
							onChange={(e) => handlePropChange({ expiresAt: dayjs(e.target.value).toDate() })}
						/>
					</Paragraph>

					<TextField multiline fullWidth rows={4}
						value={funding.message ?? ""}
						onChange={(e) => handlePropChange({ message: e.target.value })}
						placeholder="Message..."
					/>

				</Box>
			</DialogContent>

			<DialogActions>

				<Button
					onClick={handleClose}
				>CANCEL</Button>

				<Button variant="contained" color="primary"
					onClick={handleOk}
				>OK</Button>

			</DialogActions>
		</Dialog>
	)
}


export default FundingDialog



