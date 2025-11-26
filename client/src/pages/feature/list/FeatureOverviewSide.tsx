import React from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import featureListSo from '@/stores/feature/list';

const FeatureOverviewSide: React.FC = () => {
    const featureListSa = useStore(featureListSo);
    const allFeatures = featureListSa.all || [];

    return (
        <Box sx={sxRoot}>

            <Typography variant="h6">
                Overview
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

const sxRoot: SxProps = {
    position: 'sticky',
    top: 0,
    alignItems: 'flex-end',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    mr: 4, ml: 'auto', pt: 2, maxWidth: 300,
}