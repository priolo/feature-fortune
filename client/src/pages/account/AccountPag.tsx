import authSo, { stripePromise } from '@/stores/auth/repo';
import featureDetailSo from '@/stores/feature/detail';
import { Box, Button, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import GithubUserCmp from './cards/GithubUserCmp';
import StripeCreditCardCmp from './cards/StripeCreditCardCmp';



interface AccountPagProps {
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const AccountPag: React.FC<AccountPagProps> = ({
}) => {

    // STORES
    useStore(featureDetailSo)
    useStore(authSo)



    // HOOKS
    useEffect(() => {
        if (!featureDetailSo.state.githubRepo) return
        featureDetailSo.fetchGithubUser()
    }, [featureDetailSo.state.githubRepo])


    // HANDLERS
    const handleGithubAttach = async () => {
        authSo.attachGithub()
    }

    


    // RENDER
    const haveGithub = !!authSo.state.user?.githubId

    return (
        <Box sx={sxRoot}>

            {/* GITHUB ZONE */}
            {haveGithub ? (
                <GithubUserCmp userId={authSo.state.user.githubId} />
            ) : (
                <Button variant="contained" onClick={handleGithubAttach}>
                    Accedi con GitHub
                </Button>
            )}

            {/* STRIPE ZONE */}
            <Elements stripe={stripePromise}>
                <StripeCreditCardCmp />
            </Elements>

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