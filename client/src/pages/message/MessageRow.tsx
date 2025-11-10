import { Message } from '@/types/Message';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../../components/AvatarCmp';
import messageListSo from '@/stores/message/list';
import ActionsMenu, { ActionMenuProps } from '@/components/ActionsMenu';



interface MessageRowProps {
	message: Message;
}

const MessageRow: React.FC<MessageRowProps> = ({
	message,
}) => {

	// HANDLERS
	const handleDeleteClick = (action: ActionMenuProps) => {
		messageListSo.remove(message.id)
	}

	// RENDER
	const accountName = message.content.account?.name ?? "SYSTEM"
	const createAt = new Date(message.content.createdAt || "").toLocaleString()

	return (
		<Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}
		>
			<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>

				<AvatarCmp
					account={message.content.account}
				/>

				<Box sx={{ flexGrow: 1, ml: 2 }}>
					<Typography variant="subtitle1">
						{accountName}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{createAt}
					</Typography>
				</Box>

				<ActionsMenu
					actions={[
						{
							label: "Delete",
							onClick: handleDeleteClick,
						},
					]}
				/>

			</Box>

			<Typography variant="body1">
				{message.content.text}
			</Typography>

		</Paper>
		
	);
};

export default MessageRow
