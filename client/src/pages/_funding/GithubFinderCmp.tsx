import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

interface GithubFinderCmpProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

/**
 * Component for searching GitHub repositories
 */
const GithubFinderCmp: React.FC<GithubFinderCmpProps> = ({
    value,
    onChange,
    onSearch
}) => {
    return (
        <>
            <Typography variant="h5" component="h1">
                GitHub Repository Search
            </Typography>

            <Box sx={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                    label="GitHub Repository (name or URL)"
                    variant="outlined"
                    fullWidth
                    placeholder="e.g., facebook/react or https://github.com/facebook/react"
                    value={value}
                    onChange={onChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSearch}
                    sx={{ minWidth: 120 }}
                >
                    SEARCH
                </Button>
            </Box>
        </>
    );
};

export default GithubFinderCmp;