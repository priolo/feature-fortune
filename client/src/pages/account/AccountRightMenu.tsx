import React from 'react';
import PageMenu from '../../components/PageMenu';
import authSo from '@/stores/auth/repo';
import { useStore } from '@priolo/jon';



interface Props {
}

const AccountRightMenu: React.FC<Props> = ({
}) => {

    // STORES
    useStore(authSo)


    // RENDER
    const user = authSo.state.user
    if (!user) return null

    return <PageMenu items={[
        {
            id: 'settings-card',
            label: 'Settings',
            subLabel: 'General account settings',
        },
        {
            id: 'email-login-card',
            label: 'Email',
            subLabel: 'Manage email login',
            warnIcon: !user.email,
        },
        {
            id: 'google-login-card',
            label: 'Google',
            subLabel: 'Link Google account',
            warnIcon: !user.googleEmail,
        },
        {
            id: 'github-login-card',
            label: 'GitHub',
            subLabel: 'Link GitHub account',
            warnIcon: !user.githubId,
        },
        {
            id: 'stripe-credit-card',
            label: 'Credit Card',
            subLabel: 'Manage payment methods',
            warnIcon: !user.stripeHaveCard,
        },
        {
            id: 'stripe-author-card',
            label: 'Stripe Author',
            subLabel: 'Manage payout details',
            warnIcon: !user.stripeAccountId,
        },
    ]} />;
};

export default AccountRightMenu;
