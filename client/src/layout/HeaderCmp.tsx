import FeatureListHeader from '@/pages/feature/list/ListHeader';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Box, SxProps, IconButton, Tooltip, Button } from '@mui/material';
import { Mail as MailIcon } from '@mui/icons-material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
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

	// HOOKS
	const navigate = useNavigate();

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

				<Tooltip title="Messages">
					<IconButton onClick={handleMessagesClick} color="inherit" size="medium">
						<MailIcon />
					</IconButton>
				</Tooltip>

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

