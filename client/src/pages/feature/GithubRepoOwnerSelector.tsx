import gitHubApi from '@/api/github';
import GithubRepoViewer from '@/components/github/repos/GithubRepoViewer';
import GithubReposFinderDialog from '@/components/github/repos/GithubReposFinderDialog';
import GithubUserViewer from '@/components/github/users/GithubUserViewer';
import GithubUsersDialog from '@/components/github/users/GithubUsersDialog';
import featureDetailSo from '@/stores/feature/detail';
import { GitHubRepository, GitHubUser } from '@/types/github/GitHub';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';



interface Props {
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubRepoOwnerSelector: React.FC<Props> = ({
}) => {

    // STORES
    useStore(featureDetailSo)

    // HOOKS
    const [repoDialogOpen, setRepoDialogOpen] = useState(false);
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [users, setUsers] = useState<GitHubUser[]>(null);

    useEffect(() => {

    },[])


    // HANDLERS
    const handleFindRepoClick = () => {
        setRepoDialogOpen(true)
    }
    const handleRepoDialogClose = async (repo: GitHubRepository) => {
        setRepoDialogOpen(false)
        featureDetailSo.setGithubRepo(repo)
        if (!repo) {
            setUsers(null)
            featureDetailSo.setGithubOwner(null)
            return
        }

        if (repo.owner.type === 'User') {
            setUsers([repo.owner])
            featureDetailSo.setGithubOwner(repo.owner)

        } else if (repo.owner.type === 'Organization') {
            const result = await gitHubApi.getContributors(repo.owner.login, repo.name)
            setUsers(result)
            featureDetailSo.setGithubOwner(null)
        }
    }

    const handleSelectUserClick = () => {
        if (users && users.length === 1) {
            // If there's only one user, select it automatically
            featureDetailSo.setGithubOwner(users[0])
        } else {
            setUserDialogOpen(true)
        }
    }

    const handleUserDialogClose = async (user: GitHubUser) => {
        setUserDialogOpen(false)
        featureDetailSo.setGithubOwner(user)
        featureDetailSo.fetchOwner()
    }


    // RENDER
    const githubRepo = featureDetailSo.state.githubRepo
    const githubOwner = featureDetailSo.state.githubOwner
    const owner = featureDetailSo.state.owner

    return <>

        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>
                {!!githubRepo ? (
                    <GithubRepoViewer repository={githubRepo} />
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No GitHub repository selected
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleFindRepoClick}
                >
                    {!!githubRepo ? 'CHANGE REPOSITORY' : 'SELECT REPOSITORY'}
                </Button>
            </CardActions>
        </Card>


        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>
                {!!githubOwner ? (
                    <GithubUserViewer user={githubOwner} />
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No GitHub user selected
                    </Typography>
                )}
                {!!owner ? (
                    <Typography variant="body2" color="text.secondary">
                        c'e' un account collegato: {owner.name ?? owner.email ?? owner.googleEmail}
                    </Typography>
                    
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        non c'e nessunaccount collegato
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleSelectUserClick}
                    disabled={!users || users.length === 0}
                >
                    {users && users.length > 1 ? 'SELECT USER' : 'SELECT'}
                </Button>
            </CardActions>
        </Card>






        <GithubReposFinderDialog
            isOpen={repoDialogOpen}
            onClose={handleRepoDialogClose}
        />

        <GithubUsersDialog
            isOpen={userDialogOpen}
            users={users}
            onClose={handleUserDialogClose}
        />

    </>
};

export default GithubRepoOwnerSelector;
