import { Account } from '@/types/Account';
import { InfoOutlined } from '@mui/icons-material';
import { Avatar, Box, SxProps, Typography } from '@mui/material';
import React from 'react';



interface Props {
    account?: Account;
}

const AvatarCmp: React.FC<Props> = ({
    account,
}) => {

    return (
        <Avatar
            src={account?.avatarUrl}
            alt={account?.name}
        >
            {!account?.avatarUrl && (
                !!account
                    ? account.name?.charAt(0).toUpperCase()
                    : <InfoOutlined color="action" />
            )}
        </Avatar>
    );
};

export default AvatarCmp;
