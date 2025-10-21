import gitHubApi from '@/api/githubService';
import Card, { sxActionCard } from '@/components/Card';
import GithubRepoViewer from '@/components/github/repos/GithubRepoViewer';
import GithubReposFinderDialog from '@/components/github/repos/GithubReposFinderDialog';
import { GitHubRepository } from '@/types/github/GitHub';
import { AccessAlarm, CheckCircleOutline, GitHub } from '@mui/icons-material';
import { Box, Button, SxProps, Typography } from '@mui/material';
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
        if (repo?.id === githubRepoId) return
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
        if (!repo) return;
        onChange?.(repo)
    }
    const handleRemoveClick = () => {
        onChange?.(null)
    }


    // RENDER
    const isSelected = !!repo;

    return <>

        <Card
            title="GITHUB REPOSITORY"
            icon={<GitHub />}
        >

            <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
                {isSelected
                    ? <span>
                        <CheckCircleOutline color="success" sx={sxIcon} />Questo è il repo su cui si chiede la feature.
                    </span>
                    : <span>
                        Seleziona un repository GitHub su cui si vuole la feature.
                    </span>
                }
            </Typography>

            <GithubRepoViewer repository={repo} />

            <Box sx={sxActionCard}>
                {isSelected && (
                    <Button
                        onClick={handleRemoveClick}
                    >REMOVE</Button>
                )}
                <Button
                    onClick={handleFindRepoClick}
                >
                    {isSelected ? 'CHANGE' : 'SELECT'}
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

const sxIcon: SxProps = {
    fontSize: '1.4em',
    verticalAlign: 'text-bottom',
    ml: "2px",
    mr: "6px",
}