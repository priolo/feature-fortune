import { Funding, FUNDING_STATUS } from '@/types/Funding';
import { AvatarGroup, SxProps } from '@mui/material';
import React, { useMemo } from 'react';
import AvatarCmp from '../AvatarCmp';



interface Props {
	fundings?: Funding[];
	max?: number;
	sx?: SxProps;
}

const FundingsAvatarGroup: React.FC<Props> = ({
	fundings = [],
	max = 5,
	sx,
}) => {

	// HOOKS
	const participants = useMemo(() => {

		const participantsMap = fundings.reduce((acc, funding) => {
			if (!funding.account || funding.status == FUNDING_STATUS.CANCELLED || funding.status == FUNDING_STATUS.ERROR ) return acc;
			const accountId = funding.account.id;
			if (!acc[accountId]) {
				acc[accountId] = {
					account: funding.account,
					totalAmount: 0
				};
			}
			acc[accountId].totalAmount += funding.amount ?? 0;
			return acc;
		}, {} as Record<string, { account: any, totalAmount: number }>);
		
		return Object.values(participantsMap)
			.sort((a, b) => b.totalAmount - a.totalAmount);

	}, [fundings]);


	// RENDER
	if (participants.length === 0) return null;

	return (
		<AvatarGroup max={max} sx={sx}>
			{participants.map((p) => (
				<AvatarCmp sx={{ width: "16px", height: "16px", fontSize: ".7em"}}
					haveTooltip
					account={p.account} 
				/>
			))}
		</AvatarGroup>
	);
};

export default FundingsAvatarGroup;
