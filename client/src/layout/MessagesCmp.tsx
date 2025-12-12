import React, { useEffect } from 'react';
import { IconButton, Badge } from '@mui/material';
import { Mail as MailIcon } from '@mui/icons-material';
import { useStore } from '@priolo/jon';
import { useNavigate } from 'react-router-dom';
import messageListSo from '@/stores/message/list';

const MessagesCmp: React.FC = () => {

	// STORE
	useStore(messageListSo);

	
	// HOOKS
	const navigate = useNavigate();

	useEffect(() => {
		messageListSo.fetchUnreadCount();
		const interval = setInterval(() => {
			messageListSo.fetchUnreadCount();
		}, 60000);
		return () => clearInterval(interval);
	}, []);


	// HANDLERS
	const handleMessagesClick = () => {
		navigate('/app/messages');
	};

	return (
		<IconButton color="inherit" size="medium" onClick={handleMessagesClick}>
			<Badge badgeContent={messageListSo.state.unreadCount} color="primary">
				<MailIcon />
			</Badge>
		</IconButton>
	);
};

export default MessagesCmp;
