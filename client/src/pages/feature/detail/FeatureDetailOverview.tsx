import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useStore } from '@priolo/jon';
import featureDetailSo from '@/stores/feature/detail';
import { FEATURE_STATUS } from '@/types/feature/Feature';

const FeatureDetailOverview: React.FC = () => {
    const featureDetailSa = useStore(featureDetailSo);
    const feature = featureDetailSa.feature;

    if (!feature) return null;

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 2, p: 2, textAlign: 'right', maxWidth: 300, ml: 'auto',
            position: 'sticky', top: 20
        }}>
            <Typography variant="h6" gutterBottom>
                Overview
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
                View the current status and details of this feature request.
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                    STATUS
                </Typography>
                <Chip 
                    label={feature.status?.toUpperCase().replace('_', ' ') || 'UNKNOWN'} 
                    color={getStatusColor(feature.status)} 
                />
            </Box>

             {feature.createdAt && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        CREATED AT
                    </Typography>
                    <Typography variant="body1">
                        {new Date(feature.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            )}

            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary">
                        {feature.fundings?.length || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        FUNDINGS
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary">
                        {feature.comments?.length || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        COMMENTS
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const getStatusColor = (status: FEATURE_STATUS) => {
    switch (status) {
        case FEATURE_STATUS.PROPOSED: return 'default';
        case FEATURE_STATUS.IN_DEVELOPMENT: return 'primary';
        case FEATURE_STATUS.RELEASED: return 'secondary';
        case FEATURE_STATUS.COMPLETED: return 'success';
        case FEATURE_STATUS.PAID: return 'success';
        case FEATURE_STATUS.CANCELLED: return 'error';
        default: return 'default';
    }
}

export default FeatureDetailOverview;
