import accountApi from "@/api/account";
import { Account } from "@/types/Account";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import AccountViewer from "./AccountViewer";



interface Props {

	/**
	 * se è true la dialog è aperta
	 */
	isOpen: boolean,

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
	const [filterText, setFilterText] = React.useState('')
	const [items, setItems] = React.useState<Account[]>([])
	const [loading, setLoading] = React.useState(false)

	useEffect(() => {
		if (!isOpen) return

		const searchAccounts = async () => {
			if (filterText.length < 3) return
			setLoading(true)
			try {
				const result = await accountApi.index({ text: filterText })
				setItems(result)
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

	const canShowSuggestions = !loading && items.length === 0 && (suggestedAccounts?.length ?? 0) > 0
	const accountsToRender = canShowSuggestions ? (suggestedAccounts ?? []) : items
	const showEmptyState = !loading && accountsToRender.length === 0 && filterText.length >= 3


	// RENDER 

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>Select Account</DialogTitle>

			{loading && <LinearProgress />}

			<Box sx={{ px: 3, pb: 2 }}>
				<TextField autoFocus
					value={filterText ?? ''}
					onChange={handleFilterChange}
					placeholder="Type to filter accounts..."
				/>
			</Box>

			<DialogContent>

				<List sx={{ maxHeight: 400, overflow: 'auto' }}>
					{loading && (
						<ListItem>
							<ListItemText primary="Searching..." />
						</ListItem>
					)}
					{canShowSuggestions && (
						<ListItem>
							<ListItemText primary="Suggested accounts" secondary="No matches found, try one of these." />
						</ListItem>
					)}
					{showEmptyState && (
						<ListItem>
							<ListItemText primary="No accounts found" />
						</ListItem>
					)}
					{!loading && accountsToRender.map((account) => (
						<ListItem key={account.id} disablePadding>
							<ListItemButton onClick={() => handleItemClick(account)}>
								<AccountViewer account={account} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => handleClose()}>Cancel</Button>
			</DialogActions>

		</Dialog>
	)
}


export default AccountFinderDialog
