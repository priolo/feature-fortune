import { Funding, FUNDING_STATUS } from "@/types/Funding";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography } from "@mui/material";
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
			currency: 'usd',
			amount: 500,
			status: FUNDING_STATUS.PENDING,
			message: '',
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

		<Dialog 
			open={isOpen}
			onClose={handleClose}
		>

			<DialogTitle>CONTRIBUTE</DialogTitle>

			<DialogContent>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>

					<Paragraph title="AMOUNT">
						<CurrencyField
							currency={funding.currency}
							value={funding.amount}
							onChange={(value, currency) => handlePropChange({ amount: value, currency })}
						/>
					</Paragraph>

					<Typography variant="body2" color="text.secondary" whiteSpace={"pre-line"}>
						{`Puoi annullare il finanziamento in qualunque momento durante lo sviluppo della FEATURE.
						Quando FEATURE è dichiarata COMPLETED da (nome_autore)
						riceverai una notifica e avrai 24 ore di tempo per annullare il finanziamento (se non ti convince)
						altrimenti avverrà il pagamento in automatico.`}
					</Typography>

					<TextField multiline fullWidth rows={4}
						value={funding.message ?? ""}
						onChange={(e) => handlePropChange({ message: e.target.value })}
						placeholder="Se vuoi inserisci un messaggio (opzionale)"
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



