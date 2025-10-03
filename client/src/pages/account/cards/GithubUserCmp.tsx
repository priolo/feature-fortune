import gitHubApi from '@/api/github';
import authSo from '@/stores/auth/repo';
import { GitHubUser } from '@/types/github/GitHub';
import { 
    Avatar, 
    Button, 
    Typography, 
    Card, 
    CardContent, 
    CardActions, 
    Box,
    Chip,
    Link,
    IconButton
} from '@mui/material';
import { GitHub as GitHubIcon, Link as LinkIcon } from '@mui/icons-material';
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
    const handleDetachClick = () => {
        authSo.detachGithub()
    }

    // RENDER
    if (!user) {
        return <Typography variant="body1">Nessun utente GitHub associato.</Typography>
    }

    return (
        <Card 
            sx={{ 
                maxWidth: 400, 
                margin: 'auto',
                boxShadow: 3,
                borderRadius: 2,
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease-in-out'
                }
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
                        src={user.avatar_url}
                        alt={user.login}
                        sx={{ 
                            width: 80, 
                            height: 80,
                            border: '3px solid',
                            borderColor: 'primary.main'
                        }}
                    />
                    <Box flex={1}>
                        <Typography 
                            variant="h6" 
                            component="h2" 
                            fontWeight="bold"
                            color="primary"
                        >
                            {user.name || user.login}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                        >
                            <GitHubIcon fontSize="small" />
                            @{user.login}
                        </Typography>
                        {user.location && (
                            <Typography variant="body2" color="text.secondary">
                                📍 {user.location}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {user.bio && (
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 2, fontStyle: 'italic' }}
                    >
                        "{user.bio}"
                    </Typography>
                )}

                <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                    <Chip 
                        label={`${user.public_repos || 0} repos`} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                    />
                    <Chip 
                        label={`${user.followers || 0} followers`} 
                        size="small" 
                        color="secondary" 
                        variant="outlined" 
                    />
                    <Chip 
                        label={`${user.following || 0} following`} 
                        size="small" 
                        color="secondary" 
                        variant="outlined" 
                    />
                </Box>

                {user.html_url && (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary">
                            Profile:
                        </Typography>
                        <Link 
                            href={user.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 0.5,
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            <LinkIcon fontSize="small" />
                            View on GitHub
                        </Link>
                    </Box>
                )}
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                    Connected Account
                </Typography>
                <Button variant="contained" size="small"
                    onClick={handleDetachClick}
                >DETACH GITHUB</Button>
            </CardActions>
        </Card>
    )
}

export default GithubUserCmp;