import featureDetailSo, { stripePromise } from '@/stores/feature/detail';
import { Box, TextField } from '@mui/material';
import { useStore } from '@priolo/jon';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';


export default function StripeCardCmp() {

	// STORES
	useStore(featureDetailSo)


	// HANDLERS
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		featureDetailSo.setFunding({
			...featureDetailSo.state.funding,
			amount: parseFloat(e.target.value)
		})
	}


	// RENDER
	const clientSecret = featureDetailSo.state.clientSecret;
	if (!clientSecret) return null


	return (
		<Elements stripe={stripePromise} options={{ clientSecret }}>
			<CheckoutForm clientSecret={clientSecret} />
		</Elements>
	);
}




function CheckoutForm({ clientSecret }: { clientSecret: string }) {
	const stripe = useStripe();
	const elements = useElements();
	const [processing, setProcessing] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		setProcessing(true);
		const card = elements.getElement(CardElement)!;

		// 1) conferma la carta
		const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: { card, billing_details: { name: 'Mario Rossi' } }
		});

		if (error) {
			alert(error.message);
		} else if (paymentIntent?.status === 'requires_capture') {
			// 2) autorizzato ma NON addebitato
			alert('Grazie! La donazione è registrata.');
		}
		setProcessing(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement options={{ hidePostalCode: true }} />
			<button disabled={!stripe || processing}>
				{processing ? 'Attendi…' : 'Dona ora'}
			</button>
		</form>
	);
}