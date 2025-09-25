import GithubRepoCmp from '@/pages/feature/cards/GithubRepoCmp';
import { stripePromise } from '@/stores/auth/repo';
import featureDetailSo from '@/stores/feature/detail';
import { Box, Button, TextField, Typography } from '@mui/material';
import GithubFinderCmp from '@/pages/feature/GithubFinderCmp';
import { useStore } from '@priolo/jon';
import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import StripePromise from '../account/cards/StripePromiseCmp';



interface AccountPagProps {
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const DetailPag: React.FC<AccountPagProps> = ({
}) => {

    // STORES
    useStore(featureDetailSo)


    // HOOKS
    useEffect(() => {
        if (!featureDetailSo.state.githubRepo) return
        featureDetailSo.fetchGithubUser()
    }, [featureDetailSo.state.githubRepo])

    // HANDLERS
    const handleGitHubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        featureDetailSo.setFeature({ ...featureDetailSo.state.feature, github: e.target.value })
    }
    const handleSearchClick = async () => {
        featureDetailSo.fetchGithubRepo()
    }
    const handleCreateClick = async () => {
        featureDetailSo.createFunding()
    }


    // RENDER
    const { githubRepo, authorUser } = featureDetailSo.state;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                maxWidth: 800,
                margin: '0 auto',
                padding: 2
            }}
        >
            <GithubFinderCmp
                value={featureDetailSo.state.feature?.github ?? ''}
                onChange={handleGitHubChange}
                onSearch={handleSearchClick}
            />

            {githubRepo && <>

                <GithubRepoCmp githubRepo={githubRepo} />

                {!authorUser ? (
                    <Box>
                        ATTENZIONE utente non registrato non potrà ricevere il compeso se non si registra!
                        Contatta l'autore e dagli questo link per registrarsi
                        oppure manda un invito automatico alla sua email cliccando qui:
                    </Box>
                ) : (
                    <Box>{authorUser.name} è registrato!</Box>
                )}

            </>}

            <Elements stripe={stripePromise}>
                <StripePromise />
            </Elements>

            {/* <Button variant="contained" color="primary" 
                onClick={handleCreateClick}>
                SUBMIT
            </Button>
            <StripeCardCmp /> */}

        </Box>
    );
};

export default DetailPag;