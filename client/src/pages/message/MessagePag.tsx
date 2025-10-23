import { Box, Button, Card, CardContent, Typography, TextField, Avatar } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import messageListSo from '@/stores/message/list';
import { Message } from '@/types/Message';
import AccountFinderDialog from '@/components/account/AccountFinderDialog';
import { Account } from '@/types/Account';
import authSo from '@/stores/auth/repo';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import Framework from '@/layout/Framework';
import MessageView from '@/components/message/MessageView';



const MessagePag: React.FC = () => {

	// STORES
	useStore(messageListSo)
	const authSa = useStore(authSo)


	// HOOKS
	const [newMessageText, setNewMessageText] = useState('')
	const [selectedReceiver, setSelectedReceiver] = useState<Account>(null)
	const [accountDialogOpen, setAccountDialogOpen] = useState(false)

	useEffect(() => {
		locationSo.setCurrent(LOCATION_PAGE.Messages)
		messageListSo.fetch()
	}, [])


	// HANDLERS
	const handleSendMessage = async () => {
		if (!newMessageText.trim() || !selectedReceiver) return

		const newMessage: Message = {
			id: null,
			senderId: authSo.state.user?.id,
			receiverId: selectedReceiver.id,
			text: newMessageText,
		}

		messageListSo.setSelected(newMessage)
		await messageListSo.saveSelected()
		setNewMessageText('')
		setSelectedReceiver(null)
	}

	const handleSelectReceiver = () => {
		setAccountDialogOpen(true)
	}

	const handleAccountDialogClose = (account: Account) => {
		setAccountDialogOpen(false)
		if (account) {
			setSelectedReceiver(account)
		}
	}


	// RENDER
	const messages = messageListSo.state.all
	const selected = messageListSo.state.selected
	const currentUserId = authSa.user?.id

	return <Framework sx={{ py: 2 }}>

		{/* Compose Message */}

		<MessageView
			message={selected}
		>

		{/* Messages List */}
		<Card sx={{ flex: 1, mb: 2, overflow: 'auto' }}>
			<CardContent>
				<Typography variant="h6" component="h2" sx={{ mb: 2 }}>
					Messages
				</Typography>

				{messages && messages.length > 0 ? (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						{messages.map((message) => {
							const isSentByMe = message.senderId === currentUserId
							return (
								<Box
									key={message.id}
									sx={{
										display: 'flex',
										flexDirection: isSentByMe ? 'row-reverse' : 'row',
										alignItems: 'flex-start',
										gap: 1,
									}}
								>
									<Avatar
										src={isSentByMe ? message.sender?.avatarUrl : message.sender?.avatarUrl}
										sx={{ width: 32, height: 32 }}
									>
										{isSentByMe
											? message.sender?.name?.[0]?.toUpperCase()
											: message.sender?.name?.[0]?.toUpperCase()
										}
									</Avatar>
									<Card
										variant="outlined"
										sx={{
											maxWidth: '70%',
											bgcolor: isSentByMe ? 'primary.light' : 'background.paper',
										}}
									>
										<CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
											<Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
												{isSentByMe ? 'You' : message.sender?.name || 'Unknown'}
											</Typography>
											<Typography variant="body1" sx={{ mb: 1 }}>
												{message.text}
											</Typography>
											<Typography variant="caption" color="text.secondary">
												{message.createdAt && new Date(message.createdAt).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'short',
													day: 'numeric',
													hour: '2-digit',
													minute: '2-digit'
												})}
											</Typography>
										</CardContent>
									</Card>
								</Box>
							)
						})}
					</Box>
				) : (
					<Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
						No messages yet. Start a conversation!
					</Typography>
				)}
			</CardContent>
		</Card>



		<AccountFinderDialog
			isOpen={accountDialogOpen}
			onClose={handleAccountDialogClose}
		/>

	</Framework>

}

export default MessagePag;
