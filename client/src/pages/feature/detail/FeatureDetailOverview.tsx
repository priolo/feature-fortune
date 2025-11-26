import AvatarCmp from '@/components/AvatarCmp';
import featureDetailSo from '@/stores/feature/detail';
import { Box, Paper, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import FeatureStatusChip from './StatusChip';
import AccountIdView from '@/components/account/AccountIdView';



interface Props {
    sx?: SxProps
}

const FeatureDetailOverview: React.FC<Props> = ({
    sx
}) => {


    // STORES
    const featureDetailSa = useStore(featureDetailSo);


    // RENDER
    const feature = featureDetailSa.feature;
    if (!feature) return null;

    return (
        <Box sx={[sxRoot, sx] as SxProps}>

            <Typography variant="h6">
                Overview
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Questa FEATURE è una bozza.
                <br />Deve essere accettata da un DEVELOPER per iniziare lo sviluppo.
            </Typography>

            <FeatureStatusChip sx={{ alignSelf: 'flex-end' }}
                status={feature?.status}
            />

            {feature.accountId && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary">
                        AUTHOR
                    </Typography>
                    <Paper sx={{ p: 1, borderRadius: 2 }}>
                        <AccountIdView accountId={feature.accountId} />
                    </Paper>
                </Box>
            )}


            {feature.createdAt && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary">
                        CREATED AT
                    </Typography>
                    <Typography variant="body2">
                        {new Date(feature.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            )}


        </Box>
    );
};

export default FeatureDetailOverview;

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