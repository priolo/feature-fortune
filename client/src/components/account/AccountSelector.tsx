import accountApi from '@/api/account';
import AccountViewer from '@/components/account/AccountViewer';
import AccountFinderDialog from '@/components/account/AccountFinderDialog';
import { Account } from '@/types/Account';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';



interface Props {
    accountId?: string
    onChange?: (account: Account) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const AccountSelector: React.FC<Props> = ({
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
		if ( account?.id === accountId ) return
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

        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>
                <AccountViewer account={account} />
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleFindAccountClick}
                >
                    {!!account ? 'CHANGE ACCOUNT' : 'SELECT ACCOUNT'}
                </Button>
            </CardActions>
        </Card>


        <AccountFinderDialog
            isOpen={dialogOpen}
            onClose={handleAccountDialogClose}
        />

    </>
};

export default AccountSelector;
