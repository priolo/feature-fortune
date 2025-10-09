import gitHubApi from '@/api/github';
import GithubRepoViewer from '@/components/github/repos/GithubRepoViewer';
import GithubReposFinderDialog from '@/components/github/repos/GithubReposFinderDialog';
import { GitHubRepository } from '@/types/github/GitHub';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';



interface Props {
    githubRepoId?: number
    onChange?: (repo: GitHubRepository) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubRepoSelector: React.FC<Props> = ({
    githubRepoId,
    onChange,
}) => {


    // HOOKS
    const [dialogOpen, setDialogOpen] = useState(false);
    const [repo, setRepo] = useState<GitHubRepository>(null);

    useEffect(() => {
        setRepo(null)
        if (!githubRepoId) return
        const load = async () => {
            const repo = await gitHubApi.getRepository(githubRepoId)
            setRepo(repo)
        }
        load();
    }, [githubRepoId])


    // HANDLERS
    const handleFindRepoClick = () => {
        setDialogOpen(true)
    }
    const handleRepoDialogClose = async (repo: GitHubRepository) => {
        setDialogOpen(false)
        setRepo(repo)
        onChange?.(repo)
    }


    // RENDER

    return <>

        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>
                <GithubRepoViewer repository={repo} />
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleFindRepoClick}
                >
                    {!!repo ? 'CHANGE REPOSITORY' : 'SELECT REPOSITORY'}
                </Button>
            </CardActions>
        </Card>


        <GithubReposFinderDialog
            isOpen={dialogOpen}
            onClose={handleRepoDialogClose}
        />

    </>
};

export default GithubRepoSelector;
