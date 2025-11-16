import { Account } from '@/types/Account';
import { InfoOutlined } from '@mui/icons-material';
import { Avatar, SxProps } from '@mui/material';
import React from 'react';



interface Props {
    account?: Account
    sx?: SxProps
}

const AvatarCmp: React.FC<Props> = ({
    account,
    sx,
}) => {

    if (!account) {
        return (
            <Avatar sx={[{ bgcolor: "primary.main" }, sx] as SxProps}>
                <InfoOutlined />
            </Avatar>
        )
    }

    return (
        <Avatar sx={sx}
            src={account.avatarUrl}
            alt={account.name}
        >
            {!account.avatarUrl && (
                account.name?.charAt(0).toUpperCase()
            )}
        </Avatar>
    )
};

export default AvatarCmp;
