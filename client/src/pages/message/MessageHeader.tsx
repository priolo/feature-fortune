import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import BackButton from '../../layout/BackButton';
import { Add } from '@mui/icons-material';



const MessageHeader: React.FC = () => {

	// STORES

	// HOOKS

	// HANDLERS
	const handleNewMessageClick = () => {
	}

	// RENDER
	return <>
		<BackButton />
		<Typography variant="h5">
			MESSAGES
		</Typography>
		<Box sx={{ flex: 1 }}></Box>
		<Button
			startIcon={<Add />}
			onClick={handleNewMessageClick}
		>New</Button>
	</>
}

export default MessageHeader;
