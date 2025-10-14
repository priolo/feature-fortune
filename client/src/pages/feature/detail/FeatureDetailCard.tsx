import Card from '@/components/Card';
import { Feature } from '@/types/feature/Feature';
import { FeaturedPlayList } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';

interface Props {
	feature: Feature
	onChange: (feature: Feature) => void;
}

const FeatureDetailCard: React.FC<Props> = ({
	feature,
	onChange: onChange,
}) => {


	// HANDLER
	const handlePropChange = (prop: Partial<Feature>) => {
		onChange?.({
			...feature,
			...prop
		})
	};

	// RENDER
	const title = feature?.title ?? '';
	const description = feature?.description ?? '';

	return (

		<Card
			title="Detail"
			icon={<FeaturedPlayList />}
		>

			<TextField fullWidth
				label="Title"
				value={title}
				onChange={(e) => handlePropChange({ title: e.target.value })}
				placeholder="Enter a short title for the feature"
			/>

			<TextField fullWidth multiline
				label="Feature Description"
				rows={6}
				value={description}
				onChange={(e) => handlePropChange({ description: e.target.value })}
				placeholder="Enter a complete description of the feature..."
			/>

		</Card>
	);
};

export default FeatureDetailCard;
