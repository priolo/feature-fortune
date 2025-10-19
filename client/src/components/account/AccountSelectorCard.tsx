import accountApi from '@/api/account';
import AccountFinderDialog from '@/components/account/AccountFinderDialog';
import AccountViewer from '@/components/account/AccountViewer';
import { Account } from '@/types/Account';
import { Face, Keyboard } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card, { sxActionCard } from '../Card';



interface Props {
    accountId?: string
    onChange?: (account: Account) => void
}

/**
 * CARD che visualizza e seleziona un ACCOUNT
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

    const handleSelectClick = () => {
        setDialogOpen(true)
    }
    const handleDialogClose = async (account: Account) => {
        setDialogOpen(false)
        if (!account) return
        onChange?.(account)
    }
    const handleRemoveClick = () => {
        onChange?.(null)
    }


    // RENDER

    const isSelected = !!account
    const message = !account
        ? "Select the account that will be used to open issues and pull requests on GitHub."
        : null

    return <>

        <Card id="account-selector-card"
            title="DEVELOPER"
            icon={<Keyboard />}
        >

            <Typography variant="body2" color="text.secondary">
                {message}
            </Typography>

            <AccountViewer account={account} />

            <Box sx={sxActionCard}>
                {isSelected && (
                    <Button
                        onClick={handleRemoveClick}
                    >REMOVE</Button>
                )}
                <Button
                    onClick={handleSelectClick}
                >
                    {!!isSelected ? 'CHANGE' : 'SELECT'}
                </Button>
            </Box>

        </Card>

        <AccountFinderDialog
            isOpen={dialogOpen}
            onClose={handleDialogClose}
        />

    </>
};

export default AccountSelectorCard;
