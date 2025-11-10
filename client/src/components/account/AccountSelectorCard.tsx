import AccountFinderDialog from '@/components/account/AccountFinderDialog';
import { Account } from '@/types/Account';
import { Keyboard } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import Card, { sxActionCard } from '../Card';
import AccountIdView from './AccountIdView';



interface Props {
    title?: string,
    icon?: React.ReactNode,
    accountId?: string
    readOnly?: boolean,
    message?: React.ReactNode,

    onChange?: (account: Account) => void
}

/**
 * CARD che visualizza e seleziona un ACCOUNT
 */
const AccountSelectorCard: React.FC<Props> = ({
    title,
    icon,
    accountId,
    readOnly,
    message,

    onChange,
}) => {


    // HOOKS
    const [dialogOpen, setDialogOpen] = useState(false);


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
    const isSelected = !!accountId

    return <>

        <Card id="account-selector-card"
            title={title}
            icon={icon ?? <Keyboard />}
            titleEndRender={!readOnly &&
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
            }
        >

            <Typography variant="body2" color="text.secondary">
                {message}
            </Typography>

            <AccountIdView accountId={accountId} />

        </Card>

        <AccountFinderDialog
            isOpen={dialogOpen}
            onClose={handleDialogClose}
        />

    </>
};

export default AccountSelectorCard;
