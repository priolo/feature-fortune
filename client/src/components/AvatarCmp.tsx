import { Account } from '@/types/Account';
import { InfoOutlined } from '@mui/icons-material';
import { Avatar, SxProps, Tooltip } from '@mui/material';
import React from 'react';



interface Props {
    account?: Account
    haveTooltip?: boolean
    sx?: SxProps
}

const AvatarCmp: React.FC<Props> = ({
    account,
    haveTooltip,
    sx,
}) => {

    if (!account) {
        return (
            <Avatar sx={[{ bgcolor: "primary.main" }, sx] as SxProps}>
                <InfoOutlined />
            </Avatar>
        )
    }
    const tooltip = haveTooltip ? account.name : null

    return (
        <Tooltip placement="top" title={tooltip}>
            <Avatar sx={sx}
                src={account.avatarUrl}
                alt={account.name}
            >
                {!account.avatarUrl && (
                    account.name?.charAt(0).toUpperCase()
                )}
            </Avatar>
        </Tooltip>
    )
};

export default AvatarCmp;
