import { Message } from '@/types/Message';
import { Typography } from '@mui/material';
import React from 'react';



interface MessageRowProps {
	message: Message;
	currentUserId?: string;
	onClick?: (message: Message) => void;
}

const MessageRow: React.FC<MessageRowProps> = ({ message, currentUserId, onClick }) => {
	
	const isSentByMe = message.accountId === currentUserId;

	const handleClick = () => {
		if (onClick) {
			onClick(message);
		}
	};

	return (
			<Paper
					key={comment.id}
					variant="outlined"
					sx={{ p: 2, cursor: onClick ? 'pointer' : 'default' }}
					onClick={() => onClick?.(comment)}
				>
					<Typography variant="body1" sx={{ mb: 1 }}>
						{comment.text}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{new Date(comment.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</Typography>
				</Paper>
	);
};

export default MessageRow;
