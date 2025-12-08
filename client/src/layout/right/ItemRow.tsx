import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';



interface Props {
    label: string;
    selected?: boolean;
    onClick: () => void;
}

export const ItemRow: React.FC<Props> = ({
    label,
    selected,
    onClick
}) => {

    // RENDER
    return (
        <Box
            onClick={onClick}
            sx={sxRoot}
        >
            <Typography variant="body2"
                fontWeight={selected ? 'bold' : 'normal'}
                color={selected ? 'secondary.main' : 'text.secondary'}
            >
                {label}
            </Typography>
        </Box>
    );
};

const sxRoot: SxProps = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    py: 0.5,
}
