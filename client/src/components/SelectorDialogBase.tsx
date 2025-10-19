import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText, TextField, Box, DialogActions, Button, DialogContent } from "@mui/material";
import React, { FunctionComponent } from "react";
import MessageBanner from "./MessageBanner";



interface Props {

	/** Titolo della dialog */
	title?: string | React.ReactNode

	/** se è true la dialog è aperta */
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
	title,
	isOpen,
	idSelect,
	items,
	filterText,


	onFilterTextChange,
	onClose,
	fnTextFromItem = (item) => item,
	fnSecondaryFromItem,
	fnIdFromItem = (item) => item,
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

	const haveItems = filteredItems.length > 0

	return (

		<Dialog onClose={handleClose} open={isOpen}>

			<DialogTitle>
				{title}
			</DialogTitle>

			{onFilterTextChange && (
				<TextField sx= {{ px: 3, py: 0}}
					value={filterText || ''}
					onChange={handleFilterChange}
					placeholder="Type to filter items..."
				/>
			)}

			<DialogContent>
				{haveItems ? (

					<List>
						{filteredItems.map((item, i) =>
							<ListItem disablePadding key={fnIdFromItem(item)}>
								<ListItemButton
									onClick={() => handleItemClick(item)}
									selected={idSelect != null && fnIdFromItem(item) === idSelect}
								>
									<ListItemText
										primary={fnTextFromItem(item)}
										secondary={fnSecondaryFromItem?.(item) ?? undefined}
									/>
								</ListItemButton>
							</ListItem>
						)}
					</List>

				) : <MessageBanner>no items</MessageBanner>}
			</DialogContent>

			<DialogActions>
				<Button
					onClick={() => handleClose()}
				>Close</Button>
			</DialogActions>

		</Dialog>
	)
}


export default SelectorDialogBase



