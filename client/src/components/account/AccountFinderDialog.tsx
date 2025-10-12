import { Account } from "@/types/Account";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText, TextField, Box, DialogActions, Button, Avatar } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import accountApi from "@/api/account";



interface Props {

	/**
	 * se è true la dialog è aperta
	 */
	isOpen: boolean,

	/** 
	 * chiamata quando si clicca sul btt colose o fuori dalla dialog 
	 * restituisce l'item selezionato o null se si è chiusa senza selezionare nulla
	 */
	onClose: (account: Account | null) => void

}

const AccountFinderDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	onClose,
}) => {


	// HOOKs
	const [filterText, setFilterText] = React.useState('')
	const [items, setItems] = React.useState<Account[]>([])
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)

	useEffect(() => {
		const searchAccounts = async () => {
			if (filterText.length >= 3) {
				setLoading(true)
				setError(null)
				try {
					const result = await accountApi.index({ text: filterText })
					setItems(result)
				} catch (err) {
					setError('Failed to search accounts')
					setItems([])
				} finally {
					setLoading(false)
				}
			} else {
				setItems([])
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

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>Select Account</DialogTitle>

			<Box sx={{ px: 3, pb: 2 }}>
				<TextField
					fullWidth
					label="Search"
					variant="outlined"
					size="small"
					value={filterText || ''}
					onChange={handleFilterChange}
					placeholder="Type to filter accounts..."
				/>
			</Box>

			<List sx={{ maxHeight: 400, overflow: 'auto' }}>
				{loading && (
					<ListItem>
						<ListItemText primary="Searching..." />
					</ListItem>
				)}
				{error && (
					<ListItem>
						<ListItemText primary={error} />
					</ListItem>
				)}
				{!loading && !error && items.length === 0 && filterText.length >= 3 && (
					<ListItem>
						<ListItemText primary="No accounts found" />
					</ListItem>
				)}
				{!loading && !error && items.map((account) => (
					<ListItem key={account.id} disablePadding>
						<ListItemButton onClick={() => handleItemClick(account)}>
							<Avatar
								src={account.avatarUrl}
								alt={account.name}
								sx={{ width: 40, height: 40, mr: 2 }}
							>
								{!account.avatarUrl && account.name?.charAt(0).toUpperCase()}
							</Avatar>
							<ListItemText
								primary={account.name}
								secondary={
									<>
										<div>{account.email}</div>
										{account.emailVerified && <span>✓ Verified</span>}
									</>
								}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<DialogActions>
				<Button onClick={() => handleClose()}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}


export default AccountFinderDialog
