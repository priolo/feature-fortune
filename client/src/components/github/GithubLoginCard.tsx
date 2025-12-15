import gitHubApi from '@/api/githubService';
import Card, { sxActionCard } from '@/components/Card';
import GithubUserViewer from '@/components/github/users/GithubUserViewer';
import authSo from '@/stores/auth';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import { GitHubUser } from '@/types/github/GitHub';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Button } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MessageCmp from '../MessageCmp';



interface Props {
}

/**
 * login and register new accout
 */
const GithubLoginCard: React.FC<Props> = ({
}) => {

    // STORES
    useStore(authSo)
    const { t } = useTranslation();
    const userId = authSo.state.user?.githubId

    // HOOKS
    const [user, setUser] = React.useState<GitHubUser>(null)
    useEffect(() => {
        if (!userId) {
            setUser(null)
            return
        }
        async function load() {
            const user = await gitHubApi.getUserById(userId)
            setUser(user)
        }
        load()
    }, [userId])

    // HANDLERS
    const handleLogin = async () => {
        await authSo.loginWithGithub()
    };
    const handleAttach = async () => {
        await authSo.attachGithub()
    }
    const handleDetach = async () => {
        const r = await dialogSo.dialogOpen({
            type: DIALOG_TYPE.WARNING,
            text: t('cards.GithubLoginCard.alerts.detach.check'),
            modal: true,
        })
        if (!r) return

        authSo.detachGithub()

        dialogSo.dialogOpen({
			text: t(`cards.GithubLoginCard.alerts.detach.succes`),
			type: DIALOG_TYPE.SUCCESS,
		})
    }


    // RENDER
    const logged = !!authSo.state.user;
    const haveGithub = !!authSo.state.user?.githubId
    const status = haveGithub ? 'done' : 'warn'

    return (
        <Card id="github-login-card"
            title={t(`cards.GithubLoginCard.title`)}
            icon={<GitHubIcon />}
        >
            <MessageCmp variant={status} title={t(`cards.GithubLoginCard.status.${status}.title`)} sx={{ mb: 1 }}>
                <Trans i18nKey={`cards.GithubLoginCard.status.${status}.desc`} />
            </MessageCmp>

            {!!haveGithub && (
                <GithubUserViewer user={user} />
            )}

            <Box sx={sxActionCard}>
                {!!logged && !haveGithub ? (
                    <Button
                        onClick={handleAttach}
                    >{t('cards.GithubLoginCard.actions.attach')}</Button>
                ) : !!logged && haveGithub ? (
                    <Button
                        onClick={handleDetach}
                    >{t('cards.GithubLoginCard.actions.detach')}</Button>
                ) : (
                    <Button
                        onClick={handleLogin}
                    >{t('cards.GithubLoginCard.actions.login')}</Button>
                )}
            </Box>

        </Card>
    );
};

export default GithubLoginCard;
