
import authSo from '@/stores/auth';
import { Box, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import EmailLoginCard from '../../components/email/EmailLoginCard';
import GoogleLoginCard from '../../components/google/GoogleLoginCard';
import GithubLoginCard from '../../components/github/GithubLoginCard';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { useNavigate } from 'react-router-dom';



interface Props {
}

/**
 * login and register new accout
 */
const LoginPag: React.FC<Props> = ({
}) => {

    // STORES
    useStore(authSo)

    // HOOKS
    const navigate = useNavigate()

    useEffect(() => {
        if ( !!authSo.state.user ) {
            navigate('/app/')
            return;
        }
        locationSo.setCurrent(LOCATION_PAGE.Login)
    }, [authSo.state.user])


    // HANDLERS

    // RENDER

    return (
        <Box sx={sxRoot}>

            <EmailLoginCard />

            <GoogleLoginCard />

            <GithubLoginCard />

        </Box>
    );
};

export default LoginPag;

const sxRoot: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    //alignItems: 'center',
    maxWidth: 800,
    margin: '0 auto',
    padding: 2
}