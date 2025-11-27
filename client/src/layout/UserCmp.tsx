import authSo from '@/stores/auth';
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, Menu, MenuItem, SxProps, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarCmp from '@/components/AvatarCmp';
import { AccountCircle, Logout } from '@mui/icons-material';



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
			color="inherit"
		>LOGIN</Button>
	)

	return <>
		<Box sx={sxUser}
			onClick={handleUserClick}
		>
			<AvatarCmp
				account={authSo.state.user}
				sx={{ width: 32, height: 32 }}
			/>

		</Box>
		<Menu anchorEl={userMenuAnchorEl}
			open={userMenuOpen}
			onClose={handleUserMenuClose}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>

				<Box sx={{ px: 2, py: 1.5, display: "flex", flexDirection: "column" }}>
					<Typography variant="subtitle1" noWrap>
						{authSo.state.user.name}
					</Typography>
					<Typography variant="body2" color="text.secondary" noWrap>
						{authSo.state.user.email}
					</Typography>
				</Box>

				<Divider />

				<List>
					<ListItemButton onClick={handleAccount}>
						ACCOUNT
					</ListItemButton>
					<ListItemButton onClick={handleLogout}>
						LOGOUT
					</ListItemButton>
				</List>

			</Box>
		</Menu>
	</>
};

export default UserCmp;

const sxUser: SxProps = {
	display: 'flex',
	flexDirection: 'row',
	gap: 1,
	alignItems: 'center',
	cursor: 'pointer',
	padding: '4px 8px',
	borderRadius: 2,
	transition: 'background-color 0.2s',
	'&:hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.04)'
	}

}