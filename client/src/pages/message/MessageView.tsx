import { Account } from '@/types/Account';
import { Message } from '@/types/Message';
import { Message as MessageIcon, Send } from '@mui/icons-material';
import { Button, ListItemButton, SxProps, TextField } from '@mui/material';
import React, { useState } from 'react';
import AccountFinderDialog from '../../components/account/AccountFinderDialog';
import AccountIdView from '../../components/account/AccountIdView';
import Card from '../../components/Card';
import messageListSo from '@/stores/message/list';
import { getAllSenders } from '@/stores/message/utils';



interface Props {
	message: Message;
	onChange: (message: Message) => void;
	onSendMessage: () => void;
}

const MessageView: React.FC<Props> = ({
	message,
	onChange,
	onSendMessage,
}) => {

	// HOOKS
	const [dialogOpen, setDialogOpen] = useState(false)
	const accounts = React.useMemo<Account[]>(() => {
		if (!messageListSo.state.all) return []
		return getAllSenders(messageListSo.state.all);
	}, [messageListSo.state.all]);


	// HANDLERS
	const handleTextChange = (text: string) => {
		if (message.content == null) message.content = { text: '' };
		message.content.text = text;
		onChange({ ...message });
	};
	const handleDialogClose = async (account: Account) => {
		setDialogOpen(false)
		if (!account) return
		onChange({
			...message,
			content: { ...message.content, accountId: account.id }
		})
	}
	const handleCancelClick = () => {
		onChange(null)
	}


	// RENDER
	if (!message) return null;
	const isDisabled = !message.content.accountId || !message.content?.text?.trim().length;

	return <>
		<Card sx={sxRoot}
			icon={<MessageIcon />}
			title="NEW MESSAGE"
			titleEndRender={<>
				<Button size="small"
					//startIcon={<Send />}
					onClick={handleCancelClick}
				>CANCEL</Button>
				<Button variant="contained" size="small"
					startIcon={<Send />}
					disabled={isDisabled}
					onClick={onSendMessage}
				>SEND</Button>
			</>}
		>
			{/* <Paragraph title="TO"> */}
			<ListItemButton
				onClick={() => setDialogOpen(true)}
			>
				<AccountIdView
					accountId={message.content?.accountId}
				/>
			</ListItemButton>
			{/* </Paragraph> */}

			<TextField multiline autoFocus
				rows={4}
				placeholder="Type your message..."
				value={message.content?.text ?? ''}
				onChange={(e) => handleTextChange(e.target.value)}
			/>

		</Card>

		<AccountFinderDialog
			isOpen={dialogOpen}
			suggestedAccounts={accounts}
			onClose={handleDialogClose}
		/>
	</>
};

export default MessageView;

const sxRoot: SxProps = {
	position: "sticky",
	top: 0,
	zIndex: 20,
	boxShadow: 5
}