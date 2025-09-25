import fundingApi from "@/api/funding";
import authSo from "@/stores/auth/repo";
import { Box, Button, SxProps } from "@mui/material";
import { useStore } from "@priolo/jon";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";



interface GithubUserCmpProps {
	sx?: SxProps
}

const StripeCreditCardCmp: React.FC<GithubUserCmpProps> = ({
	sx,
}) => {
	const havePaymentMethod = !!authSo.state.user?.stripePaymentMethodId

	// STORES

	useStore(authSo)
	const [card, setCard] = useState(null)


	// HOOKS

	const stripe = useStripe();
	const elements = useElements();
	
	useEffect(() => {
		if (!havePaymentMethod) return
		async function load() {
			const card = fundingApi.getPaymentMethod()
			setCard(card)
		}
		load()
	}, [havePaymentMethod])


	// HANDLERS

	const handleSavePayMethodClick = async () => {
		if (!stripe || !elements) return;

		// Creo il PaymentMethod 
		const resIntent = await fundingApi.createPaymentMethod()
		if (!resIntent) return // error

		// Confermo con i dati della carta
		const resCard = await stripe.confirmCardSetup(
			resIntent.clientSecret,
			{
				payment_method: {
					card: elements.getElement(CardElement)!,
				}
			}
		)

		// 3) Salvo il PaymentMethod 
		const stripePaymentMethodId = resCard.setupIntent.payment_method as string
		const res = await fundingApi.savePaymentMethod(stripePaymentMethodId);

		if (res.success) {
			alert("Metodo di pagamento salvato! Sarai addebitato quando l'autore sarà pronto.");
			authSo.setUser({
				...authSo.state.user,
				stripeCustomerId: resIntent.stripeCustomerId,
				stripePaymentMethodId
			})
		} else {
			alert(resCard.error.message)
		}
	}

	const handleCCReset = async () => {
		const res = await fundingApi.removePaymentMethod()
		if (res.success) {
			alert("Metodo di pagamento rimosso.");
			authSo.setUser({
				...authSo.state.user,
				stripePaymentMethodId: null
			})
		} else {
			alert("Errore nella rimozione del metodo di pagamento.")
		}
	}

	// RENDER



	return (
		<Box sx={[sxRoot, sx] as SxProps}>

			{havePaymentMethod ? <>

				<Box>CREDIT CARD SETTATA</Box>
				<Button onClick={handleCCReset}>RESET</Button>

			</> : <>

				<Box>INSERISCI LA TUA CREDIT CARD</Box>
				<CardElement className="stripe-card-element" />
				<Button
					onClick={handleSavePayMethodClick}
				>SET THIS CARD</Button>

			</>}

		</Box>
	)
}

export default StripeCreditCardCmp;

const sxRoot: SxProps = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
}