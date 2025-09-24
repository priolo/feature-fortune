import authSo from '@/stores/auth/repo';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Menu, MenuItem, Button } from '@mui/material';
import authApi from '@/api/auth';

interface UserCmpProps {
}

const UserCmp: React.FC<UserCmpProps> = ({
}) => {

	// STORES
	useStore(authSo)

	// STATE
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
	const userMenuOpen = Boolean(userMenuAnchorEl);

	// HANDLERS
	const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleGoogleLogin = () => {
		// TODO: Implement Google login
		console.log('Google login clicked');
		handleClose();
	};

	const handleGithubLogin = () => {
		console.log('GitHub login clicked');
		authSo.loginWithGithub()
		handleClose();
	};

	const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
		setUserMenuAnchorEl(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setUserMenuAnchorEl(null);
	};

	const handleLogout = async () => {
		await authSo.logout()
		handleUserMenuClose();
	};


	// HOOKS
	useEffect(() => {
		authSo.current()
	}, [])


	// RENDER
	if (!authSo.state.user) return (
		<Box sx={{ display: 'flex', gap: 1 }}>
			<Box>REGISTER</Box>
			<Button
				variant="outlined"
				onClick={handleLoginClick}
				aria-controls={open ? 'login-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				LOGIN
			</Button>
			<Menu
				id="login-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'login-button',
				}}
			>
				<MenuItem onClick={handleGoogleLogin}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						🔗 GOOGLE
					</Box>
				</MenuItem>
				<MenuItem onClick={handleGithubLogin}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						🐙 GITHUB
					</Box>
				</MenuItem>
			</Menu>
		</Box>
	)

	return (
		<Box>
			<Box 
				sx={{ 
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
				}}
				onClick={handleUserClick}
				aria-controls={userMenuOpen ? 'user-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={userMenuOpen ? 'true' : undefined}
			>

				<Typography variant="h6" className="user-avatar">
					{authSo.state.user.name}
				</Typography>

				<Typography variant="body2" className="user-name">
					{authSo.state.user.email}
				</Typography>

			</Box>
			<Menu
				id="user-menu"
				anchorEl={userMenuAnchorEl}
				open={userMenuOpen}
				onClose={handleUserMenuClose}
				MenuListProps={{
					'aria-labelledby': 'user-button',
				}}
			>
				<MenuItem onClick={handleLogout}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						🚪 LOGOUT
					</Box>
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default UserCmp;
