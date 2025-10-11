import { Box, Typography } from '@mui/material';
import React from 'react';
import BackButton from '../../layout/BackButton';



const LoginHeader: React.FC = () => {

	// STORES

	// HOOKS
	
	// HANDLERS
	
	// RENDER
	return <>
		<BackButton toHome />
		<Typography variant="h5">
			LOGIN
		</Typography>
		<Box sx={{ flex: 1 }}></Box>
	</>
}

export default LoginHeader;
