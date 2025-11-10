import authSo from '@/stores/auth/repo';
import featureDetailSo from '@/stores/feature/detail';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../layout/BackButton';
import { useStore } from '@priolo/jon';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import FeatureStatusChip from './StatusChip';
import { FEATURE_STATUS } from '@/types/feature/Feature';



const FeatureDetailHeader: React.FC = () => {

	// STORES
	useStore(featureDetailSo)

	// HOOKS
	const navigate = useNavigate()

	// HANDLERS
	const handleAuthorSaveClick = async () => {
		await featureDetailSo.save()
		dialogSo.dialogOpen({
			title: "Success",
			text: "Feature saved successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleDevAcceptClick = async () => {
		//await featureDetailSo.devAcceptFeature()
		dialogSo.dialogOpen({
			title: "Success",
			text: "Feature accepted successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleDevDeclineClick = async () => {
		//await featureDetailSo.devDeclineFeature()
		dialogSo.dialogOpen({
			title: "Success",
			text: "Feature declined successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleCancelClick = () => {
		navigate(-1)
	}

	// RENDER
	const feature = featureDetailSo.state.feature
	if (!feature) return null

	const logged = !!authSo.state.user
	const isNew = !feature?.id
	const isAuthor = logged && (isNew || feature?.accountId == authSo.state.user?.id)
	const isDeveloper = logged && (
		feature?.accountDevId == authSo.state.user?.id
		|| (feature?.accountDevId == null && feature?.githubDevId == authSo.state.user?.githubId)
	)

	const canAuthorEdit = isAuthor && feature.status == FEATURE_STATUS.PROPOSED
	const canDevEdit = isDeveloper && feature.status == FEATURE_STATUS.PROPOSED
	const canEdit = canAuthorEdit || canDevEdit

	return <>

		<BackButton />

		<Typography variant="h5">
			FEATURE
		</Typography>

		<FeatureStatusChip
			status={feature?.status}
		/>

		<Box sx={{ flex: 1 }}></Box>

		{canEdit && <>

			<Button
				onClick={handleCancelClick}
			>BACK</Button>

			{canAuthorEdit && (
				<Button variant="contained" color="primary"
					onClick={handleAuthorSaveClick}
				>{isNew ? "CREATE" : "MODIFY"}</Button>
			)}

			{canDevEdit && <>
				<Button variant="contained" color="primary"
					onClick={handleDevAcceptClick}
				>ACCEPT</Button>
				<Button variant="contained" color="primary"
					onClick={handleDevDeclineClick}
				>DECLINE</Button>
			</>}

		</>}

	</>
}

export default FeatureDetailHeader;
