import stripeApi from '@/api/stripe';
import Card from '@/components/Card';
import authSo from '@/stores/auth';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Button, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MessageCmp from '../MessageCmp';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';


/**
 * Permette di registrarsi come Stripe express account
 */
const StripeAuthorCard: React.FC = () => {

	// STORES
	useStore(authSo);
	const { t } = useTranslation();


	// HANDLERS
	const handleRegister = async () => {
		if (!authSo.state.user?.email && !authSo.state.user?.googleEmail) {
			await dialogSo.dialogOpen({
				text: t('cards.StripeAuthorCard.alerts.link_email'),
				type: DIALOG_TYPE.ERROR,
			})
			return;
		}
		const res = await stripeApi.registerLink();
		if (!res.url) return alert(t('cards.StripeAuthorCard.alerts.registration_error'))
		window.location.href = res.url;
	};

	const handleDetach = async () => {
		const res = await dialogSo.dialogOpen({
			type: DIALOG_TYPE.WARNING,
			text: t('cards.StripeAuthorCard.alerts.detach_warning_text'),
			modal: true,
		})
		if (!res) return
		await stripeApi.unregister();
		authSo.setUser({
			...authSo.state.user,
			stripeAccountId: null,
			stripeAccountStatus: null,
		})
		dialogSo.dialogOpen({
			type: DIALOG_TYPE.SUCCESS,
			text: t('cards.StripeAuthorCard.alerts.detached_success'),
		})
	};

	const handleStripeDashboard = () => {
		if (!authSo.state.user?.stripeAccountId) {
			dialogSo.dialogOpen({
				type: DIALOG_TYPE.ERROR,
				text: t('cards.StripeAuthorCard.alerts.account_not_found'),
			})
			return
		}
		const url = `https://dashboard.stripe.com/${authSo.state.user?.stripeAccountId}/home`;
		window.open(url, '_blank');
	}

	// RENDER
	const haveStripeAuthor = !!authSo.state.user?.stripeAccountId
	const accountReady = authSo.state.user?.stripeAccountStatus == "ready";
	const msgType = !haveStripeAuthor ? 'warn' : accountReady ? 'info' : 'done';

	return (
		<Card id="stripe-author-card"
			title={t('cards.StripeAuthorCard.title')}
			icon={<ManageAccountsIcon color="primary" />}
		>

			<MessageCmp variant={msgType} title={t(`cards.StripeAuthorCard.status.${msgType}.title`)}>
				<Trans i18nKey={`cards.StripeAuthorCard.status.${msgType}.desc`} />
			</MessageCmp>


			<Box sx={sxActions}>
				{haveStripeAuthor && (
					<Button onClick={handleDetach}>
						{t('cards.StripeAuthorCard.actions.detach')}
					</Button>
				)}
				{haveStripeAuthor && <>
					<Button onClick={handleRegister}>
						{accountReady ? t('cards.StripeAuthorCard.actions.modify') : t('cards.StripeAuthorCard.actions.complete')}
					</Button>
					<Button onClick={handleStripeDashboard}>
						{t('cards.StripeAuthorCard.actions.dashboard')}
					</Button>
				</>}
				{!haveStripeAuthor && (
					<Button onClick={handleRegister}>
						{t('cards.StripeAuthorCard.actions.register')}
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



