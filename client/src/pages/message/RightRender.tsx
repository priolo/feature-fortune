import { HeaderItems } from '@/layout/right/HeaderItems';
import { ItemRow } from '@/layout/right/ItemRow';
import messageListSo from '@/stores/message/list';
import { getAllSenders } from '@/stores/message/utils';
import { Account } from '@/types/Account';
import { Box } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const AccountSystem: Account = {
    id: "sys",
    name: 'SYSTEM',
    email: '',
};

const RightRender: React.FC = () => {

    // STORES
    useStore(messageListSo);

    // HOOKS
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const receiverId = params.receiver ?? null;
    const readStatus = params.read ?? null;

    const receivers = useMemo<Account[]>(() => {
        if (!messageListSo.state.all) return []
        const accounts = getAllSenders(messageListSo.state.all);
        return [AccountSystem, ...accounts];
    }, [messageListSo.state.all]);

    // HANDLERS
    const handleReceiverChange = (id: string | null) => {
        const newParams = { ...params };
        if (!id) {
            delete newParams.receiver;
        } else {
            newParams.receiver = id;
        }
        setSearchParams(newParams);
    };

    const handleReadStatusChange = (status: string | null) => {
        const newParams = { ...params };
        if (status == null) {
            delete newParams.read;
        } else {
            newParams.read = status;
        }
        setSearchParams(newParams);
    };

    // RENDER
    return (
        <Box sx={{ position: 'sticky', top: 20 }}>
            <HeaderItems>Status</HeaderItems>
            <ItemRow
                label="ALL"
                selected={readStatus == null}
                onClick={() => handleReadStatusChange(null)}
            />
            <ItemRow
                label="TO READ"
                selected={readStatus === 'false'}
                onClick={() => handleReadStatusChange('false')}
            />
            <ItemRow
                label="ALREADY READ"
                selected={readStatus === 'true'}
                onClick={() => handleReadStatusChange('true')}
            />

            <HeaderItems>By Sender</HeaderItems>

            <ItemRow
                label="ALL"
                selected={receiverId == null}
                onClick={() => handleReceiverChange(null)}
            />

            {receivers.map(account => (
                <ItemRow
                    key={account.id}
                    label={account.name}
                    selected={receiverId === account.id}
                    onClick={() => handleReceiverChange(account.id)}
                />
            ))}
        </Box>
    );
};

export default RightRender;
