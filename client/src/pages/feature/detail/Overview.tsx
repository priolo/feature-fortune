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
import { sxOverviewRoot } from '@/pages/styles';



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
    const isNew = !feature.id
    const messageStatus = isNew ? 'new' : feature.status

    return (
        <Box sx={[sxOverviewRoot, sx] as SxProps}>

            <Typography variant="h6">
                {t('overview.title', 'Overview')}
            </Typography>



            <Typography variant="body2" color="text.secondary">
                <Trans i18nKey={t(`overview.feature.message.${messageStatus}`)} />
            </Typography>



            {!isNew && (
                <FeatureStatusChip sx={{ alignSelf: 'flex-end' }}
                    status={feature.status}
                />
            )}

            {values.length > 0 && (
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.feature.label.amount', 'AMOUNT')}
                    </Typography>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                        <CurrencyGroupsLabel values={values} />
                    </Typography>
                </Box>
            )}

            {feature.accountId && (
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.feature.label.author', 'AUTHOR')}
                    </Typography>
                    <Paper sx={{ p: 1, borderRadius: 2 }}>
                        <AccountIdView accountId={feature.accountId} />
                    </Paper>
                </Box>
            )}

            {feature.createdAt && (
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.feature.label.create_at', 'CREATE AT')}
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

