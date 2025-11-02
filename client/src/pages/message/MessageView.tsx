import Paragraph from '@/layout/Paragraph';
import { Account } from '@/types/Account';
import { Message } from '@/types/Message';
import { Message as MessageIcon, Send } from '@mui/icons-material';
import { Button, ListItemButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import AccountFinderDialog from '../../components/account/AccountFinderDialog';
import AccountIdView from '../../components/account/AccountIdView';
import Card from '../../components/Card';



interface Props {
	message: Message;
	onChange: (message: Message) => void;
	onSendMessage: () => void;
}

const MessageView: React.FC<Props> = ({
	message,
	onChange,
	onSendMessage
}) => {

	// HOOKS
	const [dialogOpen, setDialogOpen] = useState(false);


	// HANDLERS
	const handleTextChange = (text: string) => {
		if ( message.content == null ) message.content = { text: '' };
		message.content.text = text;
		onChange({ ...message });
	};
	const handleDialogClose = async (account: Account) => {
		setDialogOpen(false)
		if (!account) return
		onChange({ ...message, accountId: account?.id, });
	}


	// RENDER
	if (!message) return null;

	return <>
		<Card
			icon={<MessageIcon />}
			title="MESSAGE"
			titleEndRender={
				<Button variant="contained" size="small"
					startIcon={<Send />}
					onClick={onSendMessage}
				>SEND</Button>
			}
		>
			<Paragraph title="TO">
				<ListItemButton
					onClick={() => setDialogOpen(true)}
				>
					<AccountIdView
						accountId={message.accountId}
					/>
				</ListItemButton>
			</Paragraph>

			<TextField multiline
				rows={4}
				placeholder="Type your message..."
				value={message.content?.text ?? ''}
				onChange={(e) => handleTextChange(e.target.value)}
			/>

		</Card>

		<AccountFinderDialog
			isOpen={dialogOpen}
			onClose={handleDialogClose}
		/>
	</>
};

export default MessageView;