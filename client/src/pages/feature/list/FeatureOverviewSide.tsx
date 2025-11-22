import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import featureListSo from '@/stores/feature/list';

const FeatureOverviewSide: React.FC = () => {
    const featureListSa = useStore(featureListSo);
    const allFeatures = featureListSa.all || [];

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 2, p: 2, textAlign: 'right', maxWidth: 300, ml: 'auto',
            position: 'sticky', top: 20
        }}>
            <Typography variant="h6" gutterBottom>
                Features Overview
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
                Browse all requested features, vote for the ones you want, or fund them to speed up development.
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Typography variant="h4" color="primary">
                    {allFeatures.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    TOTAL FEATURES
                </Typography>
            </Box>
        </Box>
    );
};

export default FeatureOverviewSide;
