import messageListSo from '@/stores/message/list';
import { Add, Refresh } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';



const MessageHeader: React.FC = () => {

	// STORES

	// HOOKS
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams();

	// HANDLERS
	const handleNewMessageClick = () => {
		messageListSo.createAndSelect()
	}
	// const handleReceiverChange = (receiverId: string | null) => {
	// 	const params = Object.fromEntries(searchParams.entries())
	// 	if (!receiverId) {
	// 		delete params.receiver
	// 		setSearchParams(params)
	// 		return
	// 	}
	// 	setSearchParams({ ...params, receiver: receiverId })
	// }
	const handleRefreshClick = () => {
		messageListSo.fetch()
	}

	// RENDER
	const params = Object.fromEntries(searchParams.entries())
	const receiverId = params.receiver ?? null
	return <>
		<Typography variant="h5">
			{t("header.messages.title")}
		</Typography>

		<Box sx={{ flex: 1 }}></Box>

		{/* <MessageReceiverSelector
			receiverId={receiverId}
			onChange={handleReceiverChange}
		/> */}

		<Button color="secondary"
			startIcon={<Refresh />}
			onClick={handleRefreshClick}
		>{t("common.refresh")}</Button>

		<Button variant='contained'
			startIcon={<Add />}
			onClick={handleNewMessageClick}
		>{t("common.new")}</Button>
		
	</>
}

export default MessageHeader;
