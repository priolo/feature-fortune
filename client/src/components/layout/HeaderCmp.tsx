import React from 'react';
import { Box, TextField, IconButton, Typography, SxProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import UserCmp from './UserCmp';
import layoutHeaderSo from '@/stores/layout';
import { useStore } from '@priolo/jon';



interface HeaderCmpProps {
}

const HeaderCmp: React.FC<HeaderCmpProps> = ({
}) => {

	// HOOKS
	const location = useLocation();

	// STORES
	const layoutHeaderState = useStore(layoutHeaderSo)

	// HELPERS
	const getPageTitle = () => {
		const path = location.pathname;
		
		if (path === '/app' || path === '/app/') return 'Features';
		if (path === '/app/account') return 'Account';
		if (path === '/app/login') return 'Login';
		if (path.startsWith('/app/feature/')) return 'Feature Details';
		
		return 'Startup Web App';
	};

	// RENDER

	return (
		<Box sx={sxRoot}>

			<Box sx={{ flex: 1 }}>
				<Typography variant="h4" sx={sxTitle}>
					{getPageTitle()}
				</Typography>
			</Box>

			<UserCmp />

		</Box>
	);
};

export default HeaderCmp;

const sxRoot: SxProps = {
	backgroundColor: 'white',
	borderBottom: '1px solid #e1e5e9',
	padding: '0 2rem',
	height: '70px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
	flexShrink: 0
}

const sxTitle: SxProps = {
	margin: 0,
	fontSize: '1.5rem',
	color: '#2c3e50',
	fontWeight: 600
}