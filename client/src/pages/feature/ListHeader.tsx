import { Box, Button, SxProps, Typography } from '@mui/material';
import React from 'react';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';



const FeatureListHeader: React.FC = () => {

	// STORES

	// HOOKS
	const navigate = useNavigate()
	
	// HANDLERS
	const handleNewFeatureClick = () => {
		navigate('/app/feature/new')
	}
	
	// RENDER
	return <>
		<BackButton />
		<Typography variant="h5">
			FEATURES
		</Typography>
		<Box sx={{ flex: 1 }}></Box>

		<Button variant="contained" color="primary"
			onClick={handleNewFeatureClick}
		>New Feature</Button>
	</>
}

export default FeatureListHeader;
