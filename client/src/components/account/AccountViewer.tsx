import { Account } from '@/types/Account';
import { Done, PriorityHigh, WarningAmber } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../AvatarCmp';
import MessageBanner from '../MessageBanner';



interface Props {
    account: Account;
}

const AccountViewer: React.FC<Props> = ({
    account
}) => {

    // RENDER

    if (!account) return <MessageBanner>
        void
    </MessageBanner>

    const stripeAccProps: any = !!account.stripeAccountId
        ? (account.stripeAccountStatus === 'ready'
            ? { color: 'success', icon: <Done />, label: 'Stripe Ready' }
            : { color: 'warning', icon: <WarningAmber />, label: 'Stripe incomplete' }
        ) : { color: 'error', icon: <PriorityHigh sx={{ width: 14, height: 14 }} />, label: 'NO STRIPE' }

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>

            <AvatarCmp account={account} />

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: 'hidden', gap: .5 }} >

                <Typography>
                    {account.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: .5, flexWrap: 'wrap' }}>
                    {account.emailVerified && (
                        <Chip icon={<Done />} color="success"
                            label="Verified"
                        />
                    )}
                    {account.googleEmail && (
                        <Chip color="primary"
                            label="Google"
                        />
                    )}
                    {account.githubId && (
                        <Chip color="primary"
                            label="GitHub"
                        />
                    )}
                    {account.stripeHaveCard && (
                        <Chip
                            label="Card"
                        />
                    )}

                    <Chip {...stripeAccProps} />

                </Box>
            </Box>
        </Box>
    )
};

export default AccountViewer;
