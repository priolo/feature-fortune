import stripeApi from '@/api/stripe';
import Card from '@/components/Card';
import authSo from '@/stores/auth/repo';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Button, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';



/**
 * Permette di registrarsi come Stripe express account
 */
const StripeAuthorCard: React.FC = () => {

	// STORES
	useStore(authSo);


	// HANDLERS
	const handleRegister = async () => {
		if (!authSo.state.user?.email || !authSo.state.user?.googleEmail) {
			alert('Devi prima collegare una email (Google o Github)');
			return;
		}
		const res = await stripeApi.registerLink();
		window.location.href = res.url;
	};

	const handleDetach = async () => {
		const res = await stripeApi.unregister();
		authSo.setUser({
			...authSo.state.user,
			stripeHaveAccount: false,
			stripeAccountStatus: null,
		})
	};

	// RENDER
	const haveStripeAuthor = authSo.state.user?.stripeHaveAccount;
	const accountReady = authSo.state.user?.stripeAccountStatus == "ready";

	return (
		<Card
			title="Stripe author access"
			icon={<ManageAccountsIcon color="primary" />}
		>
			<Typography variant="body2" color="text.secondary">
				{haveStripeAuthor
					? 'Sei registrato come autore su Stripe.'
					: 'Registrati come autore Stripe per iniziare a ricevere pagamenti.'}
			</Typography>

			<Box sx={sxActions}>
				{haveStripeAuthor && (
					<Button variant="contained" onClick={handleDetach}>
						DETACH
					</Button>
				)}
				{haveStripeAuthor && !accountReady && (
					<Button onClick={handleRegister}>
						COMPLETE
					</Button>
				)}
				{!haveStripeAuthor && (
					<Button onClick={handleRegister}>
						REGISTER
					</Button>
				)}

			</Box>
		</Card>
	);
};

export default StripeAuthorCard;

const sxActions: SxProps = {
	display: 'flex',
	justifyContent: 'end',
	paddingTop: 1,
};
