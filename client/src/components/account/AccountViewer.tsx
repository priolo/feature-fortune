import { sxClips, sxContent, sxRoot } from '@/theme/AvatarStyle';
import { Account } from '@/types/Account';
import { Box, Chip, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AvatarCmp from '../AvatarCmp';
import MessageBanner from '../MessageBanner';



type StrupeStatus = "ready" | "partial" | "no"

interface Props {
    account: Account;
}

const AccountViewer: React.FC<Props> = ({
    account
}) => {

    // HOOKS
    const { t } = useTranslation()


    // RENDER
    if (!account) return <MessageBanner>
        {t('view.account.empty', 'NO ACCOUNT SELECTED')}
    </MessageBanner>


    const stripeStatus: StrupeStatus = !!account.stripeAccountId
        ? (account.stripeAccountStatus === 'ready' ? "ready" : "partial")
        : "no"
    const stripeLabel = t(`view.account.stripe.${stripeStatus}.label`)
    const stripeTooltip = t(`view.account.stripe.${stripeStatus}.tooltip`)
    const stripeColor = {
        ready: 'secondary',
        partial: 'warning',
        no: 'primary',
    }[stripeStatus]


    return (
        <Box sx={sxRoot}>

            <AvatarCmp account={account} />

            <Box sx={sxContent} >

                <Typography align='left'>
                    {account.name}
                </Typography>

                <Box sx={sxClips}>

                    {account.emailVerified && (
                        <Tooltip title={t("view.account.email.tooltip")}>
                            <Chip color="success"
                                label={t("view.account.email.label", 'EMAIL')}
                            />
                        </Tooltip>
                    )}

                    {account.googleEmail && (
                        <Tooltip title={t("view.account.google.tooltip")}>
                            <Chip color="primary"
                                label={t("view.account.google.label", 'GOOGLE')}
                            />
                        </Tooltip>
                    )}

                    {account.githubId && (
                        <Tooltip title={t("view.account.github.tooltip")}>
                            <Chip color="primary"
                                label={t("view.account.github.label", 'GITHUB')}
                            />
                        </Tooltip>
                    )}

                    {account.stripeHaveCard && (
                        <Tooltip title={t("view.account.card.tooltip")}>
                            <Chip label={t("view.account.card.label", 'CARD')} />
                        </Tooltip>
                    )}

                    <Tooltip title={stripeTooltip}>
                        <Chip label={stripeLabel} color={stripeColor as any} />
                    </Tooltip>

                </Box>
            </Box>

        </Box>
    )
};

export default AccountViewer;
