import Card from '@/components/Card';
import Framework from '@/layout/Framework';
import MessagesList from '@/pages/message/MessagesList';
import MessageView from '@/pages/message/MessageView';
import authSo from '@/stores/auth';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import messageListSo from '@/stores/message/list';
import { Message } from '@/types/Message';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import MessageOverviewSide from './MessageOverviewSide';
import RightRender from './RightRender';



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

	return <Framework sx={{ py: 2 }}
		leftRender={<MessageOverviewSide />}
		rightRender={<RightRender />}
	>

		<MessageView
			message={selected}
			onChange={handleMessageChange}
			onSendMessage={handleSendMessage}
		/>

		<Card>
			<MessagesList />
		</Card>

	</Framework>

}

export default MessagePag;
