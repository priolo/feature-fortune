
import authSo from '@/stores/auth/repo';
import { Box, SxProps, Typography } from '@mui/material';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';



interface Props {
}

/**
 * login and register new accout
 */
const GoogleLoginCmp: React.FC<Props> = ({
}) => {

    // STORES


    // HOOKS


    // HANDLERS
    // hook chiamato da google per il successo
    const handleLoginSuccess = (response: CredentialResponse) => {
        console.log('Login Success:', response);
        authSo.loginWithGoogle(response.credential)
    }
    // hook chiamato da google per il fallimento
    const handleLoginFailure = () => {
        console.log('Login Failure:');
    }

    // RENDER

    return (
        <Box sx={sxRoot}>

            <Typography>GOOGLE</Typography>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                />
            </GoogleOAuthProvider>
        </Box>
    );
};

export default GoogleLoginCmp;

const sxRoot: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
}