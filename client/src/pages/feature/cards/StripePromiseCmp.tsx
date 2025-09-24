import React, { useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/stores/feature/detail";
import fundingApi from "@/api/funding";
import { Button } from "@mui/material";

let payMethod: string = null

export default function DonationForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!stripe || !elements) return;

		setLoading(true);

		// 1) Chiamo il BE per ottenere SetupIntent
		// const res = await fetch("http://localhost:3000/create-setup-intent", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify({ contributorId: "user123" }),
		// });
		const { clientSecret } = await fundingApi.createPaymentMethod("user123");

		// 2) Confermo SetupIntent con i dati della carta
		const result = await stripe.confirmCardSetup(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)!,
			},
		});

		payMethod = result.setupIntent.payment_method as string

		if (result.error) {
			alert(result.error.message);
		} else {
			// 3) Ho un payment_method salvato!
			console.log("PaymentMethod salvato:", result.setupIntent.payment_method);

			// invia al tuo BE per salvare nel DB
			// await fetch("http://localhost:3000/save-donation", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify({
			// 		contributorId: "user123",
			// 		authorId: "author456",
			// 		paymentMethodId: result.setupIntent.payment_method,
			// 		customerId: result.setupIntent.customer,
			// 	}),
			// });

			alert("Metodo di pagamento salvato! Sarai addebitato quando l'autore sarà pronto.");
		}

		setLoading(false);
	}

	const handleDonate = async () => {
		const result = await fundingApi.donate(payMethod);
		console.log(result);
	}

	return <>

		<form onSubmit={handleSubmit}>
			<CardElement className="mannaggia" />
			<button >Salva Donazione</button>
		</form>
		<Button
			onClick={handleDonate}
		>PAGA!!!</Button>
	</>
}
