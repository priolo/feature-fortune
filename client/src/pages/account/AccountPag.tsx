import Framework from '@/layout/Framework';
import authSo, { stripePromise } from '@/stores/auth';
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
import AccountOverview from './Overview';
import AccountRightMenu from './RightMenu';



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
    if (!authSo.state.user) return null

    return <Framework sx={{ py: 2 }}
        leftRender={<AccountOverview />}
        rightRender={<AccountRightMenu />}
    >

        <SettingsCard />

        <EmailLoginCard />

        <GoogleLoginCard />

        <GithubLoginCard />

        <Elements stripe={stripePromise}>
            <StripeCreditCard />
        </Elements>

        <StripeAuthorCard />

    </Framework>
}

export default AccountPag;
