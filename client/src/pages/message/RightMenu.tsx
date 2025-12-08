import { ItemRow } from '@/layout/right/ItemRow';
import messageListSo from '@/stores/message/list';
import { getAllSenders } from '@/stores/message/utils';
import { Account } from '@/types/Account';
import { Box, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const AccountSystem: Account = {
    id: "sys",
    name: 'SYSTEM',
    email: '',
};

const RightMenu: React.FC = () => {

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

            <Typography variant="overline" color="text.secondary" sx={sxHeader}>
                Status
            </Typography>
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


            <Typography variant="overline" color="text.secondary" sx={sxHeader}>
                By Sender
            </Typography>

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

export default RightMenu;

const sxHeader: SxProps = {
    fontWeight: 200,
    //opacity: .8, 
    mb: 1,
    mt: 2
};