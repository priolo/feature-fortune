import authSo from '@/stores/auth';
import featureDetailSo from '@/stores/feature/detail';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import { FEATURE_ACTIONS, FEATURE_STATUS } from '@/types/feature/Feature';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import { useTranslation } from 'react-i18next';



const FeatureDetailHeader: React.FC = () => {

	// STORES
	useStore(featureDetailSo)


	// HOOKS
	const { t } = useTranslation()


	// HANDLERS
	const handleAuthorSaveClick = async () => {
		await featureDetailSo.save()
		dialogSo.dialogOpen({
			text: t("header.feature.message.modify"),
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}


	const handleAuthorDeleteClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: t("header.feature.dialog.warning"),
			text: t("header.feature.dialog.delete"),
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.ATH_CANCEL)
		dialogSo.dialogOpen({
			text: t("header.feature.message.delete"),
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}
	const handleAuthorRejectClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: t("header.feature.dialog.warning"),
			text: t("header.feature.dialog.reject"),
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.ATH_REJECTED)
		dialogSo.dialogOpen({
			text: t("header.feature.message.reject"),
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}
	const handleAuthorCompleteClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: t("header.feature.dialog.warning"),
			text: t("header.feature.dialog.complete"),
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.ATH_COMPLETE)
		dialogSo.dialogOpen({
			text: t("header.feature.message.complete"),
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}


	const handleDevAcceptClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: t("header.feature.dialog.warning"),
			text: t("header.feature.dialog.accept"),
			type: DIALOG_TYPE.INFO,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.DEV_ACCEPT)
		dialogSo.dialogOpen({
			text: t("header.feature.message.accept"),
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleDevDeclineClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: t("header.feature.dialog.warning"),
			text: t("header.feature.dialog.decline"),
			labelCancel: "ANNULLA",
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.DEV_DECLINE)
		dialogSo.dialogOpen({
			text: t("header.feature.message.decline"),
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleDevLeaveClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: t("header.feature.dialog.warning"),
			text: t("header.feature.dialog.leave"),
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.DEV_LEAVE)
		dialogSo.dialogOpen({
			text: t("header.feature.message.leave"),
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
	}

	const handleDevReleaseClick = async () => {
		const res = await dialogSo.dialogOpen({
			title: t("header.feature.dialog.warning"),
			text: t("header.feature.dialog.release"),
			type: DIALOG_TYPE.WARNING,
			modal: true,
		})
		if (!res) return
		await featureDetailSo.action(FEATURE_ACTIONS.DEV_RELEASE)
		dialogSo.dialogOpen({
			text: t("header.feature.message.release"),
			type: DIALOG_TYPE.SUCCESS,
			modal: false,
		})
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
	const canSave = !!feature.githubRepoId && !!feature.title && !!feature.description


	return <>

		<Typography variant="h5">
			{t("header.feature.title", "FEATURE")}
		</Typography>

		<Box sx={{ flex: 1 }}></Box>


		{isAuthor && feature.status == FEATURE_STATUS.IN_DEVELOPMENT || feature.status == FEATURE_STATUS.PROPOSED && <>
			<Tooltip title={t(`header.feature.tooltip.delete`)}>
				<Button
					onClick={handleAuthorDeleteClick}
				>{t("header.feature.label.delete", "DELETE")}</Button>
			</Tooltip>
		</>}

		{isAuthor && feature.status == FEATURE_STATUS.PROPOSED && (
			<Tooltip title={t(`header.feature.tooltip.${canSave ? "save_yes" : "save_no"}`)}><div>
				<Button variant="contained"
					onClick={handleAuthorSaveClick}
					disabled={!canSave}
				>{t(`header.feature.label.${isNew ? "create" : "modify"}`)}</Button>
			</div></Tooltip>
		)}

		{isAuthor && feature.status == FEATURE_STATUS.RELEASED && <>
			<Tooltip title={t(`header.feature.tooltip.reject`)}>
				<Button
					onClick={handleAuthorRejectClick}
				>{t("header.feature.label.reject", "REJECT")}</Button>
			</Tooltip>

			<Tooltip title={t(`header.feature.tooltip.complete`)}>
				<Button variant="contained" color="secondary"
					onClick={handleAuthorCompleteClick}
				>{t("header.feature.label.complete", "COMPLETE")}</Button>
			</Tooltip>
		</>}



		{isDeveloper && feature.status == FEATURE_STATUS.PROPOSED && <>
			<Tooltip title={t(`header.feature.tooltip.accept`)}>
				<Button variant="contained" color="primary"
					onClick={handleDevAcceptClick}
				>{t("header.feature.label.accept", "ACCEPT")}</Button>
			</Tooltip>

			<Tooltip title={t(`header.feature.tooltip.decline`)}>
				<Button variant="contained" color="primary"
					onClick={handleDevDeclineClick}
				>{t("header.feature.label.decline", "DECLINE")}</Button>
			</Tooltip>
		</>}

		{isDeveloper && feature.status == FEATURE_STATUS.IN_DEVELOPMENT && <>
			<Tooltip title={t(`header.feature.tooltip.leave`)}>
				<Button variant="contained" color="primary"
					onClick={handleDevLeaveClick}
				>{t("header.feature.label.leave", "LEAVE")}</Button>
			</Tooltip>

			<Tooltip title={t(`header.feature.tooltip.release`)}>
				<Button variant="contained" color="secondary"
					onClick={handleDevReleaseClick}
				>{t("header.feature.label.release", "RELEASE")}</Button>
			</Tooltip>
		</>}

	</>
}

export default FeatureDetailHeader;
