import { GitHubUser } from '@/types/GitHub';
import { Box, Card, CardContent, Link, Typography } from '@mui/material';
import React from 'react';



interface GithubUserCmpProps {
    user: GitHubUser;
}

const GithubUserCmp: React.FC<GithubUserCmpProps> = ({
    user
}) => {



    // RENDER

    if (!user) return null

    return (
        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>

                <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Repository Owner Details
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box>
                            <Typography variant="body2" component="span" fontWeight="bold">
                                Username:
                            </Typography>
                            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                <Link
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {user.login}
                                </Link>
                            </Typography>
                        </Box>

                        {user.name && (
                            <Box>
                                <Typography variant="body2" component="span" fontWeight="bold">
                                    Name:
                                </Typography>
                                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    {user.name}
                                </Typography>
                            </Box>
                        )}

                        {user.email && (
                            <Box>
                                <Typography variant="body2" component="span" fontWeight="bold">
                                    Email:
                                </Typography>
                                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    <Link href={`mailto:${user.email}`}>
                                        {user.email}
                                    </Link>
                                </Typography>
                            </Box>
                        )}

                        {user.company && (
                            <Box>
                                <Typography variant="body2" component="span" fontWeight="bold">
                                    Company:
                                </Typography>
                                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    {user.company}
                                </Typography>
                            </Box>
                        )}

                        {user.location && (
                            <Box>
                                <Typography variant="body2" component="span" fontWeight="bold">
                                    Location:
                                </Typography>
                                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    {user.location}
                                </Typography>
                            </Box>
                        )}

                        {user.blog && (
                            <Box>
                                <Typography variant="body2" component="span" fontWeight="bold">
                                    Website:
                                </Typography>
                                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    <Link
                                        href={user.blog.startsWith('http')
                                            ? user.blog
                                            : `https://${user.blog}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {user.blog}
                                    </Link>
                                </Typography>
                            </Box>
                        )}

                        {user.bio && (
                            <Box>
                                <Typography variant="body2" component="span" fontWeight="bold">
                                    Bio:
                                </Typography>
                                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    {user.bio}
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Typography variant="body2">
                                <strong>Repositories:</strong> {user.public_repos}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Followers:</strong> {user.followers}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Following:</strong> {user.following}
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                            <strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
};

export default GithubUserCmp;