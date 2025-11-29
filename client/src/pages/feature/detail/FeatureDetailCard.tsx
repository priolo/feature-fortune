import Card from '@/components/Card';
import ReadOnlyTextField from '@/components/ReadOnlyTextField';
import Paragraph from '@/layout/Paragraph';
import { amountFunded } from '@/stores/funding/utils';
import { Feature } from '@/types/feature/Feature';
import { FeaturedPlayList } from '@mui/icons-material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';



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
	const { t } = useTranslation()


	// HANDLER
	const handlePropChange = (prop: Partial<Feature>) => {
		onChange?.({ ...feature, ...prop })
	};


	// RENDER
	const title = feature?.title ?? '';
	const description = feature?.description ?? '';

	return (

		<Card id="feature-detail-card"
			title={t('cards.FeatureDetailCard.title', 'DETAILS')}
			icon={<FeaturedPlayList />}
		>

			<Paragraph title={t('cards.FeatureDetailCard.title_field.title')}>
				<ReadOnlyTextField fullWidth
					readOnly={readOnly}
					value={title}
					onChange={(e) => handlePropChange({ title: e.target.value })}
					placeholder={t('cards.FeatureDetailCard.title_field.placeholder')}
				/>
			</Paragraph>

			<Paragraph sx={{ alignItems: 'start' }} sxLabel={{ mt: ".7rem" }}
				title={t('cards.FeatureDetailCard.description.title')}
			>
				<ReadOnlyTextField fullWidth multiline rows={6}
					readOnly={readOnly}
					value={description}
					onChange={(e) => handlePropChange({ description: e.target.value })}
					placeholder={t("cards.FeatureDetailCard.description.placeholder")}
				/>
			</Paragraph>

		</Card>
	);
};

export default FeatureDetailCard;

