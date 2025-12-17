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

const MAX_LENGTH = 1000;

const FeatureDetailCardCmp: React.FC<Props> = ({
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
				inputProps={{ maxLength: MAX_LENGTH }}
				helperText={`${description.length}/${MAX_LENGTH}`}
			/>

			<Typography variant='caption' color="textSecondary">
				{t('cards.FeatureDetailCard.link.title')}
			</Typography>
			{!link && readOnly && (
				<Typography variant="body2" color="textSecondary">
					{t("cards.FeatureDetailCard.link.no_link")}
				</Typography>
			)}
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
					>{t('common.save')}
					</Button>
				</Box>
			)}

		</Card>
	);
}

const FeatureDetailCard = React.memo(
	FeatureDetailCardCmp,
	(prev, next) => prev.feature === next.feature && prev.readOnly === next.readOnly
);

export default FeatureDetailCard;

