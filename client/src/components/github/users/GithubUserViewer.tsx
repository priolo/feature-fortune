import MessageBanner from '@/components/MessageBanner';
import { GitHubUser } from '@/types/github/GitHub';
import { Avatar, Box, Card, CardContent, Chip, Link, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';



interface Props {
    user: GitHubUser;
}

const GithubUserViewer: React.FC<Props> = ({
    user
}) => {

    // RENDER

    if (!user) return <MessageBanner>
        void
    </MessageBanner>

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>

            <Avatar
                src={user.avatar_url}
                alt={user.login}
            />

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: 'hidden' }} >

                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }} >
                    <Link href={user.html_url}>
                        {user.login}
                    </Link>
                    <Typography variant='overline' color="text.secondary">
                        {user.company}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <Chip size="small"
                        label={dayjs(user.created_at).format('MMM YYYY')}
                    />
                    {user.location && <Chip size="small"
                        label={user.location}
                    />}
                    <Chip size="small"
                        label={`Repo: ${user.public_repos}`}
                    />
                    <Chip size="small"
                        label={`Followers: ${user.followers}`}
                    />
                    <Chip size="small"
                        label={`Following: ${user.following}`}
                    />
                </Box>

            </Box>
        </Box>
   )
}

export default GithubUserViewer;
