import authEmailApi from "@/api/authEmail";
import authSo from "@/stores/auth/repo";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";



interface Props {

	/** se è true la dialog è aperta */
	isOpen: boolean,

	/** 
	 * chiamata quando si clicca sul btt colose o fuori dalla dialog 
	 * restituisce l'item selezionato o null se si è chiusa senza selezionare nulla
	 */
	onClose: () => void

}

const EmailVerifyDialog: FunctionComponent<Partial<Props>> = ({
	isOpen,
	onClose,
}) => {


	// HOOKs
	const [email, setEmail] = useState<string>()
	const [code, setCode] = useState<string>('')

	useEffect(() => {
		if (!isOpen || !email) return
		setEmail(authSo.state.user?.email ?? "")
	}, [isOpen])


	// HANDLERS
	const handleClose = () => {
		onClose()
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handleSendCodeClick = async () => {
		if (!email) return alert('Devi inserire una email valida')
		try {
			await authEmailApi.emailSendCode(email)
			alert('Codice inviato con successo, controlla la tua email')
		} catch (err) {
			alert('Errore nell\'invio del codice')
		}
	}

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value)
	}

	const handleVerifyAndClose = async () => {
		if (!code) return alert('Devi inserire il codice')
		try {
			const user = (await authEmailApi.emailVerify(code))?.user
			authSo.setUser(user)
			alert('Email verificata con successo')
			onClose()
		} catch (err) {
			alert('Errore nella verifica del codice')
		}
	}



	// RENDER 

	return (

		<Dialog onClose={handleClose} open={isOpen} maxWidth="sm" fullWidth>

			<DialogTitle>Write the CODE that recive in { }</DialogTitle>

			<TextField fullWidth label="Email" variant="outlined" size="small"
				value={email}
				onChange={handleEmailChange}
				placeholder="Type your email"
			/>

			<TextField fullWidth label="Code" variant="outlined" size="small"
				value={code}
				onChange={handleCodeChange}
				placeholder="Type code sended in your email"
			/>

			<DialogActions>
				<Button onClick={handleSendCodeClick}>Send code</Button>
				<Button onClick={handleVerifyAndClose}>Verify</Button>
				<Button onClick={handleClose}>Cancel</Button>
			</DialogActions>

		</Dialog>
	)
}

export default EmailVerifyDialog
