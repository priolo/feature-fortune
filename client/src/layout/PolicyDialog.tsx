import dialogSo from '@/stores/layout/dialogStore';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import { FunctionComponent } from 'react';
import { Trans, useTranslation } from 'react-i18next';



const PolicyDialog: FunctionComponent = () => {

	// STORE
	useStore(dialogSo)

	// HOOKs
	const { t } = useTranslation()

	// HANDLE

	// RENDER
	return <Dialog maxWidth="lg" fullWidth
		open={dialogSo.state.isPolicyOpen}
		onClose={() => dialogSo.setIsPolicyOpen(false)}
	>

		<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			{t("policy.title")}
		</DialogTitle>

		<DialogContent>
			<DialogContentText>
				<Trans
					i18nKey="policy.content"
					components={{
						// title
						"title": <Typography variant='h6' />,
						"subtitle": <Typography variant='body1' sx={{ mb: 2 }} />,
					}}
				/>
			</DialogContentText>
		</DialogContent>

		<DialogActions>
			<Button color='primary' variant='contained'
				onClick={() => dialogSo.setIsPolicyOpen(false)}
			>{t("policy.button_ok")}</Button>
		</DialogActions>

	</Dialog>

}

export default PolicyDialog
