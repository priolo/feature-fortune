
import authSo from '@/stores/auth/repo';
import Card, { sxActionCard } from '@/components/Card';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, SxProps, Typography } from '@mui/material';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { useStore } from '@priolo/jon';
import { Done } from '@mui/icons-material';



interface Props {
}

/**
 * login and register new accout
 */
const GoogleLoginCard: React.FC<Props> = ({
}) => {

    // STORES
    useStore(authSo)

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
    const handleGoogleDetach = async () => {
        authSo.detachGoogle()
    }

    // RENDER
    const logged = !!authSo.state.user;
    const haveGoogle = !!authSo.state.user?.googleEmail

    return (
        <Card id="google-login-card"
            title="Google access"
            icon={<GoogleIcon color="primary" />}
        >
            <Typography variant="body2" color="text.secondary">
                <Message logged={logged} haveGoogle={haveGoogle} />
            </Typography>
            <Box sx={sxActionCard}>
                {!!logged && haveGoogle ? (
                    <Button 
                        onClick={handleGoogleDetach}
                    >Detach</Button>
                ) : (
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                        />
                    </GoogleOAuthProvider>
                )}
            </Box>
        </Card>
    );
};

export default GoogleLoginCard;


interface MessageProps {
    logged?: boolean;
    haveGoogle: boolean;
}

const Message: React.FC<MessageProps> = ({ 
    logged, 
    haveGoogle,
}) => {
    if (haveGoogle) {
        return <span>
            <Done color="success" sx={{ fontSize: '1.4em', verticalAlign: 'text-bottom', mx: "2px" }} />
            La tua email è verificata.
        </span>;
    }

    return <span>
        Collega il tuo account Google per un accesso più rapido e sicuro.
    </span>;
};