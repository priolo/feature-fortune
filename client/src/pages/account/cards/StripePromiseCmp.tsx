import fundingApi from "@/api/funding";
import paymentApi from "@/api/payment";
import { Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";



export default function DonationForm() {

	// HOOKS

	const stripe = useStripe();
	const elements = useElements();


	// HANDLERS

	const handleSavePayMethodClick = async () => {
		if (!stripe || !elements) return;

		// 1) Chiamo il BE per ottenere SetupIntent
		const resIntent = await paymentApi.create()
		if (!resIntent) return // error

		// 2) Confermo SetupIntent con i dati della carta
		const resCard = await stripe.confirmCardSetup(
			resIntent.clientSecret,
			{
				payment_method: {
					card: elements.getElement(CardElement)!,
				}
			}
		)

		const res = await paymentApi.saveCard(resCard.setupIntent.payment_method as string);

		if (!res.success) {
			alert(resCard.error.message);
		} else {
			console.log("PaymentMethod salvato:", resCard.setupIntent.payment_method);
			alert("Metodo di pagamento salvato! Sarai addebitato quando l'autore sarà pronto.");
		}
	}

	const handleAuthorRegister = async () => {
		const res = await fundingApi.stripeAuthorRegisterLink()
		window.location.href = res.url
	}

	const handleDonate = async () => {
		const result = await fundingApi.pay();
		console.log(result);
	}


	// RENDER

	return <>

		{/* ZONE SAVE CARD */}
		<CardElement className="mannaggia" />
		<Button
			onClick={handleSavePayMethodClick}
		>PAY METHOD SAVE</Button>



		{/* ZONE AUTHOR REGISTRATION */}
		<Button onClick={handleAuthorRegister}>
			REGISTRATI COME AUTORE
		</Button>



		{/* ZONE DONATE */}
		<Button
			onClick={handleDonate}
		>PAGA!!!</Button>

	</>
}
