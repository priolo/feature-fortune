
import Card, { sxActionCard } from '@/components/Card';
import authSo from '@/stores/auth';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button } from '@mui/material';
import { useStore } from '@priolo/jon';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MessageCmp from '../MessageCmp';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';



interface Props {
}

/**
 * login and register new accout
 */
const GoogleLoginCard: React.FC<Props> = ({
}) => {

    // STORES
    useStore(authSo)
    const { t } = useTranslation()

    // HOOKS

    // HANDLERS
    // hook chiamato da google per il successo
    const handleLoginSuccess = (response: CredentialResponse) => {
        authSo.loginWithGoogle(response.credential)
        dialogSo.dialogOpen({
			text: t(`cards.GoogleLoginCard.alerts.login.success`),
			type: DIALOG_TYPE.SUCCESS,
		})

    }
    // hook chiamato da google per il fallimento
    const handleLoginFailure = () => {
        dialogSo.dialogOpen({
			text: t(`cards.GoogleLoginCard.alerts.login.error`),
			type: DIALOG_TYPE.SUCCESS,
		})
    }
    const handleDetach = async () => {
        const r = await dialogSo.dialogOpen({
            type: DIALOG_TYPE.WARNING,
            text: t('cards.GoogleLoginCard.alerts.detach.check'),
            modal: true,
        })
        if (!r) return

        await authSo.detachGoogle()

        dialogSo.dialogOpen({
			text: t(`cards.GoogleLoginCard.alerts.detach.success`),
			type: DIALOG_TYPE.SUCCESS,
		})
    }

    // RENDER
    const logged = !!authSo.state.user;
    const haveGoogle = !!authSo.state.user?.googleEmail
    const status = haveGoogle ? 'done' : 'warn'

    return (
        <Card id="google-login-card"
            title={t(`cards.GoogleLoginCard.title`)}
            icon={<GoogleIcon color="primary" />}
        >

            <MessageCmp variant={status} title={t(`cards.GoogleLoginCard.status.${status}.title`)} sx={{ mb: 1 }}>
                <Trans i18nKey={`cards.GoogleLoginCard.status.${status}.desc`} />
            </MessageCmp>

            <Box sx={sxActionCard}>
                {!!logged && haveGoogle ? (
                    <Button
                        onClick={handleDetach}
                    >{t('cards.GoogleLoginCard.actions.detach')}</Button>
                ) : (
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                            theme="filled_black"
                            shape="circle"
                            text="signin"
                            size="medium"
                            type='standard'
                        />
                    </GoogleOAuthProvider>
                )}
            </Box>
        </Card>
    );
};

export default GoogleLoginCard;
