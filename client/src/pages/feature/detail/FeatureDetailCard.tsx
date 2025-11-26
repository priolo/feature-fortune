import Card from '@/components/Card';
import ReadOnlyTextField from '@/components/ReadOnlyTextField';
import Paragraph from '@/layout/Paragraph';
import { Feature } from '@/types/feature/Feature';
import { FeaturedPlayList } from '@mui/icons-material';
import React from 'react';



interface Props {
	feature: Feature
	readOnly?: boolean
	onChange: (feature: Feature) => void;
}

const FeatureDetailCard: React.FC<Props> = ({
	feature,
	readOnly,
	onChange: onChange,
}) => {

	// HOOKS


	// HANDLER
	const handlePropChange = (prop: Partial<Feature>) => {
		onChange?.({ ...feature, ...prop })
	};


	// RENDER
	const title = feature?.title ?? '';
	const description = feature?.description ?? '';

	return (

		<Card id="feature-detail-card"
			title="DETAIL"
			icon={<FeaturedPlayList />}
		>

			<Paragraph title="TITLE">
				<ReadOnlyTextField fullWidth
					readOnly={readOnly}
					value={title}
					onChange={(e) => handlePropChange({ title: e.target.value })}
					placeholder="Enter a short title for the feature"
				/>
			</Paragraph>

			<Paragraph title="DESCRIPTION" sx={{ alignItems: 'start' }} sxLabel={{ mt: ".7rem" }}>
				<ReadOnlyTextField fullWidth multiline rows={6}
					readOnly={readOnly}
					value={description}
					onChange={(e) => handlePropChange({ description: e.target.value })}
					placeholder="Enter a complete description of the feature..."
				/>
			</Paragraph>

		</Card>
	);
};

export default FeatureDetailCard;

