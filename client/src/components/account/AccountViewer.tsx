import { Account } from '@/types/Account';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import React from 'react';



interface Props {
    account: Account;
}

const AccountViewer: React.FC<Props> = ({
    account
}) => {

    // RENDER

    if (!account) return <Typography variant="body2" color="text.secondary">
        void
    </Typography>

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
            <Avatar
                src={account.avatarUrl}
                alt={account.name}
                sx={{ width: 64, height: 64 }}
            >
                {!account.avatarUrl && account.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="h2">
                    {account.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {account.email}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                    {account.emailVerified && (
                        <Chip label="✓ Verified" size="small" color="success" />
                    )}
                    {account.googleEmail && (
                        <Chip label="Google" size="small" color="primary" />
                    )}
                    {account.githubId && (
                        <Chip label="GitHub" size="small" color="primary" />
                    )}
                    {account.stripeHaveCard && (
                        <Chip label="💳 Card" size="small" />
                    )}
                    {account.stripeHaveAccount && (
                        <Chip 
                            label={`Stripe ${account.stripeAccountStatus || 'Account'}`} 
                            size="small" 
                            color={account.stripeAccountStatus === 'ready' ? 'success' : 'warning'}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
};

export default AccountViewer;
