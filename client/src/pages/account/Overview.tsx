import React from 'react';
import { Box, Typography, Alert, SxProps, AlertTitle } from '@mui/material';
import { useStore } from '@priolo/jon';
import authSo from '@/stores/auth';
import { useTranslation } from 'react-i18next';
import { Done, Warning } from '@mui/icons-material';
import { sxOverviewRoot } from '../styles';




interface Props {
    sx?: SxProps
}
const AccountOverview: React.FC<Props> = ({
    sx,
}) => {

    // STORES
    const authSa = useStore(authSo);

    // HOOKS
    const { t } = useTranslation()

    // RENDER
    const user = authSa.user
    if (!user) return null
    const haveEmail = true// !!user.email || !!user.emailVerified
    const haveGithub = !!user.githubId
    const haveCreditCard = user.stripeHaveCard
    const haveStripe = !!user.stripeAccountId

    return (
        <Box sx={sxOverviewRoot}>

            <Typography variant="h6">
                {t('overview.title', 'Overview')}
            </Typography>


            <Typography variant="body2" color="text.secondary">
                {t('overview.account.message.default')}
            </Typography>


            <Typography variant="body2" >
                {t(`overview.account.message.email.${haveEmail ? "success" : "warning"}`)}
            </Typography>

            <Typography variant="body2" >
                {t(`overview.account.message.github.${haveGithub ? "success" : "warning"}`)}
            </Typography> 

            <Typography variant="body2" >
                {t(`overview.account.message.credit_card.${haveCreditCard ? "success" : "warning"}`)}
            </Typography> 

            <Typography variant="body2" >
                {t(`overview.account.message.stripe.${haveStripe ? "success" : "warning"}`)}
            </Typography> 

        </Box>
    );
};

export default AccountOverview;
