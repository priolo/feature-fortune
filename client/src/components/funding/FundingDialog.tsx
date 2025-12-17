import Paragraph from "@/layout/Paragraph";
import { Funding, FUNDING_STATUS } from "@/types/Funding";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import CurrencyField from "../CurrencyField";
import themeSo from "@/stores/layout/theme";
import { useTransComponents } from "@/pages/useTransComponents";
import authSo from "@/stores/auth";



interface Props {
	/** funding da modificare, se non c'è creo un nuovo funding */
	fundingToEdit?: Funding,
	/** se è true la dialog è aperta */
	isOpen: boolean,
	/** restituisco il Funding creato */
	onClose: (repo: Funding | null) => void
}

const COMPLETION_TIME = import.meta.env.VITE_PAYMENT_AFTER_COMPLETION_HOURS
const MAX_LENGTH = 300;

const FundingDialog: FunctionComponent<Partial<Props>> = ({
	fundingToEdit,
	isOpen,
	onClose,
}) => {

	// HOOKs
	const { t } = useTranslation()
	const TransCmps = useTransComponents()
	const [funding, setFunding] = useState<Funding>(null)

	useEffect(() => {
		if (!isOpen) return
		const defaultFunding = fundingToEdit ?? {
			currency: authSo.state.user?.preferredCurrency ?? 'eur',
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
	const error = !funding.amount || funding.amount < Number(import.meta.env.VITE_FUNDING_MIN_AMOUNT ?? 100)
		? "amount_too_low"
		: funding.amount > Number(import.meta.env.VITE_FUNDING_MAX_AMOUNT ?? 10000)
			? "amount_too_high"
			: null;
	const bttOkEnabled = !error;
	const tooltip = error
	const messageTrim = funding.message?.trim().length ?? 0;

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
		>
			<DialogTitle>
				{t(`cards.FundingDialog.title`)}
			</DialogTitle>

			<DialogContent>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>

					<Paragraph title={t("cards.FundingDialog.amount")}>
						<CurrencyField
							currency={funding.currency}
							value={funding.amount}
							onChange={(value, currency) => handlePropChange({ amount: value, currency })}
						/>
					</Paragraph>

					<Typography variant="body2" color="text.secondary">
						<Trans
							i18nKey={`cards.FundingDialog.description`}
							values={{ time: COMPLETION_TIME }}
							components={TransCmps}
						/>
					</Typography>

					<TextField multiline fullWidth rows={4}
						value={funding.message ?? ""}
						onChange={(e) => handlePropChange({ message: e.target.value })}
						placeholder={t(`cards.FundingDialog.placeholder`)}
						inputProps={{ maxLength: MAX_LENGTH }}
						helperText={`${messageTrim}/${MAX_LENGTH}`}
					/>

				</Box>
			</DialogContent>

			<DialogActions>

				<Button
					onClick={handleClose}
				>{t(`cards.FundingDialog.button.cancel`)}</Button>

				<Tooltip title={tooltip || ''}><div>
					<Button variant="contained" color="primary"
						onClick={handleOk}
						disabled={!bttOkEnabled}
					>{t(`cards.FundingDialog.button.ok`)}</Button>
				</div></Tooltip>

			</DialogActions>
		</Dialog>
	)
}


export default FundingDialog



