import accountApi from '@/api/account';
import AccountFinderDialog from '@/components/account/AccountFinderDialog';
import AccountViewer from '@/components/account/AccountViewer';
import { Account } from '@/types/Account';
import { AppBlocking } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card, { sxActionCard } from '../Card';



interface Props {
    accountId?: string
    onChange?: (account: Account) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const AccountSelectorCard: React.FC<Props> = ({
    accountId,
    onChange,
}) => {


    // HOOKS
    const [dialogOpen, setDialogOpen] = useState(false);
    const [account, setAccount] = useState<Account>(null);

    useEffect(() => {
        if (!accountId) {
            setAccount(null)
            return
        }
        if (account?.id === accountId) return
        const load = async () => {
            const account = await accountApi.get(accountId)
            setAccount(account)
        }
        load();
    }, [accountId])


    // HANDLERS
    const handleFindAccountClick = () => {
        setDialogOpen(true)
    }
    const handleAccountDialogClose = async (account: Account) => {
        setDialogOpen(false)
        setAccount(account)
        onChange?.(account)
    }


    // RENDER

    return <>

        <Card
            title="Account"
            icon={<AppBlocking color="primary" />}
        >
            <Typography variant="body2" color="text.secondary">
                Select the account that will be used to open issues and pull requests on GitHub.
            </Typography>

            <AccountViewer account={account} />

            <Box sx={sxActionCard}>
                <Button
                    onClick={handleFindAccountClick}
                >
                    {!!account ? 'CHANGE ACCOUNT' : 'SELECT ACCOUNT'}
                </Button>
            </Box>
        </Card>

        <AccountFinderDialog
            isOpen={dialogOpen}
            onClose={handleAccountDialogClose}
        />

    </>
};

export default AccountSelectorCard;
