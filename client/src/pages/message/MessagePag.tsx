import Card from '@/components/Card';
import Framework from '@/layout/Framework';
import MessagesList from '@/pages/message/MessagesList';
import MessageView from '@/pages/message/MessageView';
import authSo from '@/stores/auth/repo';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import messageListSo from '@/stores/message/list';
import { Message } from '@/types/Message';
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
		messageListSo.sendSelected()
	}
	const handleMessageChange = (message: Message) => {
		messageListSo.setSelected(message)
	}


	// RENDER
	const selected = messageListSo.state.selected
	const currentUserId = authSo.state.user?.id

	return <Framework sx={{ py: 2 }}>

		{/* Compose Message */}

		<MessageView
			message={selected}
			onChange={handleMessageChange}
			onSendMessage={handleSendMessage}
		/>

		{/* Messages List */}
		<Card title='MESSAGES'>
			<MessagesList />
		</Card>

	</Framework>

}

export default MessagePag;
