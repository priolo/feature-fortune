import gitHubApi from '@/api/github';
import GithubRepoCmp from '@/components/github/GithubRepoCmp';
import GithubReposDialog from '@/components/github/GithubReposDialog';
import GithubUserCmp from '@/components/github/GithubUserCmp';
import GithubUsersDialog from '@/components/github/GithubUsersDialog';
import featureDetailSo from '@/stores/feature/detail';
import { GitHubRepository, GitHubUser } from '@/types/github/GitHub';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useState } from 'react';



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
    const [repo, setRepo] = useState<GitHubRepository>(null);
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [users, setUsers] = useState<GitHubUser[]>(null);
    const [user, setUser] = useState<GitHubUser>(null);


    // HANDLERS
    const handleFindRepoClick = () => {
        setRepoDialogOpen(true)
    }
    const handleRepoDialogClose = async (repo: GitHubRepository) => {
        setRepoDialogOpen(false)
        setRepo(repo)
        if (!repo) {
            setUsers(null)
            setUser(null)
            return
        }

        if (repo.owner.type === 'User') {
            setUsers([repo.owner])
            setUser(repo.owner)

        } else if (repo.owner.type === 'Organization') {
            const result = await gitHubApi.getContributors(repo.owner.login, repo.name)
            setUsers(result)
            setUser(null)
        }


        //featureDetailSo.setGithubRepo(repo)
        // featureDetailSo.fetchGithubOwner()
        // featureDetailSo.setFeature({
        //     ...featureDetailSo.state.feature,
        //     githubRepoId: repo.id
        // })
    }

    const handleSelectUserClick = () => {
        if (users && users.length === 1) {
            // If there's only one user, select it automatically
            setUser(users[0])
        } else {
            setUserDialogOpen(true)
        }
    }

    const handleUserDialogClose = async (user: GitHubUser) => {
        setUserDialogOpen(false)
        setUser(user)
        if (!user) return
    }


    // RENDER
    // const githubRepo = featureDetailSo.state.githubRepo
    // const githubOwner = featureDetailSo.state.githubOwner

    return <>

        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>
                {repo ? (
                    <GithubRepoCmp repository={repo} />
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
                    {repo ? 'CHANGE REPOSITORY' : 'SELECT REPOSITORY'}
                </Button>
            </CardActions>
        </Card>


        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>
                {user ? (
                    <GithubUserCmp user={user} />
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No GitHub user selected
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






        <GithubReposDialog
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
