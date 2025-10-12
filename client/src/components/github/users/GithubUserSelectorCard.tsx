import gitHubApi from '@/api/githubService';
import Card, { sxActionCard } from '@/components/Card';
import GithubUserViewer from '@/components/github/users/GithubUserViewer';
import GithubUsersFinderDialog from '@/components/github/users/GithubUsersFinderDialog';
import { GitHubUser } from '@/types/github/GitHub';
import { GitHub } from '@mui/icons-material';
import { Box, Button, Typography  } from '@mui/material';
import React, { useEffect, useState } from 'react';



interface Props {
    users?: GitHubUser[]
    githubOwnerId?: number
    onChange?: (owner: GitHubUser) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubUserSelectorCard: React.FC<Props> = ({
    users,
    githubOwnerId,
    onChange,
}) => {

    // HOOKS
    const [dialogOpen, setDialogOpen] = useState(false);
    const [owner, setOwner] = useState<GitHubUser>(null);

    useEffect(() => {
        if (!githubOwnerId) {
			setOwner(null)
			return
		}
		if ( owner?.id === githubOwnerId ) return
        const load = async () => {
            const owner = await gitHubApi.getUserById(githubOwnerId)
            setOwner(owner)
        }
        load();
    },[githubOwnerId])


    // HANDLERS
    const handleSelectUserClick = () => {
        setDialogOpen(true)
    }
    const handleUserDialogClose = async (user: GitHubUser) => {
        setDialogOpen(false)
        setOwner(user)
        onChange?.(user)
    }


    // RENDER
    return <>

        <Card 
            title="GitHub User"
            icon={<GitHub />}
        >

            <Typography variant="body2" color="text.secondary">
                Select the GitHub user to be used as the owner of the repositories.
            </Typography>
            
            <GithubUserViewer user={owner} />
            
            <Box sx={sxActionCard}>
                <Button
                    onClick={handleSelectUserClick}
                >
                    {users && users.length > 1 ? 'SELECT USER' : 'SELECT'}
                </Button>
            </Box>

        </Card>

        <GithubUsersFinderDialog
            isOpen={dialogOpen}
            onClose={handleUserDialogClose}
        />
        
    </>
};

export default GithubUserSelectorCard;
