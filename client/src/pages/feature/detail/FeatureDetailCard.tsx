import Card, { sxActionCard } from '@/components/Card';
import ReadOnlyTextField from '@/components/ReadOnlyTextField';
import LinkField from './LinkField';
import { Feature } from '@/types/feature/Feature';
import { Add, FeaturedPlayList } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';



interface Props {
	feature: Feature
	readOnly?: boolean
	onChange: (feature: Feature) => void;
	onSave?: () => Promise<void>;
}

const FeatureDetailCard: React.FC<Props> = ({
	feature,
	readOnly,
	onChange,
	onSave,
}) => {

	// HOOKS
	const { t } = useTranslation()


	// HANDLER
	const handlePropChange = (prop: Partial<Feature>) => {
		onChange?.({ ...feature, ...prop })
	};


	// RENDER
	const title = feature?.title ?? '';
	const description = feature?.description ?? '';
	const link = feature?.link ?? '';

	return (

		<Card id="feature-detail-card"
			title={t('cards.FeatureDetailCard.title', 'DETAILS')}
			icon={<FeaturedPlayList />}
		>

			<Typography variant='caption' color="textSecondary">
				{t('cards.FeatureDetailCard.title_field.title')}
			</Typography>
			<ReadOnlyTextField fullWidth
				readOnly={readOnly}
				value={title}
				onChange={(e) => handlePropChange({ title: e.target.value })}
				placeholder={t('cards.FeatureDetailCard.title_field.placeholder')}
			/>

			<Typography variant='caption' color="textSecondary">
				{t('cards.FeatureDetailCard.description.title')}
			</Typography>
			<ReadOnlyTextField fullWidth multiline rows={6}
				readOnly={readOnly}
				value={description}
				onChange={(e) => handlePropChange({ description: e.target.value })}
				placeholder={t("cards.FeatureDetailCard.description.placeholder")}
			/>

			<Typography variant='caption' color="textSecondary">
				{t('cards.FeatureDetailCard.link.title')}
			</Typography>
			<LinkField
				readOnly={readOnly}
				value={link}
				onChange={(val) => handlePropChange({ link: val })}
				placeholder={t("cards.FeatureDetailCard.link.placeholder")}
			/>

			{!readOnly && (
				<Box sx={sxActionCard}>
					<Button
						onClick={() => onSave?.()}
					>{t('cards.FeatureDetailCard.save', 'SAVE DETAILS')}
					</Button>
				</Box>
			)}

		</Card>
	);
};

export default FeatureDetailCard;

