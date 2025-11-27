import MessageBanner from '@/components/MessageBanner';
import { sxClips, sxContent, sxRoot } from '@/theme/AvatarStyle';
import { GitHubRepository } from '@/types/github/GitHub';
import { Star } from '@mui/icons-material';
import { Avatar, Box, Chip, Link, SxProps, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';



interface Props {
    repository: GitHubRepository
    noLink?: boolean
}

const GithubRepoViewer: React.FC<Props> = ({
    repository,
    noLink = false,
}) => {

    // HOOKS
    const { t } = useTranslation();

    // RENDER

    if (!repository) return <MessageBanner>
        {t('viewers.githubRepo.empty', 'No repository selected')}
    </MessageBanner>;

    const description = repository.description?.slice(0, 200) ?? t('viewers.githubRepo.no_description');
    const topics = repository.topics ?? [];

    return (
        <Box sx={sxRoot}>

            <Avatar
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
            />

            <Box sx={sxContent}>

                <Link href={!noLink ? repository.html_url : undefined} alignSelf="start">
                    {repository.full_name}
                </Link>

                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>

                <Box sx={sxClips}>

                    <Chip sx={sxChip} icon={<Star sx={{ width: ".9em", height: ".9em" }} />}
                        label={repository.stargazers_count}
                    />

                    {topics.slice(0, 10).map((topic, index) => (
                        <Chip key={index} label={topic} sx={sxChip} />
                    ))}

                </Box>

            </Box>

        </Box>
    )
};

export default GithubRepoViewer;

const sxChip: SxProps = {
    textTransform: "uppercase",
}