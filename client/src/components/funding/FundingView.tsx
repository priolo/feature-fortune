import authSo from '@/stores/auth';
import { sxContent, sxRoot } from '@/theme/AvatarStyle';
import { Funding, FUNDING_STATUS } from '@/types/Funding';
import { Cancel, Payment } from '@mui/icons-material';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import ActionsMenu, { ActionMenuProps } from '../ActionsMenu';
import AvatarCmp from '../AvatarCmp';
import CurrencyLabel from '../CurrencyLabel';
import StatusChip from './StatusChip';
import { useTranslation } from 'react-i18next';



interface Props {
	funding: Funding;
	isPayableNow?: boolean;
	onCancel?: (funding: Funding) => void;
	onPayNow?: (funding: Funding) => void;
}

const FundingView: React.FC<Props> = ({
	funding,
	isPayableNow = false,
	onCancel,
	onPayNow
}) => {

	// HOOKS
	const { t } = useTranslation()

	// HANDLERS

	// RENDER
	const message = !!funding.message && funding.message.trim().length > 0 ? funding.message : "No Message";
	const youAreFunder = funding.accountId === authSo.state.user?.id;
	const canEditable = funding.status == FUNDING_STATUS.PENDING || funding.status == FUNDING_STATUS.ERROR
	const actions: ActionMenuProps[] = [
		//{ label: "PAUSE", icon: <Pause />, onClick: null },
		{
			label: t("view.funding.label.cancel", "CANCEL"),
			icon: <Cancel />,
			onClick: () => onCancel(funding)
		},
		{
			label: t("view.funding.label.pay_now", "PAY NOW"),
			icon: <Payment />,
			onClick: () => onPayNow(funding),
			hidden: funding.status !== FUNDING_STATUS.PENDING || !isPayableNow
		},
		{ 
			label: t("view.funding.label.try_again", "TRY AGAIN"), 
			icon: <Payment />, 
			onClick: () => onPayNow(funding), 
			hidden: funding.status !== FUNDING_STATUS.ERROR || !isPayableNow
		},
	]

	return (
		<Box sx={[sxRoot, { position: "relative" }] as SxProps}>

			<AvatarCmp account={funding.account} />

			<Box sx={sxContent}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ flex: 1 }}>
						{funding.account?.name ?? "Unknown Account"}
					</Typography>
					<CurrencyLabel amount={funding.amount} currency={funding.currency} />
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography variant='body2' color='textSecondary' sx={{ flex: 1, overflowWrap: 'break-word' }}>
						{message}
					</Typography>
					<StatusChip status={funding.status} />
				</Box>

			</Box>

			{youAreFunder && canEditable && (
				<ActionsMenu sx={{ position: "absolute", top: "-5px", right: "-36px" }}
					actions={actions}
				/>
			)}

		</Box>
	);
};

export default FundingView;
