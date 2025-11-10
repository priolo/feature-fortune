import Card from '@/components/Card';
import SelectorDialogBase from '@/components/SelectorDialogBase';
import Paragraph from '@/layout/Paragraph';
import { Feature } from '@/types/feature/Feature';
import { FeatureStatusItems } from './StatusChip';
import { FeaturedPlayList } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';
import FeatureStatusChip from './StatusChip';
import ReadOnlyTextField from '@/components/ReadOnlyTextField';

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
	const [isOpen, setIsOpen] = React.useState(false);
	const [filter, setFilter] = React.useState("");


	// HANDLER
	const handlePropChange = (prop: Partial<Feature>) => {
		onChange?.({ ...feature, ...prop })
	};
	// const handleStatusClick = () => {
	// 	setIsOpen(true);
	// }
	// const handleStatusDialogClose = (item: any) => {
	// 	setIsOpen(false);
	// 	if (!item) return;
	// 	onChange?.({ ...feature, status: item.value })
	// }

	// RENDER
	const title = feature?.title ?? '';
	const description = feature?.description ?? '';

	return (

		<Card
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

			{/* <Paragraph title="STATUS">
				<FeatureStatusChip
					status={feature?.status}
					onClick={handleStatusClick}
				/>
			</Paragraph> */}


			{/* <SelectorDialogBase
				title="SELECT STATUS"
				filterText={filter}
				isOpen={isOpen}
				items={FeatureStatusItems}

				onClose={handleStatusDialogClose}
				onFilterTextChange={(text) => setFilter(text)}
				fnTextFromItem={item => item.label}
				fnIdFromItem={item => item.value}
				fnSecondaryFromItem={item => item.subtitle}
			/> */}

		</Card>
	);
};

export default FeatureDetailCard;

