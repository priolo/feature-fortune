import AccountIdView from '@/components/account/AccountIdView';
import CurrencyGroupsLabel from '@/components/CurrencyGroupsLabel';
import { sxOverviewRoot } from '@/pages/styles';
import featureDetailSo from '@/stores/feature/detail';
import fundingListSo from '@/stores/funding/list';
import { amountFunded } from '@/stores/funding/utils';
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { Box, Paper, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Countdown from './Countdown';
import FeatureStatusChip from './StatusChip';
import themeSo from '@/stores/layout/theme';
import { useTransComponents } from '@/pages/useTransComponents';



interface Props {
    sx?: SxProps
}

const FeatureDetailOverview: React.FC<Props> = ({
    sx
}) => {


    // STORES
    useStore(fundingListSo)


    // STORES
    const { t } = useTranslation()
    const TransCmps = useTransComponents()
    const featureDetailSa = useStore(featureDetailSo);


    // RENDER
    const feature = featureDetailSa.feature;
    if (!feature) return null;
    const isNew = !feature.id
    const haveDeveloper = !!feature.githubDevId

    const values = useMemo(() => amountFunded(fundingListSo.state.all), [fundingListSo.state.all]);
    const messageStatus = isNew ? 'new'
        : feature.status == FEATURE_STATUS.PROPOSED && !haveDeveloper ? 'proposed_no_dev'
            : feature.status;
    const haveCountdown = feature.status === FEATURE_STATUS.COMPLETED && feature.completedAt
    const hours = Number(import.meta.env.VITE_PAYMENT_AFTER_COMPLETION_HOURS ?? 12)
    const deltaMin = haveCountdown ? hours * 60 * 60 * 1000 : 0

    return (
        <Box sx={[sxOverviewRoot, sx] as SxProps}>

            <Typography variant="h6">
                {t('overview.title', 'Overview')}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                <Trans
                    i18nKey={t(`overview.feature.message.${messageStatus}`)}
                    values={{ time: hours }}
                    components={TransCmps}
                />
            </Typography>

            {!isNew && (
                <FeatureStatusChip sx={{ alignSelf: 'flex-end' }}
                    status={feature.status}
                />
            )}

            {values.length > 0 && (
                <Box sx={sxPropBox}>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.feature.label.amount', 'AMOUNT')}
                    </Typography>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                        <CurrencyGroupsLabel values={values} />
                    </Typography>
                </Box>
            )}

            {feature.accountId && (
                <Box sx={sxPropBox}>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.feature.label.author', 'AUTHOR')}
                    </Typography>
                    <Paper sx={{ p: 1, borderRadius: 2 }}>
                        <AccountIdView accountId={feature.accountId} />
                    </Paper>
                </Box>
            )}

            {feature.createdAt && (
                <Box sx={sxPropBox}>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.feature.label.created_at', 'CREATE AT')}
                    </Typography>
                    <Typography variant="body2">
                        {new Date(feature.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            )}

            {haveCountdown && (
                <Countdown
                    date={feature.completedAt}
                    delta={deltaMin}
                />
            )}

        </Box>
    );
};

export default FeatureDetailOverview;

const sxPropBox: SxProps = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    alignItems: "flex-end",
}