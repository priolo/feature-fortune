import gitHubApi from '@/api/githubService';
import Card, { sxActionCard } from '@/components/Card';
import GithubRepoViewer from '@/components/github/repos/GithubRepoViewer';
import GithubReposFinderDialog from '@/components/github/repos/GithubReposFinderDialog';
import MessageCmp from '@/components/MessageCmp';
import { GitHubRepository } from '@/types/github/GitHub';
import { GitHub } from '@mui/icons-material';
import { Box, Button, CircularProgress, ListItemButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';



interface Props {
    githubRepoId?: number
    readOnly?: boolean
    onChange?: (repo: GitHubRepository) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubRepoSelectorCard: React.FC<Props> = ({
    githubRepoId,
    readOnly,
    onChange,
}) => {

    // HOOKS
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [repo, setRepo] = useState<GitHubRepository>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!githubRepoId) {
            setRepo(null)
            return
        }
        if (repo?.id === githubRepoId) return
        const load = async () => {
            setIsLoading(true)
            try {
                const repo = await gitHubApi.getRepository(githubRepoId)
                setRepo(repo)
            } finally {
                setIsLoading(false)
            }
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
    const isSelected = !!githubRepoId;
    const status = isSelected
        ? { status: 'selected', variant: 'done' }
        : { status: 'none', variant: 'warn' };

    return <>

        <Card id="github-repo-selector-card"
            title={t('cards.GithubRepoSelectorCard.title')}
            icon={<GitHub />}
        >

            <MessageCmp
                variant={status.variant as any}
                title={t(`cards.GithubRepoSelectorCard.status.${status.status}.title`)}
            >
                <Trans i18nKey={`cards.GithubRepoSelectorCard.status.${status.status}.desc`} />
            </MessageCmp>


            <ListItemButton sx={{ borderRadius: 2, bgcolor: "background.input", justifyContent: 'center', p:2 }}
                onClick={!readOnly ? handleFindRepoClick : undefined}
            >
                {isLoading
                    ? <CircularProgress sx={{ m: 1 }} />
                    : <GithubRepoViewer repository={repo} />
                }
            </ListItemButton>

            {!readOnly && (
                <Box sx={sxActionCard}>
                    {isSelected && (
                        <Button
                            onClick={handleRemoveClick}
                        >{t('cards.GithubRepoSelectorCard.actions.remove')}</Button>
                    )}
                    <Button
                        onClick={handleFindRepoClick}
                    >
                        {isSelected ? t('cards.GithubRepoSelectorCard.actions.change') : t('cards.GithubRepoSelectorCard.actions.select')}
                    </Button>
                </Box>
            )}

        </Card>

        <GithubReposFinderDialog
            isOpen={dialogOpen}
            onClose={handleRepoDialogClose}
        />

    </>
};

export default GithubRepoSelectorCard;