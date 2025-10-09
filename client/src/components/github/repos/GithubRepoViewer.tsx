import { GitHubRepository } from '@/types/github/GitHub';
import { Avatar, Box, Chip, Link, Typography } from '@mui/material';
import React from 'react';



interface Props {
    repository: GitHubRepository;
}

const GithubRepoViewer: React.FC<Props> = ({
    repository
}) => {

    // RENDER

    if (!repository) return <Typography variant="body2" color="text.secondary">
        void
    </Typography>

    return (
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
    )
};

export default GithubRepoViewer;