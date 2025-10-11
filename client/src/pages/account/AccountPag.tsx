import authSo, { stripePromise } from '@/stores/auth/repo';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Box, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailLoginCmp from '../../components/email/EmailLoginCmp';
import GoogleLoginCmp from '../../components/google/GoogleLoginCmp';
import GithubLoginCmp from '../login/GithubLoginCmp';
import StripeAuthorCard from './cards/StripeAuthorCard';
import StripeCreditCardCmp from './cards/StripeCreditCardCmp';



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
    const navigate = useNavigate()
    useEffect(() => {
        if (!authSo.state.user) {
            navigate('/app/')
            return;
        }
        locationSo.setCurrent(LOCATION_PAGE.Account)
    }, [])


    // HANDLERS
    
    
    // RENDER
    if (!authSo.state.user) {
        return <div style={{ display: 'flex', flexDirection: "column", gap: 10, alignItems: 'center' }}>
            NULL
        </div>
    }

    return (
        <Box sx={sxRoot}>

            {/* EMAIL ZONE */}
            <EmailLoginCmp />

            {/* GOOGLE ZONE */}
            <GoogleLoginCmp />

            {/* GITHUB ZONE */}
            <GithubLoginCmp />

            {/* STRIPE CUSTOMER ZONE */}
            <Elements stripe={stripePromise}>
                <StripeCreditCardCmp />
            </Elements>

            {/* STRIPE AUTHOR ZONE */}
            <StripeAuthorCard />

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