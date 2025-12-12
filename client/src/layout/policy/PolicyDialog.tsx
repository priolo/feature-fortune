import dialogSo from '@/stores/layout/dialogStore';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useStore } from '@priolo/jon';
import { FunctionComponent, lazy, Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';



const docs: Record<string, React.LazyExoticComponent<FunctionComponent>> = {
	en: lazy(() => import('./docs/PolicyEn')),
	it: lazy(() => import('./docs/PolicyIt')),
}

const PolicyDialog: FunctionComponent = () => {

	// STORE
	useStore(dialogSo)

	// HOOKs
	const { t, i18n } = useTranslation()
	const DocCmp = useMemo(() => docs[i18n.language] || docs['en'], [i18n.language])

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
			<Suspense fallback={<CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}>
				<DocCmp />
			</Suspense>
		</DialogContent>

		<DialogActions>
			<Button color='primary' variant='contained'
				onClick={() => dialogSo.setIsPolicyOpen(false)}
			>{t("policy.button_ok")}</Button>
		</DialogActions>

	</Dialog>

}

export default PolicyDialog
