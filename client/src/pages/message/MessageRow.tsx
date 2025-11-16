import { Message } from '@/types/Message';
import { Box, Paper, SxProps, Typography } from '@mui/material';
import React, { useState } from 'react';
import AvatarCmp from '../../components/AvatarCmp';
import messageListSo from '@/stores/message/list';
import ActionsMenu, { ActionMenuProps } from '@/components/ActionsMenu';
import messageApi from '@/api/message';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';



interface MessageRowProps {
	message: Message;
}

const MessageRow: React.FC<MessageRowProps> = ({
	message,
}) => {

	// STATE
	const [isExpanded, setIsExpanded] = useState(false);


	// HANDLERS
	const handleSendClick = async (action: ActionMenuProps) => {
		messageListSo.createAndSelect(message.content?.accountId)
	}
	const handleAsUnreadClick = async (action: ActionMenuProps) => {
	}
	const handleDeleteClick = async (action: ActionMenuProps) => {
		await messageListSo.remove(message.id)
		dialogSo.dialogOpen({
			text: "Message removed",
			modal: false,
			type: DIALOG_TYPE.SUCCESS,
		})
	}
	const handleToggleExpanded = () => {
		setIsExpanded((prev) => !prev)
		if (isRead) return
		messageListSo.setAll(messageListSo.state.all.map((msg) =>
			msg.id == message.id ? { ...msg, isRead: true } : msg
		))
		messageApi.markAsRead(message.id)
	}


	// RENDER
	const isRead = message.isRead;
	const isSystem = !message.content?.accountId;
	const accountName = message.content?.account?.name ?? "SYSTEM"
	const createAt = new Date(message.content?.createdAt || "").toLocaleString()
	const displayText = message.content?.text ?? ""
	const textStyles = isExpanded
		? { cursor: 'pointer', whiteSpace: 'pre-line' }
		: { cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }

	return (
		<Paper variant="outlined" sx={sxContainer(isRead)}>

			<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>

				<AvatarCmp
					account={message.content?.account}
				/>

				<Box sx={{ flexGrow: 1, ml: 2 }}>
					<Typography variant="subtitle1" sx={{ fontWeight: isRead ? 500 : 600 }}>
						{accountName}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{createAt}
					</Typography>
				</Box>

				<ActionsMenu
					actions={[
						{
							hidden: isSystem,
							label: "SEND",
							onClick: handleSendClick,
						},
						{
							hidden: !isRead,
							label: "AS UNREAD",
							onClick: handleAsUnreadClick,
						},
						{
							hidden: isSystem && !isRead,
							label: "---",
						},
						{
							label: "DELETE",
							onClick: handleDeleteClick,
						},
					]}
				/>

			</Box>

			<Typography
				variant="body1"
				sx={textStyles}
				onClick={handleToggleExpanded}
			>
				{displayText}
			</Typography>

		</Paper>

	);
};

export default MessageRow

const sxContainer = (isRead?: boolean): SxProps => ({
	p: 2,
	borderRadius: 3,
	borderColor: isRead ? null : 'secondary.main',
	// transition: 'background-color 0.2s ease',
	// '&:hover': {
	// 	bgcolor: isRead ? 'background.paper' : 'action.hover',
	// 	boxShadow: 3,
	// },
})
