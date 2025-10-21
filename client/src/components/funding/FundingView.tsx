import { Funding } from '@/types/Funding';
import { Box, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../AvatarCmp';
import CurrencyLabel from '../CurrencyLabel';
import StatusChip from './StatusChip';



interface Props {
	funding: Funding;
}

const FundingView: React.FC<Props> = ({ 
	funding, 
}) => {
	
	return (
		<Box sx={{ flex: 1, display: 'flex', gap: 1.5, alignItems: 'start' }}>

			<AvatarCmp account={funding.account} />

			<Box sx={{ flex: 1, display: 'flex', flexDirection: "column", gap: .5,  overflow: 'hidden' }}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ flex: 1 }}>
						{funding.account?.name ?? "Unknown Account"}
					</Typography>
					<CurrencyLabel amount={funding.amount} currency="USD" />
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
