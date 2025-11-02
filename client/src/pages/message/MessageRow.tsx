import { Message } from '@/types/Message';
import { Button, Paper, Typography } from '@mui/material';
import React from 'react';
import AvatarCmp from '../../components/AvatarCmp';
import messageListSo from '@/stores/message/list';



interface MessageRowProps {
	message: Message;
}

const MessageRow: React.FC<MessageRowProps> = ({
	message,
}) => {

	// HANDLERS
	const handleDeleteClick = (e: React.MouseEvent) => {
		messageListSo.remove(message.id)
	}

	// RENDER
	return (
		<Paper
			variant="outlined"
			sx={{ p: 2 }}
		>
			<AvatarCmp account={message.content.account} />
			<Typography variant="body1" sx={{ mb: 1 }}>
				{message.content.text}
			</Typography>
			<Button size="small" variant="contained" onClick={handleDeleteClick}>
				DELETE
			</Button>
		</Paper>
	);
};

export default MessageRow
