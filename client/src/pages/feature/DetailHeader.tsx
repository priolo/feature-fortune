import authSo from '@/stores/auth/repo';
import featureDetailSo from '@/stores/feature/detail';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../layout/BackButton';



const FeatureDetailHeader: React.FC = () => {

	// STORES

	// HOOKS
	const navigate = useNavigate()

	// HANDLERS
	const handleSaveClick = () => {
		featureDetailSo.saveFeature()
	}
	const handleCancelClick = () => {
		navigate(-1)
	}

	// RENDER
	const logged = !!authSo.state.user
	const isNew = !featureDetailSo.state.feature?.id
	const isOwner = featureDetailSo.state.feature?.accountId == authSo.state.user?.id
	const editable = logged && (isNew || isOwner)

	return <>

		<BackButton />

		<Typography variant="h5">
			FEATURE
		</Typography>

		<Box sx={{ flex: 1 }}></Box>

		{editable && <>

			<Button
				onClick={handleCancelClick}
			>Cancel</Button>

			<Button variant="contained" color="primary"
				onClick={handleSaveClick}
			>{isNew ? "Create" : "Modify"}</Button>
			
		</>}

	</>
}

export default FeatureDetailHeader;
