import { Comment } from "@/types/Comment";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";



interface Props {

	/** se true la dialog è aperta */
	isOpen: boolean,

	/** quando si chiude. Restituisco il COMMENT creato/editato */
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
	}, [isOpen])

	// HANDLERS

	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
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
				<TextField multiline rows={4} fullWidth
					value={message || ''}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Add a message"
				/>
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



