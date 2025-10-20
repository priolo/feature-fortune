import { Comment } from '@/types/Comment';
import { Feature } from '@/types/feature/Feature';
import { Avatar, Box, Link, Typography } from '@mui/material';
import React from 'react';




interface Props {
	feature: Feature;
	onClick?: (comment: Comment) => void;
}

const FeatureRow: React.FC<Props> = ({
	feature,
	onClick
}) => {

	// RENDER
	const repo = feature.githubRepoMetadata

	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
			<Avatar
				src={repo?.avatar_url}
				alt={repo?.full_name}
			/>
			<Box sx={{ flex: 1 }}>
				<Link href={repo?.html_url}>
					{repo?.full_name}
				</Link>
				<Typography variant="body2" color="text.secondary">
					{repo?.description?.slice(0, 200) ?? 'No description available'}
				</Typography>
			</Box>
		</Box>
	)

};

export default FeatureRow;
