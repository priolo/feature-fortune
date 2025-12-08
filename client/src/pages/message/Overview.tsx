import messageListSo from '@/stores/message/list';
import { Box, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { sxOverviewRoot } from '../styles';



const MessageOverview: React.FC = () => {

    // STORES
    const messageListSa = useStore(messageListSo)
    const allCount = messageListSa.all?.length ?? 0
    const unreadCount = messageListSa.unreadCount ?? 0


    // HOOKS
    const { t } = useTranslation()


    // RENDER
    return (
        <Box sx={sxOverviewRoot}>

            <Typography variant="h6">
                {t('overview.title', 'OVERVIEW')}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {t('overview.messages.message.default')}
            </Typography>

            {unreadCount > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="overline" color="text.secondary">
                        {t('overview.messages.label.unread')}
                    </Typography>
                    <Typography variant="h4" color="secondary">
                        {unreadCount}
                    </Typography>
                </Box>
            )}

            <Box sx={{ mt: 2 }}>
                <Typography variant="overline" color="text.secondary">
                    {t('overview.messages.label.total')}
                </Typography>
                <Typography variant="h4" color="primary" >
                    {allCount}
                </Typography>
            </Box>

        </Box>
    );
};

export default MessageOverview;
