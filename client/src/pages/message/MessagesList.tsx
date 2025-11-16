import messageListSo from '@/stores/message/list';
import { Box } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import MessageBanner from '../../components/MessageBanner';
import MessageRow from './MessageRow';
import { useSearchParams } from 'react-router-dom';
import { Message } from '@/types/Message';




interface Props {
}

const MessagesList: React.FC<Props> = ({
}) => {

	// STORES
	useStore(messageListSo)

	// HOOKS
	const [searchParams] = useSearchParams()
	const receiverId = searchParams.get('receiver')
	const messages = useMemo(() => {
		const all = messageListSo.state.all
		if ( all == null ) return []
		const messages: Message[] = !receiverId
			? all
			: all.filter(message => {
				const accountId = message.content?.accountId
				return accountId == receiverId || (accountId == null && receiverId == "sys")
			})
		return messages.sort((msg1, msg2) => new Date(msg2.createdAt).getTime() - new Date(msg1.createdAt).getTime())
	}, [messageListSo.state.all, receiverId])

	// RENDER
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
