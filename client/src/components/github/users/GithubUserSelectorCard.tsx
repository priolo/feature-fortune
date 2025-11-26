import gitHubApi from '@/api/githubService';
import Card, { sxActionCard } from '@/components/Card';
import GithubUserViewer from '@/components/github/users/GithubUserViewer';
import GithubUsersFinderDialog from '@/components/github/users/GithubUsersFinderDialog';
import MessageCmp from '@/components/MessageCmp';
import { GitHubUser } from '@/types/github/GitHub';
import { GitHub } from '@mui/icons-material';
import { Box, Button, ListItemButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';



interface Props {
    githubOwnerId?: number
    readOnly?: boolean
    onChange?: (owner: GitHubUser) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubUserSelectorCard: React.FC<Props> = ({
    githubOwnerId,
    readOnly,
    onChange,
}) => {

    // STORES
    const { t } = useTranslation();

    // HOOKS
    const [dialogOpen, setDialogOpen] = useState(false);
    const [user, setUser] = useState<GitHubUser>(null);

    useEffect(() => {
        if (!githubOwnerId) {
            setUser(null)
            return
        }
        if (user?.id === githubOwnerId) return
        const load = async () => {
            const owner = await gitHubApi.getUserById(githubOwnerId)
            setUser(owner)
        }
        load();
    }, [githubOwnerId])


    // HANDLERS
    const handleSelectUserClick = () => {
        setDialogOpen(true)
    }
    const handleDialogClose = (user: GitHubUser) => {
        setDialogOpen(false)
        if (!user) return
        onChange?.(user)
    }
    const handleRemoveClick = () => {
        onChange?.(null)
    }


    // RENDER

    const isSelected = !!user;
    const status = isSelected
        ? { status: 'selected', variant: 'info' }
        : { status: 'none', variant: 'info' };

    return <>

        <Card id="github-user-card"
            title={t('cards.GithubUserSelectorCard.title')}
            icon={<GitHub />}
        >

            <MessageCmp
                variant={status.variant as any}
                title={t(`cards.GithubUserSelectorCard.status.${status.status}.title`)}
            >
                <Trans i18nKey={`cards.GithubUserSelectorCard.status.${status.status}.desc`} />
            </MessageCmp>

            <ListItemButton sx={{ borderRadius: 2, bgcolor: "background.input" }} 
                onClick={!readOnly ? handleSelectUserClick : undefined}
            >
                <GithubUserViewer user={user} />
            </ListItemButton>

            {!readOnly && <Box sx={sxActionCard}>
                {isSelected && (
                    <Button
                        onClick={handleRemoveClick}
                    >{t('cards.GithubUserSelectorCard.actions.remove')}</Button>
                )}
                <Button
                    onClick={handleSelectUserClick}
                >{isSelected ? t('cards.GithubUserSelectorCard.actions.change') : t('cards.GithubUserSelectorCard.actions.select')}</Button>
            </Box>}

        </Card>

        <GithubUsersFinderDialog
            isOpen={dialogOpen}
            onClose={handleDialogClose}
        />

    </>
};

export default GithubUserSelectorCard;
