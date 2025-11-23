import { Typography } from '@mui/material';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const HeaderItems: React.FC<Props> = ({ 
    children 
}) => {

    // RENDER
    return (
        <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            sx={{ px: 2, mt: 2, mb: 1 }}
        >
            {children}
        </Typography>
    );
};
