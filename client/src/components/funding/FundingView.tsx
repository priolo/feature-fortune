import { Funding } from '@/types/Funding';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../AvatarCmp';
import CurrencyLabel from '../CurrencyLabel';
import StatusChip from './StatusChip';
import { sxContent, sxRoot } from '@/theme/AvatarStyle';



interface Props {
	funding: Funding;
}

const FundingView: React.FC<Props> = ({ 
	funding, 
}) => {
	
	return (
		<Box sx={sxRoot}>

			<AvatarCmp account={funding.account} />

			<Box sx={sxContent}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ flex: 1 }}>
						{funding.account?.name ?? "Unknown Account"}
					</Typography>
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
