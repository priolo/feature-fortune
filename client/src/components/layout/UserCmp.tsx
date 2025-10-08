import authSo from '@/stores/auth/repo';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Menu, MenuItem, Button, SxProps } from '@mui/material';
import authApi from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import EmailVerifyDialog from '../email/EmailVerifyDialog';

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
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
	const userMenuOpen = Boolean(userMenuAnchorEl);
	const [emailVerifyOpen, setEmailVerifyOpen] = useState(false);


	// HANDLERS
	const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
		navigate('/app/login');
		//setAnchorEl(event.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);
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


	// EMAIL
	const handleEmailLogin = () => {
		setEmailVerifyOpen(true)
	}

	// GOOGLE
	// hook chiamato da google per il successo
    const handleLoginSuccess = (response: CredentialResponse) => {
        console.log('Login Success:', response);
        authSo.loginWithGoogle(response.credential)
    }
	// hook chiamato da google per il fallimento
    const handleLoginFailure = () => {
        console.log('Login Failure:');
    }

	// GITHUB
	const handleGithubLogin = () => {
		authSo.loginWithGithub()
		handleClose();
	};


	// RENDER
	if (!authSo.state.user) return (
		<Box sx={{ display: 'flex', gap: 1 }}>

			<Button variant="outlined"
				onClick={handleLoginClick}
			>LOGIN</Button>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleEmailLogin}>
					EMAIL
				</MenuItem>
				<MenuItem>
					<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                        />
                    </GoogleOAuthProvider>
				</MenuItem>
				<MenuItem onClick={handleGithubLogin}>
					🐙 GITHUB
				</MenuItem>
			</Menu>

			<EmailVerifyDialog
				isOpen={emailVerifyOpen}
				onClose={() => setEmailVerifyOpen(false)}
			/>
		</Box>
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