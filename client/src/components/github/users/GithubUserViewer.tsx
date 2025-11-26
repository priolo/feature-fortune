import MessageBanner from '@/components/MessageBanner';
import { sxClips, sxContent, sxRoot } from '@/theme/AvatarStyle';
import { GitHubUser } from '@/types/github/GitHub';
import { Avatar, Box, Chip, Link, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';



interface Props {
    user: GitHubUser;
    noLink?: boolean;
}

const GithubUserViewer: React.FC<Props> = ({
    user,
    noLink,
}) => {

    // RENDER

    if (!user) return <MessageBanner>
        No user selected
    </MessageBanner>

    return (
        <Box sx={sxRoot}>

            <Avatar
                src={user.avatar_url}
                alt={user.login}
            />

            <Box sx={sxContent}>

                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }} >
                    <Link href={!noLink ? user.html_url : undefined}>
                        {user.login}
                    </Link>
                    <Typography variant='overline' color="text.secondary">
                        {user.company}
                    </Typography>
                </Box>

                <Box sx={sxClips}>
                    <Chip size="small"
                        label={dayjs(user.created_at).format('MMM YYYY')}
                    />
                    {user.location && <Chip size="small"
                        label={user.location}
                    />}
                    {user.public_repos && <Chip
                        label={`Repo: ${user.public_repos}`}
                    />}
                    {user.followers && <Chip
                        label={`Followers: ${user.followers}`}
                    />}
                    {user.following && <Chip
                        label={`Following: ${user.following}`}
                    />}
                </Box>

            </Box>
        </Box>
    )
}

export default GithubUserViewer;
