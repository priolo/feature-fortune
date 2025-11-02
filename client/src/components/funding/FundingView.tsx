import { Funding } from '@/types/Funding';
import { Box, Button, SxProps, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../AvatarCmp';
import CurrencyLabel from '../CurrencyLabel';
import StatusChip from './StatusChip';
import { sxContent, sxRoot } from '@/theme/AvatarStyle';
import stripeApi from '@/api/stripe';



interface Props {
	funding: Funding;
}

const FundingView: React.FC<Props> = ({ 
	funding, 
}) => {
	
	// HANDLERS
	const handlePayNow = async (funding: Funding) => {
        const result = await stripeApi.pay(funding.id);
        console.log(result);
    }


	// RENDER
	return (
		<Box sx={sxRoot}>

			<AvatarCmp account={funding.account} />

			<Box sx={sxContent}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ flex: 1 }}>
						{funding.account?.name ?? "Unknown Account"}
					</Typography>
					<Button variant="contained" size="small" onClick={() => handlePayNow(funding)}>PAY NOW</Button>
					<CurrencyLabel amount={funding.amount} currency={funding.currency} />
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ flex: 1, overflowWrap: 'break-word' }}>
						{funding.message}
					</Typography>
					<StatusChip status={funding.status} />
				</Box>

			</Box>
		</Box>
	);
};

export default FundingView;
