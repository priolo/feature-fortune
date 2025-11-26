import paymentApi from "@/api/payment";
import Card from "@/components/Card";
import authSo from "@/stores/auth/repo";
import dialogSo, { DIALOG_TYPE } from "@/stores/layout/dialogStore";
import themeSo from "@/stores/layout/theme";
import { Money } from "@mui/icons-material";
import { Box, Button, SxProps, Theme } from "@mui/material";
import { useStore } from "@priolo/jon";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentMethod, StripeCardElementOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import MessageCmp from "../MessageCmp";
import CreditCardViewer from "./CreditCardViewer";



interface Props {
}

/**
 * Permette di salvare e rimuovere una carta di credito per i pagamenti
 */
const StripeCreditCard: React.FC<Props> = ({
}) => {
	const havePaymentMethod = authSo.state.user?.stripeHaveCard


	// STORES
	useStore(authSo)
	const { t } = useTranslation();


	// HOOKS
	const stripe = useStripe();
	const elements = useElements();
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
	useEffect(() => {
		if (!havePaymentMethod) return
		async function load() {
			const { paymentMethods } = await paymentApi.get()
			setPaymentMethod(paymentMethods)
		}
		load()
	}, [havePaymentMethod])


	// HANDLERS
	const handleSaveCC = async () => {
		if (!stripe || !elements) return;

		// Validate the card element before proceeding
		const cardElement = elements.getElement(CardElement);
		if (!cardElement) return alert("Errore: elemento carta non trovato.");

		// Creo il PaymentMethod 
		const resIntent = await paymentApi.create()
		if (!resIntent) return // error

		// Confermo con i dati della carta
		const resCard = await stripe.confirmCardSetup(
			resIntent.clientSecret,
			{
				payment_method: {
					card: cardElement,
				}
			}
		)
		if (resCard.error) {
			await dialogSo.dialogOpen({
				text: t('cards.StripeCreditCard.alerts.save_cc.error', { message: resCard.error.message }),
				type: DIALOG_TYPE.ERROR,
			})
			return
		}

		// 3) Salvo il PaymentMethod 
		const stripePaymentMethodId = resCard.setupIntent.payment_method as string
		const res = await paymentApi.saveCard(stripePaymentMethodId);

		if (res.success) {
			await dialogSo.dialogOpen({
				text: t('cards.StripeCreditCard.alerts.save_cc.success'),
				type: DIALOG_TYPE.SUCCESS,
			})
			authSo.setUser({
				...authSo.state.user,
				stripeHaveCard: true,
			})
		} else {
			alert(resCard.error.message)
		}
	}

	const handleResetCC = async () => {
		const r = await dialogSo.dialogOpen({
			type: DIALOG_TYPE.WARNING,
			text: t('cards.StripeCreditCard.alerts.remove_cc.alert'),
			modal: true,
		})
		if (!r) return

		const res = await paymentApi.remove()
		if (res.success) {
			authSo.setUser({
				...authSo.state.user,
				stripeHaveCard: false,
			})
			setPaymentMethod(null)
		}

		dialogSo.dialogOpen({
			text: t(`cards.StripeCreditCard.alerts.remove_cc.${res.success ? 'success' : 'error'}`),
			type: DIALOG_TYPE.SUCCESS,
		})
	}


	// RENDER
	const theme = themeSo.state.current
	const status = !havePaymentMethod ? 'warn' : 'done';


	return (
		<Card id="stripe-credit-card"
			title={t(`cards.StripeCreditCard.title`)}
			icon={<Money color="primary" />}
		>

			<MessageCmp variant={status} title={t(`cards.StripeCreditCard.status.${status}.title`)} sx={{ mb: 1 }}>
				<Trans i18nKey={`cards.StripeCreditCard.status.${status}.desc`} />
			</MessageCmp>


			{!!havePaymentMethod ? (
				<CreditCardViewer card={paymentMethod?.card} />
			) : (
				<Box sx={sxCardElement}>
					<CardElement options={cardElementOptions(theme)} />
				</Box>
			)}


			<Box sx={sxActions}>
				{havePaymentMethod ? <>
					<Button
						onClick={handleResetCC}
					>{t('cards.StripeCreditCard.actions.detach')}</Button>
				</> : <>
					<Button
						onClick={handleSaveCC}
					>{t('cards.StripeCreditCard.actions.set_card')}</Button>
				</>}
			</Box>

		</Card>
	)
}

export default StripeCreditCard;

const sxActions: SxProps = {
	display: 'flex',
	justifyContent: 'end',
	paddingTop: 1,
};

const sxCardElement: SxProps = {
	borderRadius: 2,
	p: 2,
	bgcolor: "background.input",
};

const cardElementOptions = (theme: Theme): StripeCardElementOptions => ({
	style: {
		base: {
			color: theme.palette.text.primary,
			fontFamily: theme.typography.fontFamily,
			fontSize: '16px',
			'::placeholder': {
				color: theme.palette.text.secondary,
			},
		},
	},
})

