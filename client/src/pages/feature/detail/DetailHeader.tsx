import authSo from '@/stores/auth';
import featureDetailSo from '@/stores/feature/detail';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../layout/BackButton';
import { useStore } from '@priolo/jon';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import FeatureStatusChip from './StatusChip';
import { FEATURE_ACTIONS, FEATURE_STATUS } from '@/types/feature/Feature';



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

	const handleAuthorDeleteClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: "ATTENZIONE",
			text: `Tutti i FUNDERS verranno annullati e Il DEVELOPER non verrà pagato.
Questa FEATURE verrà chiusa definitivamente e non sarà modificabile.`,
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.ATH_CANCEL)
		dialogSo.dialogOpen({
			title: "Success",
			text: "Feature cancelled successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}
	const handleAuthorCompleteClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: "ATTENZIONE",
			text: `Dichiari che la FEATURE è completata. 
Quindi tra 24 ore i pagamenti al DEVELOPER verranno effettuati automaticamente.`,
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.ATH_COMPLETE)
		dialogSo.dialogOpen({
			title: "Success",
			text: "Feature completed successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}



	const handleDevAcceptClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: "Please wait",
			text: "Accepting the feature...",
			type: DIALOG_TYPE.INFO,
			modal: true,
		})
		console.log("RES", res)
		await featureDetailSo.action(FEATURE_ACTIONS.DEV_ACCEPT)
		dialogSo.dialogOpen({
			title: "Success",
			text: "Feature accepted successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleDevDeclineClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: "ATTENZIONE",
			text: `Stai rifiutando la FEATURE.`,
			labelCancel: "ANNULLA",
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		await featureDetailSo.action(FEATURE_ACTIONS.DEV_DECLINE)
		dialogSo.dialogOpen({
			title: "Success",
			text: "Feature declined successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleDevLeaveClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: "ATTENZIONE",
			text: `Stai abbandonado la FEATURE. 
Verrai rimosso come DEVELOPER e la FEATURE tornerà in stato PROPOSED.`,
			labelCancel: "ANNULLA",
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.DEV_LEAVE)
		dialogSo.dialogOpen({
			title: "Success",
			text: "You have left the feature successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleDevReleaseClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: "ATTENZIONE",
			text: `Dopo il rilascio, l'AUTHOR dovrà accettare o rifiutare
Se verrà accettata dopo 24 ore avverrà il pagamento.`,
			labelCancel: "ANNULLA",
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.DEV_RELEASE)
		dialogSo.dialogOpen({
			title: "Success",
			text: "Feature released successfully",
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleCancelClick = () => {
		navigate(-1)
	}

	// RENDER
	const feature = featureDetailSo.state.feature
	const featureLoaded = featureDetailSo.state.featureLoaded
	if (!feature) return null

	const logged = !!authSo.state.user
	const isNew = !feature?.id
	const isAuthor = logged && (isNew || feature?.accountId == authSo.state.user?.id)
	const isDeveloper = logged && (
		featureLoaded?.accountDevId == authSo.state.user?.id
		// se non c'e l'accountDevId, controllo githubId
		|| (featureLoaded?.accountDevId == null && !!authSo.state.user?.githubId && featureLoaded?.githubDevId == authSo.state.user?.githubId)
	)

	return <>

		{/* <BackButton /> */}

		<Typography variant="h5">
			FEATURE
		</Typography>

		{/* <FeatureStatusChip
			status={feature?.status}
		/> */}

		<Box sx={{ flex: 1 }}></Box>

		{/* <Button
			onClick={handleCancelClick}
		>BACK</Button> */}

		{isAuthor && feature.status == FEATURE_STATUS.PROPOSED && (
			<Button variant="contained"
				onClick={handleAuthorSaveClick}
			>{isNew ? "CREATE" : "MODIFY"}</Button>
		)}

		{isAuthor && feature.status == FEATURE_STATUS.IN_DEVELOPMENT && <>
			<Button
				onClick={handleAuthorDeleteClick}
			>DELETE</Button>
		</>}

		{isAuthor && feature.status == FEATURE_STATUS.RELEASED && <>
			<Button
				onClick={handleAuthorDeleteClick}
			>REJECT</Button>

			<Button variant="contained" color="secondary"
				onClick={handleAuthorCompleteClick}
			>COMPLETE!!</Button>
		</>}



		{isDeveloper && feature.status == FEATURE_STATUS.PROPOSED && <>
			<Button variant="contained" color="primary"
				onClick={handleDevAcceptClick}
			>ACCEPT</Button>
			<Button variant="contained" color="primary"
				onClick={handleDevDeclineClick}
			>DECLINE</Button>
		</>}

		{isDeveloper && feature.status == FEATURE_STATUS.IN_DEVELOPMENT && <>
			<Button variant="contained" color="primary"
				onClick={handleDevLeaveClick}
			>LEAVE</Button>
			<Button variant="contained" color="secondary"
				onClick={handleDevReleaseClick}
			>RELEASE</Button>
		</>}

	</>
}

export default FeatureDetailHeader;
