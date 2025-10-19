import { Comment } from "@/types/Comment";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";



interface Props {

	/**
	 * se è true la dialog è aperta
	 */
	isOpen: boolean,

	/** 
	 * chiamata quando si clicca sul btt colose o fuori dalla dialog 
	 * restituisco il Funding creato
	 */
	onClose: (repo: Comment | null) => void

}

const CommentDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	onClose,
}) => {


	// HOOKs
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		if (isOpen) setMessage("");
	},[])

	// HANDLERS

	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		setMessage("");
		onClose?.(null);
	};

	const handleOk = () => {
		const comment: Comment = {
			text: message.trim() || undefined,
		};

		onClose?.(comment);
	};


	// RENDER 

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>COMMENT</DialogTitle>

			<DialogContent>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
					<TextField
						label="Message"
						multiline
						rows={4}
						value={message || ''}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Add a message"
						fullWidth
					/>
				</Box>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => handleClose()}>Cancel</Button>
				<Button onClick={handleOk} variant="contained" color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}


export default CommentDialog



