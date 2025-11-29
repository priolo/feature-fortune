import AccountIdView from '@/components/account/AccountIdView';
import CurrencyGroupsLabel from '@/components/CurrencyGroupsLabel';
import featureDetailSo from '@/stores/feature/detail';
import fundingListSo from '@/stores/funding/list';
import { amountFunded } from '@/stores/funding/utils';
import { Box, Paper, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import FeatureStatusChip from './StatusChip';



interface Props {
    sx?: SxProps
}

const FeatureDetailOverview: React.FC<Props> = ({
    sx
}) => {

    // STORES
    const { t } = useTranslation()
    useStore(fundingListSo)

    // STORES
    const featureDetailSa = useStore(featureDetailSo);


    // RENDER
    const feature = featureDetailSa.feature;
    if (!feature) return null;

    const values = useMemo(() => amountFunded(fundingListSo.state.all), [fundingListSo.state.all]);



    return (
        <Box sx={[sxRoot, sx] as SxProps}>

            <Typography variant="h6">
                {t('overview.title', 'Overview')}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                <Trans i18nKey={t(`overview.feature.message.${feature.status}`)} />
            </Typography>

            <FeatureStatusChip sx={{ alignSelf: 'flex-end' }}
                status={feature.status}
            />

            {values.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>

                    <Typography variant="overline" color="text.secondary">
                        {t('overview.label.author', 'AMOUNT')}
                    </Typography>

                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                        <CurrencyGroupsLabel values={values} />
                    </Typography>

                </Box>
            )}

            {feature.accountId && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.label.author', 'AUTHOR')}
                    </Typography>
                    <Paper sx={{ p: 1, borderRadius: 2 }}>
                        <AccountIdView accountId={feature.accountId} />
                    </Paper>
                </Box>
            )}

            {feature.createdAt && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.label.create_at', 'CREATE AT')}
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