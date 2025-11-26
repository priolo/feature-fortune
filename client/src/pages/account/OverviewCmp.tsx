import React from 'react';
import { Box, Typography, Alert, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
import authSo from '@/stores/auth/repo';




interface Props {
    sx?: SxProps
}
const OverviewCmp: React.FC<Props> = ({
    sx,
}) => {

    // STORES
    const authSa = useStore(authSo);

    // RENDER
    const user = authSa.user;
    if (!user) return null;

    return (
        <Box sx={[sxRoot, sx] as SxProps}>
            
            <Typography variant="h6" gutterBottom>
                Overview
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
                This page allows you to manage your personal information, linked login services, and payment details.
                Keep your profile up to date to ensure smooth collaboration and funding processing.
            </Typography>

            {(!user.email || !user.emailVerified) && (
                <Alert severity="warning" sx={{ mt: 2 }} icon={false}>
                    You can't receive email notifications now because
                    {!user.email 
                        ? " you haven't linked an email address." 
                        : " your email address is not verified."}
                </Alert>
            )}
            
            {user.email && user.emailVerified && (
                <Alert severity="success" sx={{ mt: 2 }} icon={false}>
                    Your email is verified. You will receive important notifications.
                </Alert>
            )}
        </Box>
    );
};

export default OverviewCmp;


const sxRoot: SxProps = {
    position: 'sticky',
    top: 0,
    alignItems: 'flex-end',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
}