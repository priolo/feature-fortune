import { Account } from '@/types/Account';
import { Done, PriorityHigh, WarningAmber } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../AvatarCmp';
import MessageBanner from '../MessageBanner';
import { sxClips, sxContent, sxRoot } from '@/theme/AvatarStyle';



interface Props {
    account: Account;
}

const AccountViewer: React.FC<Props> = ({
    account
}) => {

    // RENDER

    if (!account) return <MessageBanner>
        No Account Selected
    </MessageBanner>

    const stripeAccProps: any = !!account.stripeAccountId
        ? (account.stripeAccountStatus === 'ready'
            ? { color: 'success', icon: <Done />, label: 'STRIPE READY' }
            : { color: 'warning', icon: <WarningAmber />, label: 'STRIPE INCOMPLETE' }
        ) : { color: 'error', icon: <PriorityHigh sx={{ width: 14, height: 14 }} />, label: 'NO STRIPE' }

    return (
        <Box sx={sxRoot}>

            <AvatarCmp account={account} />

            <Box sx={sxContent} >

                <Typography>
                    {account.name}
                </Typography>

                <Box sx={sxClips}>
                    {account.emailVerified && (
                        <Chip icon={<Done />} color="success"
                            label="VERIFIED"
                        />
                    )}
                    {account.googleEmail && (
                        <Chip color="primary"
                            label="GOOGLE"
                        />
                    )}
                    {account.githubId && (
                        <Chip color="primary"
                            label="GITHUB"
                        />
                    )}
                    {account.stripeHaveCard && (
                        <Chip
                            label="CARD"
                        />
                    )}

                    <Chip {...stripeAccProps} />

                </Box>
            </Box>
            
        </Box>
    )
};

export default AccountViewer;
