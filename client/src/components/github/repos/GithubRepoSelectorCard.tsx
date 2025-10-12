import gitHubApi from '@/api/githubService';
import Card, { sxActionCard } from '@/components/Card';
import GithubRepoViewer from '@/components/github/repos/GithubRepoViewer';
import GithubReposFinderDialog from '@/components/github/repos/GithubReposFinderDialog';
import { GitHubRepository } from '@/types/github/GitHub';
import { AccessAlarm } from '@mui/icons-material';
import { Box, Button,  CardActions, CardContent, SxProps, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';



interface Props {
    githubRepoId?: number
    onChange?: (repo: GitHubRepository) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubRepoSelectorCard: React.FC<Props> = ({
    githubRepoId,
    onChange,
}) => {


    // HOOKS
    const [dialogOpen, setDialogOpen] = useState(false);
    const [repo, setRepo] = useState<GitHubRepository>(null);

    useEffect(() => {
        if (!githubRepoId) {
			setRepo(null)
			return
		}
		if ( repo?.id === githubRepoId ) return
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

        <Card
            title="GithubRepository"
            icon={<AccessAlarm color="primary" />}
        >
            <Typography variant="body2" color="text.secondary">
                Select the repository to use for this feature
            </Typography>

            <GithubRepoViewer repository={repo} />

            <Box sx={sxActionCard}>
                <Button
                    onClick={handleFindRepoClick}
                >
                    {!!repo ? 'CHANGE REPOSITORY' : 'SELECT REPOSITORY'}
                </Button>
            </Box>
        </Card>

        <GithubReposFinderDialog
            isOpen={dialogOpen}
            onClose={handleRepoDialogClose}
        />

    </>
};

export default GithubRepoSelectorCard;
