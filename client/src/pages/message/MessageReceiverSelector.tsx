import SelectorDialogBase from '@/components/SelectorDialogBase';
import messageListSo from '@/stores/message/list';
import { removeDuplicate } from '@/stores/message/utils';
import { Account } from '@/types/Account';
import { Chip } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';



interface Props {
	receiverId?: string | null;
	onChange: (accountId: string | null) => void;
}

const AccountSystem: Account = {
	id: "sys",
	name: 'SYSTEM',
	email: '',
};

const MessageReceiverSelector: React.FC<Props> = ({
	receiverId,
	onChange,
}) => {

	useStore(messageListSo);

	const [isOpen, setIsOpen] = React.useState(false);

	const receivers = React.useMemo<Account[]>(() => {
		if (!messageListSo.state.all) return []

		const acc = new Map<string, Account>();
		for (const message of messageListSo.state.all) {
			const content = message.content;
			const accountId = content?.accountId ?? content?.account?.id;
			if (!accountId || acc.has(accountId)) continue;
			acc.set(accountId, content?.account)
		}
		const sorted = Array.from(acc.values())
			.sort((acc1, acc2) => acc1.name.localeCompare(acc2.name))

		return [AccountSystem, ...sorted];
	}, [messageListSo.state.all]);

	const selected = receivers.find((account) => account.id === receiverId);
	const chipLabel = selected?.name ?? 'ALL RECEIVERS';

	const handleClose = (account: Account) => {
		setIsOpen(false);
		onChange(account?.id);
	}

	return <>

		<Chip
			label={chipLabel}
			onClick={() => setIsOpen(true)}
			onDelete={selected ? () => onChange(null) : undefined}
		/>

		<SelectorDialogBase
			title="FILTER BY RECEIVER"
			idSelect={selected?.id ?? undefined}
			items={receivers}
			fnTextFromItem={(account: Account) => account.name}
			//fnSecondaryFromItem={(item) => item.subtitle}
			fnIdFromItem={(account: Account) => account.id}
			isOpen={isOpen}
			onClose={handleClose}
		/>

	</>;
};

export default MessageReceiverSelector;
