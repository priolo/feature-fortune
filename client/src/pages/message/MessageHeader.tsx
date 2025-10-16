import { Box, Typography } from '@mui/material';
import React from 'react';
import BackButton from '../../layout/BackButton';



const MessageHeader: React.FC = () => {

	// STORES

	// HOOKS
	
	// HANDLERS
	
	// RENDER
	return <>
		<BackButton />
		<Typography variant="h5">
			MESSAGES
		</Typography>
		<Box sx={{ flex: 1 }}></Box>
	</>
}

export default MessageHeader;
