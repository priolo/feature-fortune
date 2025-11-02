import paymentApi from "@/api/payment";
import Card from "@/components/Card";
import authSo from "@/stores/auth/repo";
import { Money } from "@mui/icons-material";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { useStore } from "@priolo/jon";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentMethod } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
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
	const handleSavePayMethodClick = async () => {
		if (!stripe || !elements) return;

		// Validate the card element before proceeding
		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			alert("Errore: elemento carta non trovato.");
			return;
		}

		// Check if the card is complete and valid
		// const { error: validationError, paymentMethod: testPaymentMethod } = await stripe.createPaymentMethod({
		// 	type: 'card',
		// 	card: cardElement,
		// });

		// if (validationError) {
		// 	alert("Carta non valida: " + validationError.message);
		// 	return;
		// }

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
			alert("Errore nella conferma della carta: " + resCard.error.message)
			return
		}

		// 3) Salvo il PaymentMethod 
		const stripePaymentMethodId = resCard.setupIntent.payment_method as string
		const res = await paymentApi.saveCard(stripePaymentMethodId);

		if (res.success) {
			alert("Metodo di pagamento salvato! Sarai addebitato quando l'autore sarà pronto.");
			authSo.setUser({
				...authSo.state.user,
				stripeHaveCard: true,
			})
		} else {
			alert(resCard.error.message)
		}
	}

	const handleCCReset = async () => {
		const res = await paymentApi.remove()
		if (res.success) {
			alert("Metodo di pagamento rimosso.");
			authSo.setUser({
				...authSo.state.user,
				stripeHaveCard: false,
			})
			setPaymentMethod(null)
		} else {
			alert("Errore nella rimozione del metodo di pagamento.")
		}
	}


	// RENDER
	return (
		<Card id="stripe-credit-card"
			title="Credit Card"
			icon={<Money color="primary" />}
		>

			<Typography variant="body2" color="text.secondary">
				{!havePaymentMethod
					? "Non hai ancora una carta di credito salvata."
					: "Hai una carta di credito salvata."
				}
			</Typography>


			{!!havePaymentMethod ? (
				<CreditCardViewer card={paymentMethod?.card} />
			) : (
				<CardElement className="stripe-card-element" />
			)}

			<Box sx={sxActions}>
				{havePaymentMethod ? <>

					<Button
						onClick={handleCCReset}
					>DETACH</Button>

				</> : <>

					<Button
						onClick={handleSavePayMethodClick}
					>SET CARD</Button>

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


