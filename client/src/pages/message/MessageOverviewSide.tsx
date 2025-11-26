import React from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import messageListSo from '@/stores/message/list';



const MessageOverviewSide: React.FC = () => {

	// STORES
    const messageListSa = useStore(messageListSo)
    const allCount = messageListSa.all?.length ?? 0
    const unreadCount = messageListSa.unreadCount ?? 0

	// RENDER
    return (
        <Box sx={sxRoot}>
            <Typography variant="h6" gutterBottom>
                Overview
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
                Check your inbox, read messages from other users, or send a new message.
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Typography variant="h4" color="primary">
                    {allCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    TOTAL MESSAGES
                </Typography>
            </Box>

            {unreadCount > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h4" color="secondary">
                        {unreadCount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        UNREAD
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MessageOverviewSide;

const sxRoot: SxProps = {
    position: 'sticky',
    top: 0,
    alignItems: 'flex-end',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    mr: 4, ml: 'auto', pt: 2, maxWidth: 300,
}