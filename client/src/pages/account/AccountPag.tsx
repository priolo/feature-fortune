import authSo, { stripePromise } from '@/stores/auth/repo';
import { Box, Button, SxProps, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Elements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import GithubUserCmp from './cards/GithubUserCmp';
import StripeCreditCardCmp from './cards/StripeCreditCardCmp';
import fundingApi from '@/api/funding';
import EmailVerifyDialog from '@/components/email/EmailVerifyDialog';


interface AccountPagProps {
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const AccountPag: React.FC<AccountPagProps> = ({
}) => {

    // STORES
    useStore(authSo)


    // HOOKS
    const [emailDialogIsOpen, setEmailDialogIsOpen] = useState(false)


    // HANDLERS
    const handleGithubAttach = async () => {
        authSo.attachGithub()
    }

    const handleGoogleDetach = async () => {
        //authSo.attachGithub()
    }

    const handleLoginSuccess = (response: CredentialResponse) => {
        console.log('Login Success:', response);
        authSo.attachGoogle(response.credential)
    }
    const handleLoginFailure = () => {
        console.log('Login Failure:');
    }

    const handleStripeRegister = async () => {
        if (!authSo.state.user?.email) return alert('Devi prima collegare una email (Google o Github)')
        const res = await fundingApi.stripeAuthorRegisterLink()
        console.log(res)
        window.location.href = res.url
    }

    const handleStripeAuthorDetach = async () => {
        //authSo.detachStripeAuthor()
    }

    const handleEmailVerifyDialogClose = () => {
        setEmailDialogIsOpen(false)
    }


    // RENDER
    if (!authSo.state.user) {
        return <div style={{ display: 'flex', flexDirection: "column", gap: 10, alignItems: 'center' }}>
            NULL
        </div>
    }

    const haveGithub = !!authSo.state.user?.githubId
    const haveGoogle = !!authSo.state.user?.googleEmail
    const haveStripeAuthor = authSo.state.user?.stripeHaveAccount
    const isEmailVerified = !!authSo.state.user?.emailVerified
    const email = authSo.state.user?.email || ''

    return (
        <Box sx={sxRoot}>


            {/* EMAIL ZONE */}
            <Typography>{email}</Typography>
            <Typography>
                {isEmailVerified ? "VERIFIED" : "UNVERIFIED"}
            </Typography>
            <Button variant="contained" fullWidth
                onClick={() => setEmailDialogIsOpen(true)}
            >Verify</Button>
            <EmailVerifyDialog
                isOpen={emailDialogIsOpen}
                onClose={handleEmailVerifyDialogClose}
            />



            {/* GOOGLE ZONE */}
            {haveGoogle ? (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div>{authSo.state.user.email} LOGGED</div>
                    <Button variant="contained"
                        onClick={handleGoogleDetach}
                    >DETACH GOOGLE</Button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: "column", gap: 10, alignItems: 'center' }}>
                    <div>ANONYMOUS</div>
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
                        <h2>Login with Google</h2>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                        />
                    </GoogleOAuthProvider>
                </div>
            )}


            {/* GITHUB ZONE */}
            {haveGithub ? (
                <GithubUserCmp userId={authSo.state.user.githubId} />
            ) : (
                <Button variant="contained" onClick={handleGithubAttach}>
                    Accedi con GitHub
                </Button>
            )}


            {/* STRIPE CUSTOMER ZONE */}
            <Elements stripe={stripePromise}>
                <StripeCreditCardCmp />
            </Elements>


            {/* STRIPE AUTHOR ZONE */}
            {haveStripeAuthor ? <>
                <div>Sei registrato come autore su Stripe</div>
                <Button variant="contained" onClick={handleStripeAuthorDetach}>
                    DETACH AUTHOR
                </Button>
            </> : (
                <Button variant="contained" onClick={handleStripeRegister}>
                    Registrati come autore
                </Button>
            )}

        </Box>
    );
};

export default AccountPag;

const sxRoot: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    //alignItems: 'center',
    maxWidth: 800,
    margin: '0 auto',
    padding: 2
}