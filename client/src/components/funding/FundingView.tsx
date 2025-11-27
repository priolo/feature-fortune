import stripeApi from '@/api/stripe';
import { sxContent, sxRoot } from '@/theme/AvatarStyle';
import { Funding } from '@/types/Funding';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../AvatarCmp';
import CurrencyLabel from '../CurrencyLabel';
import StatusChip from './StatusChip';
import authSo from '@/stores/auth';
import ActionsMenu from '../ActionsMenu';



interface Props {
	funding: Funding;
}

const FundingView: React.FC<Props> = ({
	funding,
}) => {

	// HANDLERS
	const handlePayNow = async () => {
		const result = await stripeApi.pay(funding.id);
		console.log(result);
	}


	// RENDER
	const message = !!funding.message && funding.message.trim().length > 0 ? funding.message : "No Message";
	const youAreFunder = funding.accountId === authSo.state.user?.id;
	const actions = [
		{ label: "PAY NOW!", onClick: handlePayNow },
		{ label: "PAUSE", onClick: null },
		{ label: "DELETE", onClick: null },
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

			{youAreFunder && (
				<ActionsMenu sx={{ position: "absolute", top: "-5px", right: "-36px" }}
					actions={actions}
				/>
			)}

		</Box>
	);
};

export default FundingView;
