import Framework from '@/layout/Framework';
import authSo, { stripePromise } from '@/stores/auth/repo';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { useStore } from '@priolo/jon';
import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import EmailLoginCard from '../../components/email/EmailLoginCard';
import GithubLoginCard from '../../components/github/GithubLoginCard';
import GoogleLoginCard from '../../components/google/GoogleLoginCard';
import StripeAuthorCard from '../../components/stripe/StripeAuthorCard';
import StripeCreditCard from '../../components/stripe/StripeCreditCard';
import SettingsCard from './SettingsCard';
import OverviewCmp from './OverviewCmp';
import AccountRightMenu from './AccountRightMenu';



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


    // RENDER
    if (!authSo.state.user) {
        return <div style={{ display: 'flex', flexDirection: "column", gap: 10, alignItems: 'center' }}>
            NULL
        </div>
    }

    return <Framework sx={{ py: 2 }}
        leftRender={<OverviewCmp sx={{mr: 4, ml: 'auto', pt: 2,maxWidth: 300}} />}
        rightRender={<AccountRightMenu />}
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
