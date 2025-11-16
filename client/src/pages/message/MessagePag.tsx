import Card from '@/components/Card';
import Framework from '@/layout/Framework';
import MessagesList from '@/pages/message/MessagesList';
import MessageView from '@/pages/message/MessageView';
import authSo from '@/stores/auth/repo';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import messageListSo from '@/stores/message/list';
import { Message } from '@/types/Message';
import { Box } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';



const MessagePag: React.FC = () => {

	// STORES
	useStore(messageListSo)

	// HOOKS
	useEffect(() => {
		locationSo.setCurrent(LOCATION_PAGE.Messages)
		messageListSo.fetch()
	}, [])


	// HANDLERS
	const handleSendMessage = async () => {
		await messageListSo.sendSelected()
		dialogSo.dialogOpen({
			text: "Message sent",
			modal: false,
			type: DIALOG_TYPE.SUCCESS,
		})
	}
	const handleMessageChange = (message: Message) => {
		messageListSo.setSelected(message)
	}


	// RENDER
	const selected = messageListSo.state.selected
	const currentUserId = authSo.state.user?.id

	return <Framework>

		{/* Compose Message */}

		<Box sx={{ pt: 2, bgcolor: "background.default", position: "sticky", top: 0, zIndex: 10, boxShadow: 5 }}>
			<MessageView
				message={selected}
				onChange={handleMessageChange}
				onSendMessage={handleSendMessage}
			/>
		</Box>

		{/* Messages List */}
		<Card title='MESSAGES'>
			<MessagesList />
		</Card>

	</Framework>

}

export default MessagePag;
