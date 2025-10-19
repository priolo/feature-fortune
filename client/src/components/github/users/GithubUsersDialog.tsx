import { GitHubUser } from "@/types/github/GitHub";
import { 
	Dialog, 
	DialogTitle, 
	List, 
	ListItem, 
	ListItemButton, 
	ListItemText, 
	TextField, 
	Box, 
	DialogActions, 
	Button,
	Avatar,
	ListItemAvatar
} from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";

interface Props {
	/**
	 * se è true la dialog è aperta
	 */
	isOpen: boolean,

	/**
	 * lista degli utenti da mostrare nella dialog
	 */
	users: GitHubUser[] | null,

	/** 
	 * chiamata quando si clicca sul btt close o fuori dalla dialog 
	 * restituisce l'item selezionato o null se si è chiusa senza selezionare nulla
	 */
	onClose: (user: GitHubUser | null) => void
}

const GithubUsersDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	users,
	onClose,
}) => {

	// HOOKs
	const [filterText, setFilterText] = React.useState('')
	const [filteredUsers, setFilteredUsers] = React.useState<GitHubUser[]>([])

	useEffect(() => {
		if (!users) {
			setFilteredUsers([])
			return
		}

		if (!filterText.trim()) {
			setFilteredUsers(users)
		} else {
			const filtered = users.filter(user => 
				user.login.toLowerCase().includes(filterText.toLowerCase()) ||
				(user.name && user.name.toLowerCase().includes(filterText.toLowerCase())) ||
				(user.email && user.email.toLowerCase().includes(filterText.toLowerCase()))
			)
			setFilteredUsers(filtered)
		}
	}, [users, filterText])

	// HANDLERS
	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		onClose?.(null)
	}

	const handleItemClick = async (user: GitHubUser) => {
		onClose?.(user)
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
					placeholder="Type to filter users..."
				/>
			</Box>

			<List sx={{ maxHeight: 400, overflow: 'auto' }}>
				{!users && (
					<ListItem>
						<ListItemText primary="No users available" />
					</ListItem>
				)}
				{users && filteredUsers.length === 0 && filterText.trim() && (
					<ListItem>
						<ListItemText primary="No users found matching your search" />
					</ListItem>
				)}
				{users && filteredUsers.length === 0 && !filterText.trim() && (
					<ListItem>
						<ListItemText primary="No users available" />
					</ListItem>
				)}
				{filteredUsers.map((user) => (
					<ListItem key={user.id} disablePadding>
						<ListItemButton onClick={() => handleItemClick(user)}>
							<ListItemAvatar>
								<Avatar 
									src={user.avatar_url} 
									alt={user.login}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<span>{user.name || user.login}</span>
										{user.name && (
											<span style={{ fontSize: '0.875rem', color: 'gray' }}>
												@{user.login}
											</span>
										)}
									</Box>
								}
								secondary={
									<>
										{user.bio && <div>{user.bio}</div>}
										<div>
											👥 {user.followers} followers • 📦 {user.public_repos} repos
											{user.location && ` • 📍 ${user.location}`}
											{user.company && ` • 🏢 ${user.company}`}
										</div>
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

export default GithubUsersDialog