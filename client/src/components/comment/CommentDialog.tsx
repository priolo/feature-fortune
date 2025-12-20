import { Comment } from "@/types/Comment";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";



interface Props {

	/** se true la dialog è aperta */
	isOpen: boolean,

	/** quando si chiude. Restituisco il COMMENT creato/editato */
	onClose: (repo: Comment | null) => void

}

const MAX_LENGTH = 300;

const CommentDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	onClose,
}) => {


	// HOOKs
	const { t } = useTranslation()
	const [message, setMessage] = useState<string>("");
	useEffect(() => {
		if (isOpen) setMessage("");
	}, [isOpen])


	// HANDLERS
	const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
		onClose?.(null);
	}
	const handleOk = () => {
		const text = message.trim().slice(0, MAX_LENGTH);
		const comment: Comment = {
			text,
		};
		onClose?.(comment);
	}


	// RENDER 
	const messageTrim = message?.trim().length ?? 0;
	const canSave = messageTrim > 0 && messageTrim <= MAX_LENGTH;

	return (
		<Dialog maxWidth="sm" fullWidth
			//onClose={handleClose} 
			open={isOpen} 
		>

			<DialogTitle>{t("cards.CommentsCard.dialog.title")}</DialogTitle>

			<DialogContent>
				<TextField multiline rows={4} fullWidth autoFocus
					value={message ?? ''}
					onChange={(e) => setMessage(e.target.value)}
					placeholder={t("cards.CommentsCard.dialog.placeholder")}
					inputProps={{ maxLength: MAX_LENGTH }}
					helperText={`${messageTrim}/${MAX_LENGTH}`}
				/>
			</DialogContent>

			<DialogActions>

				<Button 
					onClick={() => handleClose()}
				>{t("common.cancel")}</Button>

				<Button variant="contained" color="primary"
					onClick={handleOk}
					disabled={!canSave}
				>{t("common.ok")}</Button>
			</DialogActions>
		</Dialog>
	)
}


export default CommentDialog



