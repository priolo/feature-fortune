import authSo from '@/stores/auth/repo';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface UserCmpProps {
}

const UserCmp: React.FC<UserCmpProps> = ({
}) => {

	// STORES
	useStore(authSo)

	
	// HOOKS
	useEffect(() => {
		authSo.current()
	}, [])


	// RENDER
	if (!authSo.state.user) return (
		<Box>LOGIN</Box>
	)
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 1,
				alignItems: 'center'
			}}
		>
			<Typography variant="h6" className="user-avatar">
				{authSo.state.user.name}
			</Typography>
			<Typography variant="body2" className="user-name">
				{authSo.state.user.email}
			</Typography>
		</Box>
	);
};

export default UserCmp;