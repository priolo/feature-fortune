import gitHubApi from '@/api/githubService';
import Card, { sxActionCard } from '@/components/Card';
import GithubUserViewer from '@/components/github/users/GithubUserViewer';
import GithubUsersFinderDialog from '@/components/github/users/GithubUsersFinderDialog';
import { GitHubUser } from '@/types/github/GitHub';
import { GitHub, InfoOutline } from '@mui/icons-material';
import { Box, Button, SxProps, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';



interface Props {
    githubOwnerId?: number
    onChange?: (owner: GitHubUser) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubUserSelectorCard: React.FC<Props> = ({
    githubOwnerId,
    onChange,
}) => {

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

    return <>

        <Card
            title="GITHUB USER"
            icon={<GitHub />}
        >

            <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
                {isSelected
                    ? <span>
                        <InfoOutline color="primary" sx={sxIcon} />
                        Questo è solo un segnaposto dell'utente Github collegato al feature.
                        Chi dovrà occuparsi di implementare la feature è il <strong>DEVELOPER</strong>.
                    </span>
                    : <span>
                        Facoltativo: seleziona un utente GitHub collegato al feature.
                    </span>
                }

            </Typography>

            <GithubUserViewer user={user} />

            <Box sx={sxActionCard}>
                {isSelected && (
                    <Button
                        onClick={handleRemoveClick}
                    >REMOVE</Button>
                )}
                <Button
                    onClick={handleSelectUserClick}
                >{isSelected ? 'CHANGE' : 'SELECT'}</Button>
            </Box>

        </Card>

        <GithubUsersFinderDialog
            isOpen={dialogOpen}
            onClose={handleDialogClose}
        />

    </>
};

export default GithubUserSelectorCard;

const sxIcon: SxProps = {
    fontSize: '1.4em',
    verticalAlign: 'text-bottom',
    ml: "2px",
    mr: "6px",
}