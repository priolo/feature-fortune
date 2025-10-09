import authSo from '@/stores/auth/repo';
import { Box, Button, Menu, MenuItem, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



interface UserCmpProps {
}

const UserCmp: React.FC<UserCmpProps> = ({
}) => {

	// STORES
	useStore(authSo)

	
	// HOOKS
	const navigate = useNavigate();
	useEffect(() => {
		authSo.current()
	}, [])


	// STATE
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
	const userMenuOpen = Boolean(userMenuAnchorEl);


	// HANDLERS
	const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
		navigate('/app/login');
		//setAnchorEl(event.currentTarget);
	};
	const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
		setUserMenuAnchorEl(event.currentTarget);
	};
	const handleUserMenuClose = () => {
		setUserMenuAnchorEl(null);
	};

	// va alla pagina ACCOUNT
	const handleAccount = async () => {
		navigate('/app/account');
		handleUserMenuClose();
	}

	// fa il logout
	const handleLogout = async () => {
		await authSo.logout()
		handleUserMenuClose();
	}


	// RENDER
	if (!authSo.state.user) return (
		<Button
			onClick={handleLoginClick}
		>LOGIN</Button>
	)

	return <>
		<Box sx={sxUser}
			onClick={handleUserClick}
		>
			<Typography variant="h6" className="user-avatar">
				{authSo.state.user.name}
			</Typography>

			<Typography variant="body2" className="user-name">
				{authSo.state.user.email}
			</Typography>
		</Box>
		<Menu anchorEl={userMenuAnchorEl}
			open={userMenuOpen}
			onClose={handleUserMenuClose}
		>
			<MenuItem onClick={handleAccount}>
				ACCOUNT
			</MenuItem>
			<MenuItem onClick={handleLogout}>
				LOGOUT
			</MenuItem>
		</Menu>
	</>
};

export default UserCmp;

const sxUser: SxProps = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
	alignItems: 'center',
	cursor: 'pointer',
	padding: 1,
	borderRadius: 1,
	'&:hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.04)'
	}
}