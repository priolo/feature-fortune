import gitHubApi from "@/api/githubService";
import { GitHubUser } from "@/types/github/GitHub";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import GithubUserViewer from "./GithubUserViewer";



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

	useEffect(() => {
		if (!isOpen) return

		const searchRepositories = async () => {
			if (filterText.length < 3) return
			setLoading(true)
			try {
				const result = await gitHubApi.searchUsers(filterText, 10)
				setItems(result)
			} catch (err) {
				setItems([])
			} finally {
				setLoading(false)
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

		<Dialog onClose={handleClose} open={isOpen} maxWidth="xs">

			<DialogTitle>Select GitHub User</DialogTitle>

			{loading && <LinearProgress />}

			<Box sx={{ px: 3, pb: 2 }}>
				<TextField
					value={filterText || ''}
					onChange={handleFilterChange}
					placeholder="Type to filter items..."
				/>
			</Box>

			<DialogContent>
				<List sx={{ maxHeight: 400, overflow: 'auto' }}>
					{loading && (
						<ListItem>
							<ListItemText primary="Searching..." />
						</ListItem>
					)}
					{!loading && items.map((user) => (
						<ListItem key={user.id} disablePadding>
							<ListItemButton onClick={() => handleItemClick(user)}>
								<GithubUserViewer user={user} />
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

export default GithubUsersFinderDialog



