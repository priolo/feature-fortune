import AccountFinderDialog from '@/components/account/AccountFinderDialog';
import MessageCmp from '@/components/MessageCmp';
import { Account } from '@/types/Account';
import { Keyboard } from '@mui/icons-material';
import { Box, Button, ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Card, { sxActionCard } from '../Card';
import AccountIdView from './AccountIdView';



interface Props {
    id?: string,
    accountId?: string
    match?: boolean,
    readOnly?: boolean,

    icon?: React.ReactNode,
    variant?: string

    onChange?: (account: Account) => void
}

/**
 * CARD che visualizza e seleziona un ACCOUNT
 */
const AccountSelectorCardCmp: React.FC<Props> = ({
    id,
    accountId,
    match,
    readOnly,

    icon,
    variant = "DevSelectorCard",

    onChange,
}) => {

    // STORES
    

    // HOOKS
    const { t } = useTranslation()
    const [dialogOpen, setDialogOpen] = useState(false);


    // HANDLERS
    const handleSelectClick = () => {
        setDialogOpen(true)
    }
    const handleDialogClose = async (accountSelected: Account) => {
        setDialogOpen(false)
        if (!accountSelected) return
        onChange?.(accountSelected)
    }
    const handleRemoveClick = () => {
        onChange?.(null)
    }


    // RENDER
    const isSelected = !!accountId
    const status = isSelected
        ? (
            match ? { status: 'matched', variant: 'done' } : { status: 'selected', variant: 'done' }
        ) : { status: 'none', variant: 'warn' }

    return <>

        <Card id={id ?? "account-selector-card"}
            title={t(`cards.${variant}.title`)}
            icon={icon ?? <Keyboard />}
        >

            <MessageCmp
                variant={status.variant as any}
                title={t(`cards.${variant}.status.${status.status}.title`)}
            >
                {<Trans i18nKey={`cards.${variant}.status.${status.status}.desc`} />}
            </MessageCmp>

            <ListItemButton sx={{ borderRadius: 2, bgcolor: "background.input", justifyContent: 'center', p:2 }}
                onClick={!readOnly ? handleSelectClick : undefined}
            >
                <AccountIdView accountId={accountId} />
            </ListItemButton>

            {!readOnly &&
                <Box sx={sxActionCard}>
                    {isSelected && (
                        <Button
                            onClick={handleRemoveClick}
                        >{t(`common.remove`)}</Button>
                    )}
                    <Button
                        onClick={handleSelectClick}
                    >
                        {t(`common.${!!isSelected ? "change" : "select"}`)}
                    </Button>
                </Box>
            }

        </Card>

        <AccountFinderDialog
            isOpen={dialogOpen}
            onClose={handleDialogClose}
        />

    </>
}

const AccountSelectorCard = React.memo(
    AccountSelectorCardCmp,
    (prev, next) => 
        prev.id === next.id && prev.accountId === next.accountId
        && prev.match === next.match && prev.readOnly === next.readOnly 
        && prev.variant === next.variant && prev.icon === next.icon
)
export default AccountSelectorCard

