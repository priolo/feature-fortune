import accountApi from '@/api/account';
import AccountViewer from '@/components/account/AccountViewer';
import { Account } from '@/types/Account';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';



interface Props {
    accountId?: string
    onLoad?: (account: Account) => void
}

/**
 * CARD che visualizza e seleziona un ACCOUNT
 */
const AccountIdView: React.FC<Props> = ({
    accountId,
    onLoad,
}) => {


    // HOOKS
    const [account, setAccount] = useState<Account>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!accountId) {
            setAccount(null)
            return
        }
        if (account?.id === accountId) return
        const load = async () => {
            setIsLoading(true)
            try {
                const res = await accountApi.get(accountId)
                setAccount(res?.account)
                onLoad?.(res?.account)
            } finally {
                setIsLoading(false)
            }
        }
        load();
    }, [accountId])


    // HANDLERS


    // RENDER

    if (isLoading) return <CircularProgress />

    return <AccountViewer account={account} />
};

export default AccountIdView;
