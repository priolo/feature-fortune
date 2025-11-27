import CurrencyLabel from '@/components/CurrencyLabel';
import FundingsAvatarGroup from '@/components/funding/FundingsAvatarGroup';
import { sxContent, sxRoot } from '@/theme/AvatarStyle';
import { Feature } from '@/types/feature/Feature';
import { Avatar, Box, Link, SxProps, Typography } from '@mui/material';
import React from 'react';
import FeatureStatusChip from '../detail/StatusChip';


interface Props {
	feature: Feature;
	sx?: SxProps;
}

const FeatureView: React.FC<Props> = ({
	feature,
	sx,
}) => {

	// RENDER
	const repo = feature.githubRepoMetadata

	let haveValues = false;
	const valuesDic = feature.fundings.reduce((acc, funding) => {
		const key = funding.currency;
		const amount = funding.amount ?? 0;
		if (amount > 0) haveValues = true;
		let subtotal = acc[key] ?? 0;
		subtotal = subtotal == null ? amount : subtotal + amount;
		acc[key] = subtotal;
		return acc;
	}, {} as Record<string, number>)
	const values = Object.entries(valuesDic)

	return (
		<Box sx={[sxRoot, sx] as SxProps}>

			<Avatar
				src={repo?.avatar_url}
				alt={repo?.full_name}
			/>

			<Box sx={sxContent}>

				<Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }} >

					{/* REPO NAME */}
					<Link href={repo?.html_url} >
						{repo?.full_name}
					</Link>

					<Box sx={{ flex: 1 }} />

					<FundingsAvatarGroup sx={{ alignSelf: "center" }}
						fundings={feature.fundings} 
					/>

					{/* AMMOUNT */}
					<Box sx={{display: "flex", alignItems: "baseline", gap: 1 }}>
						{ !haveValues && '--' }
						{values.map(([currency, amount], index) => <React.Fragment key={currency}>
							<CurrencyLabel amount={amount} currency={currency} />
							{index < values.length - 1 && <span>+</span>}
						</React.Fragment>)}
					</Box>

				</Box>

				<Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }} >

					<Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
						{feature.title ?? feature.description.slice(0, 200)}
					</Typography>

					<FeatureStatusChip status={feature.status} />

				</Box>

			</Box>
		</Box>
	)

};

export default FeatureView;
