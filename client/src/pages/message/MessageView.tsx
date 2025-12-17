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
import { useTranslation } from 'react-i18next';
import { useStore } from '@priolo/jon';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';



interface Props {
}

const MessageView: React.FC<Props> = ({
}) => {

	// STORES
	useStore(messageListSo)

	// HOOKS
	const { t } = useTranslation()
	const [dialogOpen, setDialogOpen] = useState(false)
	const accounts = React.useMemo<Account[]>(() => {
		if (!messageListSo.state.all) return []
		return getAllSenders(messageListSo.state.all);
	}, [messageListSo.state.all]);


	// HANDLERS
	const handleSendMessage = async () => {
		await messageListSo.sendSelected()
		dialogSo.dialogOpen({
			text: t("view.messages.MessageView.send"),
			modal: false,
			type: DIALOG_TYPE.SUCCESS,
		})
	}
	const handleMessageChange = (message: Message) => {
		messageListSo.setSelected(message)
	}



	const handleTextChange = (text: string) => {
		if (message.content == null) message.content = { text: '' };
		message.content.text = text;
		handleMessageChange({ ...message });
	};
	const handleDialogClose = async (account: Account) => {
		setDialogOpen(false)
		if (!account) return
		handleMessageChange({
			...message,
			content: { ...message.content, accountId: account.id }
		})
	}
	const handleCancelClick = () => {
		handleMessageChange(null)
	}


	// RENDER
	const message = messageListSo.state.selected
	if (!message) return null;
	const isDisabled = !message.content.accountId || !message.content?.text?.trim().length;

	return <>
		<Card sx={sxRoot}
			icon={<MessageIcon />}
			title={t("view.messages.MessageView.new_message")}
			titleEndRender={<>
				<Button size="small"
					onClick={handleCancelClick}
				>{t("common.cancel")}</Button>
				<Button variant="contained" size="small"
					startIcon={<Send />}
					disabled={isDisabled}
					onClick={handleSendMessage}
				>{t("common.send")}</Button>
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
				placeholder={t("view.messages.MessageView.placeholder")}
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