import gitHubApi from '@/api/github';
import Card from '@/components/Card';
import GithubUserViewer from '@/components/github/users/GithubUserViewer';
import authSo from '@/stores/auth/repo';
import { GitHubUser } from '@/types/github/GitHub';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Button, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';



interface Props {
}

/**
 * login and register new accout
 */
const GithubLoginCmp: React.FC<Props> = ({
}) => {

    // STORES
    useStore(authSo)
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
    const handleLogin = () => {
        authSo.loginWithGithub()
    };
    const handleAttach = async () => {
        authSo.attachGithub()
    }
    const handleDetach = async () => {
        authSo.detachGithub()
    }


    // RENDER
    const logged = !!authSo.state.user;
    const haveGithub = !!authSo.state.user?.githubId

    return (
        <Card
            title="GitHub access"
            icon={<GitHubIcon color="primary" />}
        >
            {!!haveGithub && (
                <GithubUserViewer user={user} />
            )}

            <Typography variant="body2" color="text.secondary">
                Autenticati con GitHub per collegare rapidamente i tuoi repository e le tue richieste.
            </Typography>

            <Box sx={sxActions}>
                {!!logged && !haveGithub ? (
                    <Button
                        onClick={handleAttach}
                    >ATTACH</Button>
                ) : !!logged && haveGithub ? (
                    <Button
                        onClick={handleDetach}
                    >DETACH</Button>
                ) : (
                    <Button
                        onClick={handleLogin}
                    >ACCEDI</Button>
                )}
            </Box>

        </Card>
    );
};

export default GithubLoginCmp;

const sxActions: SxProps = {
    display: 'flex',
    justifyContent: 'end',
    paddingTop: 1,
};
