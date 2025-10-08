
import authSo from '@/stores/auth/repo';
import { Box, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import EmailLoginCmp from './EmailLoginCmp';
import GoogleLoginCmp from './GoogleLoginCmp';
import GithubLoginCmp from './GithubLoginCmp';



interface Props {
}

/**
 * login and register new accout
 */
const LoginPag: React.FC<Props> = ({
}) => {

    // STORES

    // HOOKS

    // HANDLERS

    // RENDER

    return (
        <Box sx={sxRoot}>

            <EmailLoginCmp />

            <GoogleLoginCmp />

            <GithubLoginCmp />

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