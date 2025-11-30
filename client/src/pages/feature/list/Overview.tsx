import { sxOverviewRoot } from '@/pages/styles';
import featureListSo from '@/stores/feature/list';
import { Box, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import { useTranslation } from 'react-i18next';



const FeatureListOverview: React.FC = () => {

    // STORES
    const featureListSa = useStore(featureListSo);

    // HOOKS
    const { t } = useTranslation()

    // RENDER
    const allFeatures = featureListSa.all || [];

    return (
        <Box sx={sxOverviewRoot}>

            <Typography variant="h6">
                {t('overview.title', 'Overview')}
            </Typography>



            <Typography variant="body2" color="text.secondary" /*sx={{ whiteSpace: 'pre-line' }}*/>
                {t('overview.features.message.default')}
            </Typography>



            <Box>
                <Typography variant="overline" color="text.secondary">
                    {t('overview.features.label.total', 'TOTAL FEATURES')}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                    {allFeatures.length}
                </Typography>
            </Box>

        </Box>
    );
};

export default FeatureListOverview;
