import authSo from '@/stores/auth/repo';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import { Box, Button, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import { useNavigate } from 'react-router-dom';



const FeatureListHeader: React.FC = () => {

	// STORES
	useStore(authSo)

	// HOOKS
	const navigate = useNavigate()

	// HANDLERS
	const handleNewFeatureClick = () => {
		navigate('/app/feature/new')
	}

	// RENDER
	const logged = !!authSo.state.user

	return <>
		<Typography variant="h5">
			FEATURES
		</Typography>
		<Box sx={{ flex: 1 }}></Box>

		{logged &&
			<Button variant="contained" color="primary"
				onClick={handleNewFeatureClick}
			>New Feature</Button>
		}
	</>
}

export default FeatureListHeader;
