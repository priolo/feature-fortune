import FeatureListHeader from '@/pages/feature/list/ListHeader';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import messageListSo from '@/stores/message/list';
import { Box, SxProps, IconButton, Tooltip, Button, Badge } from '@mui/material';
import { Mail as MailIcon } from '@mui/icons-material';
import { useStore } from '@priolo/jon';
import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCmp from './UserCmp';
import FeatureDetailHeader from '@/pages/feature/detail/DetailHeader';
import LoginHeader from '@/pages/login/LoginHeader';
import AccountHeader from '@/pages/account/AccountHeader';
import MessageHeader from '@/pages/message/MessageHeader';



interface HeaderCmpProps {
}

const HeaderCmp: React.FC<HeaderCmpProps> = ({
}) => {

	// STORES
	useStore(locationSo)
	useStore(messageListSo)

	// HOOKS
	const navigate = useNavigate();

	useEffect(() => {
		messageListSo.fetchUnreadCount();
		const interval = setInterval(() => {
			messageListSo.fetchUnreadCount();
		}, 60000);
		return () => clearInterval(interval);
	}, []);

	const header = useMemo(() => {
		return {
			[LOCATION_PAGE.FeaturesList]: <FeatureListHeader />,
			[LOCATION_PAGE.FeatureDetail]: <FeatureDetailHeader />,
			[LOCATION_PAGE.Login]: <LoginHeader />,
			[LOCATION_PAGE.Account]: <AccountHeader />,
			[LOCATION_PAGE.Messages]: <MessageHeader />,
		}[locationSo.state.current]
	}, [locationSo.state.current])

	// HANDLERS
	const handleMessagesClick = () => {
		navigate('/app/messages');
	};
	const handleLogoClick = () => {
		navigate('/app/');
	}

	// RENDER
	return (
		<Box sx={sxRoot}>

			<Box sx={{ flex: 1 }}>
				<Button
					onClick={handleLogoClick}
				>LOGO</Button>
			</Box>

			<Box sx={{ flex: 1, display: "flex", minWidth: "800px", alignItems: "center", gap: 2 }}>
				{header}
			</Box>

			<Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>


				<IconButton color="inherit" size="medium"
					onClick={handleMessagesClick}
				>
					<Badge badgeContent={messageListSo.state.unreadCount} color="error">
						<MailIcon />
					</Badge>
				</IconButton>

				<UserCmp />

			</Box>

		</Box>
	);
};

export default HeaderCmp;

const sxRoot: SxProps = {
	backgroundColor: 'background.paper',
	borderBottom: 1,
	borderColor: 'divider',
	padding: '0 2rem',
	height: '70px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	boxShadow: 1,
	flexShrink: 0
}

