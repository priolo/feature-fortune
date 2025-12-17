import Card from '@/components/Card';
import Framework from '@/layout/Framework';
import MessagesList from '@/pages/message/MessagesList';
import MessageView from '@/pages/message/MessageView';
import authSo from '@/stores/auth';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import messageListSo from '@/stores/message/list';
import { Message } from '@/types/Message';
import { renderOnChange, useStoreNext } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MessageOverview from './Overview';
import RightMenu from './RightMenu';



const MessagePag: React.FC = () => {

	// STORES
	//const { t } = useTranslation()
	//useStoreNext(messageListSo, renderOnChange(["selected"]))

	// HOOKS
	useEffect(() => {
		locationSo.setCurrent(LOCATION_PAGE.Messages)
		messageListSo.fetch()
	}, [])


	// HANDLERS
	

	// RENDER
	const currentUserId = authSo.state.user?.id

	return <Framework sx={{ py: 2 }}
		leftRender={<MessageOverview />}
		rightRender={<RightMenu />}
	>

		<MessageView />

		<Card>
			<MessagesList />
		</Card>

	</Framework>

}

export default MessagePag;
