import { Box, Button, Card, CardContent, Typography, TextField } from '@mui/material';
import React from 'react';
import { Account } from '@/types/Account';
import { Message } from '@/types/Message';

interface MessageViewProps {
	message: Message;
	onChange: (message: Message) => void;
	onSelectReceiver: () => void;
	onSendMessage: () => void;
}

const MessageView: React.FC<MessageViewProps> = ({
	message,
	onChange,
	onSelectReceiver,
	onSendMessage
}) => {
	const handleTextChange = (text: string) => {
		onChange({
			...message,
			text
		});
	};

	return (
		<Card>
			<CardContent>
				<Typography variant="h6" component="h2" sx={{ mb: 2 }}>
					Send New Message
				</Typography>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Typography variant="body2">To:</Typography>
						<Button
							variant="outlined"
							onClick={onSelectReceiver}
							sx={{ flex: 1, justifyContent: 'flex-start' }}
						>
							{message.receiver ? message.receiver.name : 'Select Recipient'}
						</Button>
					</Box>

					<TextField
						fullWidth
						multiline
						rows={3}
						placeholder="Type your message..."
						value={message.text || ''}
						onChange={(e) => handleTextChange(e.target.value)}
						disabled={!message.receiver}
					/>

					<Button
						variant="contained"
						color="primary"
						onClick={onSendMessage}
						disabled={!message.text?.trim() || !message.receiver}
						sx={{ alignSelf: 'flex-end' }}
					>
						Send Message
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default MessageView;