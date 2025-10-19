import { Comment } from '@/types/Comment';
import { Message } from '@/types/Message';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import MessageRow from './MessageRow';

interface Props {
	messages: Message[];
	onClick?: (message: Message) => void;
}

const CommentsList: React.FC<Props> = ({ 
	messages, 
	onClick 
}) => {

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			{messages.map((message) => (
				<MessageRow key={message.id} message={message} onClick={onClick} />
			))}
		</Box>
	);
};

export default CommentsList;
