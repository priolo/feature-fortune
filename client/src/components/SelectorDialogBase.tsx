import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText, TextField, Box, DialogActions } from "@mui/material";
import React, { FunctionComponent } from "react";



interface Props {

	/**
	 * se è true la dialog è aperta
	 */
	isOpen: boolean,

	/** 
	 * l'id dell'item selezionato quando si apre la dialog
	 */
	idSelect: string | number,
	/** 
	 * gli oggetti che andranno renderizzati 
	 */
	items: any[]

	/** 
	 * text del campo filtro 
	 */
	filterText: string
	/** 
	 * quando si digita sulla textbox di ricerca 
	 * Se è null non viene mostrata la textbox
	 * */
	onFilterTextChange: (filterText: string) => void


	/** 
	 * chiamata quando si clicca sul btt colose o fuori dalla dialog 
	 * restituisce l'item selezionato o null se si è chiusa senza selezionare nulla
	 */
	onClose: (item: any) => void
	


	/** 
	 * funziona cha dato un "item" restituisce il suo "text" 
	 */
	fnTextFromItem: (item: any) => React.ReactNode,
	/** 
	 * funzione che dato un "item" restituisce il suo "sottotitolo" 
	 * se non definita non viene mostrato il sottotitolo
	 */
	fnSecondaryFromItem?: (item: any) => React.ReactNode,
	/** 
	 * funzione che dato un item restituisce il suo ID 
	 */
	fnIdFromItem: (item: any) => number | string,
}

const SelectorDialogBase: FunctionComponent<Partial<Props>> = ({
	isOpen,
	idSelect,
	items,
	filterText,
	onFilterTextChange,
	onClose,
	fnTextFromItem,
	fnSecondaryFromItem,
	fnIdFromItem,
}) => {


	// HOOKs


	// HANDLERS
	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		if (onClose) {
			onClose(null)
		}
	}

	const handleItemClick = (item: any) => {
		if (onClose) {
			onClose(item)
		}
	}

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onFilterTextChange) {
			onFilterTextChange(event.target.value)
		}
	}


	// RENDER 
	const filteredItems = React.useMemo(() => {
		if (!items || !items.length) return []
		
		if (!filterText || filterText.trim() === '') return items
		
		const lowercaseFilter = filterText.toLowerCase()
		return items.filter(item => {
			const text = fnTextFromItem ? fnTextFromItem(item) : ''
			const secondaryText = fnSecondaryFromItem ? fnSecondaryFromItem(item) : ''
			
			const textStr = typeof text === 'string' ? text : text?.toString() || ''
			const secondaryStr = typeof secondaryText === 'string' ? secondaryText : secondaryText?.toString() || ''
			
			return textStr.toLowerCase().includes(lowercaseFilter) || 
				   secondaryStr.toLowerCase().includes(lowercaseFilter)
		})
	}, [items, filterText, fnTextFromItem, fnSecondaryFromItem])

	if (!isOpen) return null

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>Select Item</DialogTitle>

			{onFilterTextChange && (
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
			)}

			<List sx={{ pt: 0, minHeight: 200, maxHeight: 400, overflow: 'auto' }}>
				{filteredItems.length > 0 ? (
					filteredItems.map((item) => {
						const itemId = fnIdFromItem ? fnIdFromItem(item) : Math.random()
						const isSelected = idSelect != null && itemId === idSelect
						
						return (
							<ListItem disablePadding key={itemId}>
								<ListItemButton 
									onClick={() => handleItemClick(item)}
									selected={isSelected}
								>
									<ListItemText 
										primary={fnTextFromItem ? fnTextFromItem(item) : 'Unknown'}
										secondary={fnSecondaryFromItem ? fnSecondaryFromItem(item) : undefined}
									/>
								</ListItemButton>
							</ListItem>
						)
					})
				) : (
					<ListItem>
						<ListItemText 
							primary="No items found" 
							secondary={filterText ? "Try adjusting your search terms" : "No items available"}
						/>
					</ListItem>
				)}
			</List>

			<DialogActions>

				buttons
			</DialogActions>
		</Dialog>
	)
}


export default SelectorDialogBase



