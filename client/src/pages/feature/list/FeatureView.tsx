import CurrencyGroupsLabel from '@/components/CurrencyGroupsLabel';
import FundingsAvatarGroup from '@/components/funding/FundingsAvatarGroup';
import { amountFunded } from "@/stores/funding/utils";
import { sxContent, sxRoot } from '@/theme/AvatarStyle';
import { Feature } from '@/types/feature/Feature';
import { Avatar, Box, Link, SxProps, Typography } from '@mui/material';
import React, { useMemo } from 'react';
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
	const values = useMemo(() => amountFunded(feature.fundings), [feature.fundings]);

	return (
		<Box sx={[sxRoot, sx] as SxProps}>

			<Avatar
				src={repo?.owner?.avatar_url}
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
					<CurrencyGroupsLabel values={values} />

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
