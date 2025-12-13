import React from 'react';
import PageMenu from '../../components/PageMenu';
import authSo from '@/stores/auth';
import { useStore } from '@priolo/jon';
import { useTranslation } from 'react-i18next';
import { useTransComponents } from '../useTransComponents';



interface Props {
}

const AccountRightMenu: React.FC<Props> = ({
}) => {

    // STORES
    useStore(authSo)

    // HOOKS
    const { t } = useTranslation()
    const TransCmps = useTransComponents()

    // RENDER
    const user = authSo.state.user
    if (!user) return null

    return <PageMenu items={[
        {
            id: 'settings-card',
            label: t('cards.SettingsCard.title'),
            subLabel: 'General account settings',
        },
        {
            id: 'email-login-card',
            label: t(`cards.EmailLoginCard.title`),
            subLabel: user.email ?? t("common.disabled"),
            warnIcon: !user.emailVerified,
        },
        {
            id: 'google-login-card',
            label: t(`cards.GoogleLoginCard.title`),
            subLabel: user.googleEmail ?? t("common.disabled"),
            warnIcon: !user.googleEmail,
        },
        {
            id: 'github-login-card',
            label: t(`cards.GithubLoginCard.title`),
            subLabel: user.githubName ?? t("common.disabled"),
            warnIcon: !user.githubId,
        },
        {
            id: 'stripe-credit-card',
            label: t(`cards.StripeCreditCard.title`),
            subLabel: user.stripeHaveCard ? t("common.enabled") : t("common.disabled"),
            warnIcon: !user.stripeHaveCard,
        },
        {
            id: 'stripe-author-card',
            label: t('cards.StripeAuthorCard.title'),
            subLabel: user.stripeAccountId ? t("common.enabled") : t("common.disabled"),
            warnIcon: !user.stripeAccountId,
        },
    ]} />;
};

export default AccountRightMenu;
