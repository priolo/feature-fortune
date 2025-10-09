import gitHubApi from "@/api/github";
import { GitHubUser } from "@/types/github/GitHub";
import { Box, Button, Dialog, DialogActions, DialogTitle, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";



interface Props {

	/**
	 * se è true la dialog è aperta
	 */
	isOpen: boolean,

	/** 
	 * chiamata quando si clicca sul btt colose o fuori dalla dialog 
	 * restituisce l'item selezionato o null se si è chiusa senza selezionare nulla
	 */
	onClose: (repo: GitHubUser) => void

}

const GithubUsersFinderDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	onClose,
}) => {


	// HOOKs
	const [filterText, setFilterText] = React.useState('')
	const [items, setItems] = React.useState<GitHubUser[]>([])
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)

	useEffect(() => {
		const searchRepositories = async () => {
			if (filterText.length >= 3) {
				setLoading(true)
				setError(null)
				try {
					const result = await gitHubApi.searchUsers(filterText, 10)
					setItems(result)
				} catch (err) {
					setError('Failed to search repositories')
					setItems([])
				} finally {
					setLoading(false)
				}
			} else {
				setItems([])
			}
		}

		const debounceTimer = setTimeout(() => {
			searchRepositories()
		}, 300)

		return () => clearTimeout(debounceTimer)
	}, [filterText])




	// HANDLERS
	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		onClose(null)
	}

	const handleItemClick = async (user: GitHubUser) => {
		onClose(user)
	}

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterText(event.target.value)
	}


	// RENDER 

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>Select GitHub User</DialogTitle>

			<Box sx={{ px: 3, pb: 2 }}>
				<TextField
					fullWidth
					label="Search"
					variant="outlined"
					size="small"
					value={filterText || ''}
					onChange={handleFilterChange}
					placeholder="Type to filter items..."
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
						<ListItemText primary="No repositories found" />
					</ListItem>
				)}
				{!loading && !error && items.map((user) => (
					<ListItem key={user.id} disablePadding>
						<ListItemButton onClick={() => handleItemClick(user)}>
							<ListItemText
								primary={user.login}
								// secondary={
								// 	<>
								// 		{user. && <div>{user.description}</div>}
								// 		<div>⭐ {user.stargazers_count} stars • {user.language || 'Unknown'}</div>
								// 	</>
								// }
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


export default GithubUsersFinderDialog



