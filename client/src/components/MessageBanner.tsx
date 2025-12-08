import { InfoOutlined } from '@mui/icons-material';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';

interface MessageBannerProps {
    align?: "start" | "center" | "end";
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

/**
 * Component used to display informational messages
 * For example: notify that a list is empty or no element is selected
 */
const MessageBanner: React.FC<MessageBannerProps> = ({
    align = 'start',
    icon = <InfoOutlined color="action" />,
    children,
}) => {

    if (!children) return null;

    return (
        <Box sx={[sxRoot, { justifyContent: align }] as SxProps}>

            <Box sx={{ display: 'flex' }}>
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