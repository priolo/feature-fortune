import logo from '@/assets/logo.svg';
import logoLight from '@/assets/logo_light.svg';
import logoDark from '@/assets/logo_dark.svg';
import AccountHeader from '@/pages/account/AccountHeader';
import FeatureDetailHeader from '@/pages/feature/detail/DetailHeader';
import FeatureListHeader from '@/pages/feature/list/ListHeader';
import LoginHeader from '@/pages/login/LoginHeader';
import MessageHeader from '@/pages/message/MessageHeader';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Box, Button, SxProps } from '@mui/material';
import themeSo from '@/stores/layout/theme';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MessagesCmp from './MessagesCmp';
import UserCmp from './UserCmp';
import authSo from '@/stores/auth';
import BackButton from './BackButton';



interface HeaderCmpProps {
}

const HeaderCmp: React.FC<HeaderCmpProps> = ({
}) => {

	// STORES
	useStore(themeSo)
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
	const handleLogoClick = () => {
		navigate('/app/');
	}

	// Pick logo based on theme
	const logged = !!authSo.state.user;
	const isDark = themeSo.state.current?.palette?.mode === 'dark';
	const isHome = locationSo.state.current === LOCATION_PAGE.FeaturesList;
	const logo = isDark ? logoDark : logoLight;

	// RENDER
	return (
		<Box sx={sxRoot}>

			<Box sx={{ flex: 1, display: "flex", justifyContent: 'flex-end' }}>
				<Button sx={{ marginRight: '22px' }}
					onClick={handleLogoClick}
				><img src={logo} alt="Logo" style={{ height: 36, verticalAlign: 'middle' }} /></Button>
			</Box>

			<Box sx={{ flex: 1, display: "flex", minWidth: "800px", alignItems: "center" }}>
				{ !isHome &&
					<BackButton toHome />
				}
				<Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
					{header}
				</Box>
			</Box>

			<Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
				{logged && <MessagesCmp />}
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

