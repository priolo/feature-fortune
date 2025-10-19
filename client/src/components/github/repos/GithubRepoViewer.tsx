import MessageBanner from '@/components/MessageBanner';
import { GitHubRepository } from '@/types/github/GitHub';
import { Star } from '@mui/icons-material';
import { Avatar, Box, Chip, Link, SxProps, Typography } from '@mui/material';
import React from 'react';



interface Props {
    repository: GitHubRepository;
}

const GithubRepoViewer: React.FC<Props> = ({
    repository
}) => {

    // RENDER

    if (!repository) return <MessageBanner>
        void
    </MessageBanner>

    const haveTopics = repository.topics && repository.topics.length > 0;

    return (
        <Box sx={sxRoot}>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />
                <Box sx={{ flex: 1 }}>
                    <Link href={repository.html_url}>
                        {repository.full_name}
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        {repository.description ?? 'No description available'}
                    </Typography>
                </Box>
            </Box>


            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>

                <Chip size="small" icon={<Star />}
                    label={repository.stargazers_count}
                />

                {repository.topics.slice(0, 10).map((topic, index) => (
                    <Chip key={index} label={topic} size="small" />
                ))}

            </Box>


        </Box>
    )
};

export default GithubRepoViewer;

const sxRoot: SxProps = {
    display: 'flex',
    flexDirection: "column",
    gap: 1
}

