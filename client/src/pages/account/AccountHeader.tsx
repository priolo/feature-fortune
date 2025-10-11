import { Box, Typography } from '@mui/material';
import React from 'react';
import BackButton from '../feature/BackButton';



const AccountHeader: React.FC = () => {

	// STORES

	// HOOKS
	
	// HANDLERS
	
	// RENDER
	return <>
		<BackButton />
		<Typography variant="h5">
			MY ACCOUNT
		</Typography>
		<Box sx={{ flex: 1 }}></Box>
	</>
}

export default AccountHeader;
