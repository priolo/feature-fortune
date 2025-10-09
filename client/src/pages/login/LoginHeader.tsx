import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../feature/BackButton';



const LoginHeader: React.FC = () => {

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
			LOGIN
		</Typography>
		<Box sx={{ flex: 1 }}></Box>

		<Button 
		>Cancel</Button>

		<Button variant="contained" color="primary"
			onClick={handleNewFeatureClick}
		>Access</Button>
	</>
}

export default LoginHeader;
