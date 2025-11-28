import accountApi from '@/api/account';
import AccountViewer from '@/components/account/AccountViewer';
import { Account } from '@/types/Account';
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

    useEffect(() => {
        if (!accountId) {
            setAccount(null)
            return
        }
        if (account?.id === accountId) return
        const load = async () => {
            const account = await accountApi.get(accountId)
            setAccount(account)
            onLoad?.(account)
        }
        load();
    }, [accountId])


    // HANDLERS


    // RENDER

    return <AccountViewer account={account} />
};

export default AccountIdView;
