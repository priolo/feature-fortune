import gitHubApi from '@/api/github';
import { GitHubUser } from '@/types/GitHub';
import { Avatar, Typography } from '@mui/material';
import React, { useEffect } from 'react';



interface GithubUserCmpProps {
    userId?: number
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const GithubUserCmp: React.FC<GithubUserCmpProps> = ({
    userId
}) => {

    // HOOKS
    const [user, setUser] = React.useState<GitHubUser>(null)

    useEffect(() => {
        if (!userId) return
        async function load()  {
            const user = await gitHubApi.getUserById(userId)
            setUser(user)
        }
        load()
    }, [userId])

    // HANDLERS

    // RENDER
    if (!user) {
        return <Typography variant="body1">Nessun utente GitHub associato.</Typography>
    }

    return (
        <Avatar
            src={user.avatar_url}
            alt={user.login}
            sx={{ width: 64, height: 64 }}
        />
    )
}

export default GithubUserCmp;