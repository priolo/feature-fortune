import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import BackButton from '../../layout/BackButton';
import { Add, Refresh } from '@mui/icons-material';
import messageListSo from '@/stores/message/list';
import { useSearchParams } from 'react-router-dom';
import MessageReceiverSelector from './MessageReceiverSelector';



const MessageHeader: React.FC = () => {

	// STORES

	// HOOKS
	const [searchParams, setSearchParams] = useSearchParams();

	// HANDLERS
	const handleNewMessageClick = () => {
		messageListSo.createAndSelect()
	}
	const handleReceiverChange = (receiverId: string | null) => {
		const params = Object.fromEntries(searchParams.entries())
		if (!receiverId) {
			delete params.receiver
			setSearchParams(params)
			return
		}
		setSearchParams({ ...params, receiver: receiverId })
	}
	const handleRefreshClick = () => {
		messageListSo.fetch()
	}

	// RENDER
	const params = Object.fromEntries(searchParams.entries())
	const receiverId = params.receiver ?? null
	return <>
		{/* <BackButton /> */}

		<Typography variant="h5">
			MESSAGES
		</Typography>

		<Box sx={{ flex: 1 }}></Box>

		<MessageReceiverSelector
			receiverId={receiverId}
			onChange={handleReceiverChange}
		/>

		<Button 
			startIcon={<Refresh />}
			onClick={handleRefreshClick}
		>REFRESH</Button>

		<Button variant='contained'
			startIcon={<Add />}
			onClick={handleNewMessageClick}
		>NEW</Button>
		
	</>
}

export default MessageHeader;
