import accountApi from "@/api/account";
import { Account } from "@/types/Account";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import AccountViewer from "./AccountViewer";
import MessageBanner from "../MessageBanner";
import { useTranslation } from "react-i18next";



interface Props {

	/**
	 * se è true la dialog è aperta
	 */
	isOpen: boolean,

	/**
	 * account suggeriti da mostrare nella lista iniziale (prima della ricerca)
	 */
	suggestedAccounts?: Account[],

	/** 
	 * chiamata quando si clicca sul btt colose o fuori dalla dialog 
	 * restituisce l'item selezionato o null se si è chiusa senza selezionare nulla
	 */
	onClose: (account: Account | null) => void

}

const AccountFinderDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	suggestedAccounts,
	onClose,
}) => {


	// HOOKs
	const { t } = useTranslation()
	const [filterText, setFilterText] = React.useState('')
	let [items, setItems] = React.useState<Account[]>([])
	const [loading, setLoading] = React.useState(false)


	useEffect(() => {
		if (!isOpen) return
		setItems([])
		setFilterText('')
		setLoading(false)
	}, [isOpen])

	useEffect(() => {
		if (!isOpen) return

		const searchAccounts = async () => {
			if (filterText.length < 3) return
			setLoading(true)
			try {
				const result = await accountApi.index({ text: filterText })
				setItems(result?.accounts ?? [])
			} catch (err) {
				setItems([])
			} finally {
				setLoading(false)
			}
		}

		const debounceTimer = setTimeout(() => {
			searchAccounts()
		}, 300)

		return () => clearTimeout(debounceTimer)
	}, [filterText])



	// HANDLERS
	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		onClose(null)
	}

	const handleItemClick = async (account: Account) => {
		onClose(account)
	}

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterText(event.target.value)
	}


	// RENDER 
	if (!loading && items.length == 0 && filterText.length < 3) {
		items = suggestedAccounts ?? []
	}

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>Select Account</DialogTitle>

			{loading && <LinearProgress />}

			<Box sx={{ px: 3, pb: 2 }}>
				<TextField autoFocus
					value={filterText ?? ''}
					onChange={handleFilterChange}
					placeholder={t("cards.AccountFinderDialog.placeholder")}
				/>
			</Box>

			<DialogContent>

				<List sx={{ maxHeight: 400, overflow: 'auto' }}>
					{loading && (
						<ListItem>
							<ListItemText primary="Searching..." />
						</ListItem>
					)}
					{!loading && items.map((account) => (
						<ListItem key={account.id} disablePadding>
							<ListItemButton onClick={() => handleItemClick(account)}>
								<AccountViewer account={account} />
							</ListItemButton>
						</ListItem>
					))}
					{!loading && items.length === 0 && (
						<MessageBanner>
							{t("cards.AccountFinderDialog.empty")}
						</MessageBanner>
					)}
				</List>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => handleClose()}>
					{t("common.cancel")}
				</Button>
			</DialogActions>

		</Dialog>
	)
}


export default AccountFinderDialog
