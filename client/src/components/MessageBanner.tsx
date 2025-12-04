import { InfoOutlined } from '@mui/icons-material';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';

interface MessageBannerProps {
    align?: 'left' | 'center' | 'right';
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

/**
 * Component used to display informational messages
 * For example: notify that a list is empty or no element is selected
 */
const MessageBanner: React.FC<MessageBannerProps> = ({
    align = 'left',
    icon = <InfoOutlined color="action" />,
    children,
}) => {

    if (!children) return null;

    return (
        <Box sx={sxRoot}>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {icon}
            </Box>

            <Typography variant="body2" color="text.secondary">
                {children}
            </Typography>
            
        </Box>
    );
};

export default MessageBanner;

const sxRoot: SxProps = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    padding: 2,
    color: 'text.secondary',
}