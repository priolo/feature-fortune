import MessageBanner from '@/components/MessageBanner';
import { GithubRepoMetadata } from '@/types/feature/Feature';
import { Avatar, Box, Link, SxProps, Typography } from '@mui/material';
import React from 'react';



interface Props {
    metadata?: GithubRepoMetadata;
    sx?: SxProps;
}

/**
 * Visualizza i metadati del repository GitHub memorizzati
 * (senza fare chiamate API)
 */
const GithubRepoMetadataViewer: React.FC<Props> = ({
    metadata,
    sx,
}) => {

    // RENDER

    if (!metadata) return <MessageBanner>
        No repository selected
    </MessageBanner>

    return (
        <Box sx={{ ...sxRoot, ...sx }}>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    src={metadata.avatar_url}
                    alt={metadata.name}
                    sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ flex: 1 }}>
                    {metadata.html_url ? (
                        <Link href={metadata.html_url} target="_blank" rel="noopener">
                            {metadata.full_name}
                        </Link>
                    ) : (
                        <Typography variant="body1">
                            {metadata.full_name}
                        </Typography>
                    )}
                    {metadata.description && (
                        <Typography variant="body2" color="text.secondary">
                            {metadata.description}
                        </Typography>
                    )}
                </Box>
            </Box>

        </Box>
    );
};

export default GithubRepoMetadataViewer;

const sxRoot: SxProps = {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
    p: 2,
}
