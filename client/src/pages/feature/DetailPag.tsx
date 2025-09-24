import GithubRepoCmp from '@/pages/feature/cards/GithubRepoCmp';
import featureDetailSo, { stripePromise } from '@/stores/feature/detail';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import StripePromise from './cards/StripePromiseCmp';
import StripeCardCmp from './cards/StripeCardCmp';
import { Elements } from '@stripe/react-stripe-js';

interface UserCmpProps {
}

const DetailPag: React.FC<UserCmpProps> = ({
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
            <Typography variant="h5" component="h1">
                GitHub Repository Search
            </Typography>

            <Box sx={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                    label="GitHub Repository (name or URL)"
                    variant="outlined"
                    fullWidth
                    placeholder="e.g., facebook/react or https://github.com/facebook/react"
                    value={featureDetailSo.state.feature?.github ?? ''}
                    onChange={handleGitHubChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearchClick}
                    sx={{ minWidth: 120 }}
                >
                    'SEARCH'
                </Button>
            </Box>

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