import fundingApi from '@/api/funding';
import authorRegisterSo from '@/stores/account/authorRegister';
import authSo from '@/stores/auth/repo';
import featureDetailSo from '@/stores/feature/detail';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';



interface UserCmpProps {
}

const AuthorRegisterPag: React.FC<UserCmpProps> = ({
}) => {

    // STORES
    useStore(authorRegisterSo)


    // HOOKS
    // useEffect(() => {
    //     async function loadCurrentUser() {
    //         try {
    //             const res = await authApi.currentGithub();
    //             const data = await res.json();
    //             setUser(data.user);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     loadCurrentUser()
    // }, [])

    useEffect(() => {
        if (!featureDetailSo.state.githubRepo) return
        featureDetailSo.fetchGithubUser()
    }, [featureDetailSo.state.githubRepo])

    // HANDLERS
    const handleGithubLogin = async () => {
        authSo.loginWithGithub()
    }

    const handleStripeRegister = async () => {
        const res = await fundingApi.stripeAuthorRegisterLink(authorRegisterSo.state.email)
        console.log(res)
        window.location.href = res.url
    }



    // RENDER
    const { githubRepo, authorUser } = featureDetailSo.state;

    return (
        <Stack direction="column" gap={1}>

            <Typography variant="h5" component="h1">
                Benvenuto Autore! Registrati per ricevere i compensi
            </Typography>

            <Card>
                <Typography variant="body1" component="p" padding={2}>
                    ACCESSO GITHUB
                </Typography>

                <Button variant="contained" onClick={handleGithubLogin}>
                    Accedi con GitHub
                </Button>

            </Card>

            <Card>
                <TextField variant="outlined" fullWidth 
                    label="Email per ricevere i compensi" 
                    value={authorRegisterSo.state.email} 
                    onChange={e => authorRegisterSo.setEmail(e.target.value)} 
                />

                <Button variant="contained" onClick={handleStripeRegister}>
                    Registrati con Stripe 
                </Button>

            </Card>

        </Stack>
    );
}

export default AuthorRegisterPag;