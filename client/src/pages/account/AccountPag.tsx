import Framework from '@/layout/Framework';
import authSo, { stripePromise } from '@/stores/auth/repo';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { useStore } from '@priolo/jon';
import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import EmailLoginCard from '../../components/email/EmailLoginCard';
import GithubLoginCard from '../../components/github/GithubLoginCard';
import GoogleLoginCard from '../../components/google/GoogleLoginCard';
import StripeAuthorCard from '../../components/stripe/StripeAuthorCard';
import StripeCreditCard from '../../components/stripe/StripeCreditCard';
import SettingsCard from './SettingsCard';
import AccountInfoSide from './AccountInfoSide';



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
    useEffect(() => {
        locationSo.setCurrent(LOCATION_PAGE.Account)
    }, [])

    useEffect(() => {
        authSo.setUserInEdit({ ...authSo.state.user })
        return () => {
            authSo.setUserInEdit(null)
        }
    }, [authSo.state.user])


    // HANDLERS
    const scrollToCard = (cardId: string) => {
        const element = document.getElementById(cardId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }


    // RENDER
    if (!authSo.state.user) {
        return <div style={{ display: 'flex', flexDirection: "column", gap: 10, alignItems: 'center' }}>
            NULL
        </div>
    }

    return <Framework sx={{ py: 2 }}
        leftRender={<AccountInfoSide />}
        rightRender={
            <Box sx={{ position: 'sticky', top: 20, pt: 2 }}>
                <List dense>
                    <ListItemButton onClick={() => scrollToCard('settings-card')}>
                        <ListItemText primary="Settings" secondary="General account settings" />
                    </ListItemButton>
                    <ListItemButton onClick={() => scrollToCard('email-login-card')}>
                        <ListItemText primary="Email" secondary="Manage email login" />
                    </ListItemButton>
                    <ListItemButton onClick={() => scrollToCard('google-login-card')}>
                        <ListItemText primary="Google" secondary="Link Google account" />
                    </ListItemButton>
                    <ListItemButton onClick={() => scrollToCard('github-login-card')}>
                        <ListItemText primary="GitHub" secondary="Link GitHub account" />
                    </ListItemButton>
                    <ListItemButton onClick={() => scrollToCard('stripe-credit-card')}>
                        <ListItemText primary="Credit Card" secondary="Manage payment methods" />
                    </ListItemButton>
                    <ListItemButton onClick={() => scrollToCard('stripe-author-card')}>
                        <ListItemText primary="Stripe Author" secondary="Manage payout details" />
                    </ListItemButton>
                </List>
            </Box>
        }
    >

        <SettingsCard />

        {/* EMAIL ZONE */}
        <EmailLoginCard />

        {/* GOOGLE ZONE */}
        <GoogleLoginCard />

        {/* GITHUB ZONE */}
        <GithubLoginCard />

        {/* STRIPE CUSTOMER ZONE */}
        <Elements stripe={stripePromise}>
            <StripeCreditCard />
        </Elements>

        {/* STRIPE AUTHOR ZONE */}
        <StripeAuthorCard />



    </Framework>
}

export default AccountPag;
