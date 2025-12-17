import messageListSo from '@/stores/message/list';
import { Box } from '@mui/material';
import { renderOnChange, useStore, useStoreNext } from '@priolo/jon';
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
	//useStore(messageListSo)
	useStoreNext(messageListSo, renderOnChange(["all"]))

	// HOOKS
	const [searchParams] = useSearchParams()
	const params = Object.fromEntries(searchParams.entries()) as { receiver?: string, read?: string }

	const messages = useMemo(() => {
		const all = messageListSo.state.all
		if (all == null) return []
		const messages: Message[] = !params.receiver && !params.read
			? all
			: all.filter(message => {
				const accountId = message.content?.accountId
				if (!!params.receiver && (
					(params.receiver != "sys" && params.receiver != accountId) || (params.receiver == "sys" && accountId != null)
				)) return false
				if (!!params.read) {
					const isRead = params.read === 'true'
					if (message.isRead !== isRead) return false
				}
				return true
			})
		return messages.sort((msg1, msg2) => new Date(msg2.createdAt).getTime() - new Date(msg1.createdAt).getTime())
	}, [messageListSo.state.all, params.receiver, params.read])

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
