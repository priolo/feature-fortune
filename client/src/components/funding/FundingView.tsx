import stripeApi from '@/api/stripe';
import authSo from '@/stores/auth';
import fundingListSo from '@/stores/funding/list';
import { sxContent, sxRoot } from '@/theme/AvatarStyle';
import { Funding, FUNDING_STATUS } from '@/types/Funding';
import { Cancel, Delete, Pause, Payment } from '@mui/icons-material';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import ActionsMenu, { ActionMenuProps } from '../ActionsMenu';
import AvatarCmp from '../AvatarCmp';
import CurrencyLabel from '../CurrencyLabel';
import StatusChip from './StatusChip';



interface Props {
	funding: Funding;
	onCancel?: (funding: Funding) => void;
	onPayNow?: (funding: Funding) => void;
}

const FundingView: React.FC<Props> = ({
	funding,
	onCancel,
	onPayNow
}) => {

	// HANDLERS

	// RENDER
	const message = !!funding.message && funding.message.trim().length > 0 ? funding.message : "No Message";
	const youAreFunder = funding.accountId === authSo.state.user?.id;
	const canEditable = funding.status == FUNDING_STATUS.PAYABLE || funding.status == FUNDING_STATUS.PENDING
	const actions: ActionMenuProps[] = [
		//{ label: "PAUSE", icon: <Pause />, onClick: null },
		{ label: "CANCEL", icon: <Cancel />, onClick: () => onCancel(funding) },
		{ label: "PAY NOW!", icon: <Payment />, onClick: () => onPayNow(funding) },
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
