import { Funding } from '@/types/Funding';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../AvatarCmp';
import CurrencyLabel from '../CurrencyLabel';
import StatusChip from './StatusChip';



interface Props {
	funding: Funding;
	onClick?: (funding: Funding) => void;
}

const FundingRow: React.FC<Props> = ({ funding, onClick }) => {
	return (
		<Box
			sx={sxRow}
			onClick={() => onClick?.(funding)}
		>
			<AvatarCmp account={funding.account} />

			<Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: 'hidden', gap: .5 }} >

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

export default FundingRow;

const sxRow: SxProps = {
	display: 'flex',
	gap: 1,
	alignItems: 'center',
	// cursor: onClick ? 'pointer' : 'default',
	// '&:hover': onClick ? {
	//     backgroundColor: 'action.hover'
	// } : {}
}
