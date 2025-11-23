import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

interface Props {
    onScrollTo: (id: string) => void;
}

const FeatureDetailRightMenu: React.FC<Props> = ({ onScrollTo }) => {
    return (
        <Box sx={{ position: 'sticky', top: 20, pt: 2 }}>
            <List dense>
                <ListItemButton onClick={() => onScrollTo('author-card')}>
                    <ListItemText primary="Author" secondary="Feature creator" />
                </ListItemButton>
                <ListItemButton onClick={() => onScrollTo('repo-card')}>
                    <ListItemText primary="Repository" secondary="GitHub Repository" />
                </ListItemButton>
                <ListItemButton onClick={() => onScrollTo('dev-card')}>
                    <ListItemText primary="Developer" secondary="Assigned developer" />
                </ListItemButton>
                <ListItemButton onClick={() => onScrollTo('detail-card')}>
                    <ListItemText primary="Details" secondary="Feature description" />
                </ListItemButton>
                <ListItemButton onClick={() => onScrollTo('fundings-card')}>
                    <ListItemText primary="Fundings" secondary="Backers and funds" />
                </ListItemButton>
                <ListItemButton onClick={() => onScrollTo('comments-card')}>
                    <ListItemText primary="Comments" secondary="Discussion" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default FeatureDetailRightMenu;
