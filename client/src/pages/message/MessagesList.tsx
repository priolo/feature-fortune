import messageListSo from '@/stores/message/list';
import { Box } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import MessageBanner from '../../components/MessageBanner';
import MessageRow from './MessageRow';



interface Props {
}

const MessagesList: React.FC<Props> = ({
}) => {

	// STORES
	useStore(messageListSo)

	// HANDLERS

	// RENDER
	const messages = messageListSo.state.all
	if (!messages || messages.length === 0) {
		return <MessageBanner>
			No messages yet. Start a conversation!
		</MessageBanner>
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			{messages.map((message) => (

				<MessageRow key={message.id}
					message={message}
				/>
				
			))}
		</Box>
	);
};

export default MessagesList;
