import { Comment } from '@/types/Comment';
import { Feature } from '@/types/feature/Feature';
import { Avatar, Box, Link, SxProps, Typography } from '@mui/material';
import React from 'react';



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

	return (
		<Box sx={[{ display: 'flex', gap: 1.5, alignItems: 'start' }, sx] as SxProps}>

			<Avatar
				src={repo?.avatar_url}
				alt={repo?.full_name}
			/>

			<Box sx={{ flex: 1, display: 'flex', flexDirection: "column", gap: .5, overflow: 'hidden' }}>

				<Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }} >
					<Link href={repo?.html_url} sx={{ flex: 1 }}>
						{repo?.full_name}
					</Link>
					<Typography>
						100 $
					</Typography>
				</Box>

				<Typography variant="body2" color="text.secondary">
					{feature.title ?? feature.description.slice(0, 200)}
				</Typography>
				
			</Box>
		</Box>
	)

};

export default FeatureView;
