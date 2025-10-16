import FeatureListHeader from '@/pages/feature/list/ListHeader';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Box, SxProps, IconButton, Tooltip, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Language as LanguageIcon, Mail as MailIcon } from '@mui/icons-material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserCmp from './UserCmp';
import FeatureDetailHeader from '@/pages/feature/detail/DetailHeader';
import LoginHeader from '@/pages/login/LoginHeader';
import AccountHeader from '@/pages/account/AccountHeader';
import MessageHeader from '@/pages/message/MessageHeader';
import themeSo from '@/stores/layout/theme';



interface HeaderCmpProps {
}

const HeaderCmp: React.FC<HeaderCmpProps> = ({
}) => {

	// STORES
	useStore(locationSo)
	const themeSa = useStore(themeSo);

	// HOOKS
	const { i18n } = useTranslation();
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
	const handleThemeToggle = () => {
		themeSo.toggleMode();
	};

	const handleLanguageChange = (event: SelectChangeEvent<string>) => {
		i18n.changeLanguage(event.target.value);
	};

	const handleMessagesClick = () => {
		navigate('/app/messages');
	};

	// RENDER
	return (
		<Box sx={sxRoot}>

			<Box sx={{ flex: 1 }}>
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

				<Select
					value={i18n.language}
					onChange={handleLanguageChange}
					variant="standard"
					sx={{
						color: 'text.primary',
						'&:before': { borderBottom: 'none' },
						'&:after': { borderBottom: 'none' },
						'&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
						'.MuiSelect-select': { paddingTop: 0, paddingBottom: 0 }
					}}
				>
					<MenuItem value="en">English</MenuItem>
					{/* Add more languages here as needed */}
				</Select>

				<Tooltip title={themeSa.mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
					<IconButton onClick={handleThemeToggle} color="inherit" size="medium">
						{themeSa.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
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

