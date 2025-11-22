import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import { Close as CloseIcon, Error as ErrorIcon, Info as InfoIcon, ThumbUp as SuccessIcon, Warning as WarningIcon } from '@mui/icons-material';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Snackbar, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import { FunctionComponent } from 'react';



const MsgBox: FunctionComponent = () => {

	// STORE
	const dialogSa = useStore(dialogSo)


	// HOOKs


	// HANDLE


	// RENDER
	const data = typeData[dialogSa.type ?? DIALOG_TYPE.INFO]
	const colorBg = `${data.color}.main`
	const colorFg = `${data.color}.contrastText`

	if (!dialogSa.modal) return (
		<Snackbar
			ContentProps={{ sx: { bgcolor: colorBg, color: colorFg } }}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={dialogSa.isOpen}
			autoHideDuration={6000}
			onClose={() => dialogSo.dialogClose()}

			message={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				{data.icon}
				{dialogSa.text}
			</Box>}

			action={
				<IconButton size="small" color="inherit"
					onClick={dialogSo.dialogClose}
				><CloseIcon /></IconButton>
			}
		></Snackbar>
	)

	// RENDER

	return <Dialog
		open={dialogSa.isOpen}
		onClose={() => dialogSo.dialogClose(false)}
	>

		<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			{data.icon}
			{dialogSa.title}
		</DialogTitle>

		<DialogContent>
			<DialogContentText>
				{dialogSa.text}
			</DialogContentText>
		</DialogContent>

		<DialogActions>

			{dialogSa.labelCancel && (
				<Button color='inherit'
					onClick={() => dialogSo.dialogClose(false)}
				>{dialogSa.labelCancel}</Button>
			)}

			<Button color='primary' variant='contained'
				onClick={() => dialogSo.dialogClose(true)}
			>{dialogSa.labelOk}</Button>

		</DialogActions>

	</Dialog>

}

export default MsgBox

const typeData = {
	[DIALOG_TYPE.INFO]: {
		color: "primary",
		icon: <InfoIcon fontSize='medium' />
	},
	[DIALOG_TYPE.ERROR]: {
		color: "error",
		icon: <ErrorIcon fontSize='medium' />
	},
	[DIALOG_TYPE.SUCCESS]: {
		color: "success",
		icon: <SuccessIcon fontSize='medium' />
	},
	[DIALOG_TYPE.WARNING]: {
		color: "warning",
		icon: <WarningIcon fontSize='medium' />
	},
}
