import { GitHubRepository } from '@/types/GitHub';
import { Avatar, Box, Card, CardContent, Chip, Link, Typography } from '@mui/material';
import React from 'react';



interface GithubRepoCmpProps {
    repository: GitHubRepository;
}

const GithubRepoCmp: React.FC<GithubRepoCmpProps> = ({
    repository
}) => {



    // RENDER

    if (!repository) return null

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                <Avatar
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                    sx={{ width: 64, height: 64 }}
                />
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="h2">
                        <Link
                            href={repository.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            underline="hover"
                        >
                            {repository.full_name}
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {repository.description || 'No description available'}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                        {repository.language && (
                            <Chip label={repository.language} size="small" color="primary" />
                        )}
                        <Chip label={`⭐ ${repository.stargazers_count}`} size="small" />
                        <Chip label={`🍴 ${repository.forks_count}`} size="small" />
                        <Chip label={`👁️ ${repository.watchers_count}`} size="small" />
                    </Box>
                    {repository.topics && repository.topics.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {repository.topics.slice(0, 10).map((topic, index) => (
                                <Chip key={index} label={topic} size="small" variant="outlined" />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>

            <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    <strong>Repository Details:</strong>
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                    <Typography variant="body2">
                        Created: {new Date(repository.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                        Updated: {new Date(repository.updated_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                        Size: {(repository.size / 1024).toFixed(1)} MB
                    </Typography>
                    {repository.license && (
                        <Typography variant="body2">
                            License: {repository.license.name}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
};

export default GithubRepoCmp;