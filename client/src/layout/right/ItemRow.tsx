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

            <Box sx={{ width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                {selected && <Box sx={sxSelectedIndicator} />}
            </Box>

            <Box>
                <Typography variant="body2"
                    fontWeight={selected ? 'bold' : 'normal'}
                    color={selected ? 'text.primary' : 'text.secondary'}
                >
                    {label}
                </Typography>
            </Box>
            
        </Box>
    );
};

const sxRoot: SxProps = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    py: 0.5,
    px: 2,
}

const sxSelectedIndicator: SxProps = {
    width: 5,
    height: 5,
    borderRadius: '50%',
    bgcolor: 'text.primary',
}