import gitHubApi from '@/api/github';
import GithubUserViewer from '@/components/github/users/GithubUserViewer';
import GithubUsersDialog from '@/components/github/users/GithubUsersDialog';
import GithubUsersFinderDialog from '@/components/github/users/GithubUsersFinderDialog';
import { GitHubUser } from '@/types/github/GitHub';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';



interface Props {
    users?: GitHubUser[]
    githubOwnerId?: number
    onChange?: (owner: GitHubUser) => void
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubUserSelector: React.FC<Props> = ({
    users,
    githubOwnerId,
    onChange,
}) => {

    // HOOKS
    const [dialogOpen, setDialogOpen] = useState(false);
    const [owner, setOwner] = useState<GitHubUser>(null);

    useEffect(() => {
        setOwner(null)
        if (!githubOwnerId) return
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

        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>
                <GithubUserViewer user={owner} />
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleSelectUserClick}
                >
                    {users && users.length > 1 ? 'SELECT USER' : 'SELECT'}
                </Button>
            </CardActions>
        </Card>

        <GithubUsersFinderDialog
            isOpen={dialogOpen}
            onClose={handleUserDialogClose}
        />
        {/* <GithubUsersDialog
            isOpen={dialogOpen}
            users={users}
            onClose={handleUserDialogClose}
        /> */}

    </>
};

export default GithubUserSelector;
