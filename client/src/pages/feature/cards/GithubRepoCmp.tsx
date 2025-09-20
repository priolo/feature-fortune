import { GitHubRepositoryDetails } from '@/types/GitHub';
import { Avatar, Box, Card, CardContent, Chip, Link, Typography } from '@mui/material';
import React from 'react';

interface GithubRepoCmpProps {
    githubRepo: GitHubRepositoryDetails;
}

const GithubRepoCmp: React.FC<GithubRepoCmpProps> = ({
    githubRepo
}) => {

    // RENDER
    return (
        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Avatar 
                        src={githubRepo.owner.avatar_url} 
                        alt={githubRepo.owner.login}
                        sx={{ width: 64, height: 64 }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" component="h2">
                            <Link 
                                href={githubRepo.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                color="inherit"
                                underline="hover"
                            >
                                {githubRepo.full_name}
                            </Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {githubRepo.description || 'No description available'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                            {githubRepo.language && (
                                <Chip label={githubRepo.language} size="small" color="primary" />
                            )}
                            <Chip label={`⭐ ${githubRepo.stargazers_count}`} size="small" />
                            <Chip label={`🍴 ${githubRepo.forks_count}`} size="small" />
                            <Chip label={`👁️ ${githubRepo.watchers_count}`} size="small" />
                        </Box>
                        {githubRepo.topics && githubRepo.topics.length > 0 && (
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {githubRepo.topics.slice(0, 10).map((topic, index) => (
                                    <Chip key={index} label={topic} size="small" variant="outlined" />
                                ))}
                            </Box>
                        )}
                    </Box>
                </Box>

                {githubRepo.owner_details && (
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
                                        href={githubRepo.owner_details.html_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        {githubRepo.owner_details.login}
                                    </Link>
                                </Typography>
                            </Box>
                            
                            {githubRepo.owner_details.name && (
                                <Box>
                                    <Typography variant="body2" component="span" fontWeight="bold">
                                        Name: 
                                    </Typography>
                                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                        {githubRepo.owner_details.name}
                                    </Typography>
                                </Box>
                            )}
                            
                            {githubRepo.owner_details.email && (
                                <Box>
                                    <Typography variant="body2" component="span" fontWeight="bold">
                                        Email: 
                                    </Typography>
                                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                        <Link href={`mailto:${githubRepo.owner_details.email}`}>
                                            {githubRepo.owner_details.email}
                                        </Link>
                                    </Typography>
                                </Box>
                            )}
                            
                            {githubRepo.owner_details.company && (
                                <Box>
                                    <Typography variant="body2" component="span" fontWeight="bold">
                                        Company: 
                                    </Typography>
                                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                        {githubRepo.owner_details.company}
                                    </Typography>
                                </Box>
                            )}
                            
                            {githubRepo.owner_details.location && (
                                <Box>
                                    <Typography variant="body2" component="span" fontWeight="bold">
                                        Location: 
                                    </Typography>
                                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                        {githubRepo.owner_details.location}
                                    </Typography>
                                </Box>
                            )}
                            
                            {githubRepo.owner_details.blog && (
                                <Box>
                                    <Typography variant="body2" component="span" fontWeight="bold">
                                        Website: 
                                    </Typography>
                                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                        <Link 
                                            href={githubRepo.owner_details.blog.startsWith('http') 
                                                ? githubRepo.owner_details.blog 
                                                : `https://${githubRepo.owner_details.blog}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            {githubRepo.owner_details.blog}
                                        </Link>
                                    </Typography>
                                </Box>
                            )}
                            
                            {githubRepo.owner_details.bio && (
                                <Box>
                                    <Typography variant="body2" component="span" fontWeight="bold">
                                        Bio: 
                                    </Typography>
                                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                        {githubRepo.owner_details.bio}
                                    </Typography>
                                </Box>
                            )}
                            
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Typography variant="body2">
                                    <strong>Repositories:</strong> {githubRepo.owner_details.public_repos}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Followers:</strong> {githubRepo.owner_details.followers}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Following:</strong> {githubRepo.owner_details.following}
                                </Typography>
                            </Box>
                            
                            <Typography variant="body2" color="text.secondary">
                                <strong>Member since:</strong> {new Date(githubRepo.owner_details.created_at).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                )}
                
                <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Repository Details:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                        <Typography variant="body2">
                            Created: {new Date(githubRepo.created_at).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Updated: {new Date(githubRepo.updated_at).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Size: {(githubRepo.size / 1024).toFixed(1)} MB
                        </Typography>
                        {githubRepo.license && (
                            <Typography variant="body2">
                                License: {githubRepo.license.name}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GithubRepoCmp;