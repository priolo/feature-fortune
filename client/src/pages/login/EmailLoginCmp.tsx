
import authSo from '@/stores/auth/repo';
import { Box, Button, Dialog, DialogActions, DialogTitle, SxProps, TextField } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useState } from 'react';



interface Props {
}

/**
 * login and register new accout
 */
const EmailLoginCmp: React.FC<Props> = ({
}) => {

    // STORES

    // HOOKS
    const [emailDialogIsOpen, setEmailDialogIsOpen] = useState(false)
    const [email, setEmail] = useState<string>()
    const [code, setCode] = useState<string>()


    // HANDLERS
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }
    const handleSendEmailClick = async () => {
        if (!email) return alert('Devi inserire una email valida')  
        try {
            await authSo.emailSendCode(email)
            setEmailDialogIsOpen(true)
        } catch (err) {
            alert('Errore nell\'invio del codice')
        }
    }
    const handleVerifyAndClose = async () => {
        if (!code) return alert('Devi inserire un codice valido')
        try {
            await authSo.emailVerifyCode(code)
            alert('Email verificata con successo')
            setEmailDialogIsOpen(false)
        }
        catch (err) {
            alert('Errore nella verifica del codice')
        }
    }
    const handleClose = () => {
        setEmailDialogIsOpen(false)
    }


    // RENDER

    return (
        <Box sx={sxRoot}>

            <TextField fullWidth label="Email" variant="outlined" size="small"
                value={email}
                onChange={handleEmailChange}
                placeholder="Type your email"
            />
            <Button variant="contained" fullWidth
                onClick={handleSendEmailClick}
            >send code</Button>

            <Dialog onClose={handleClose} open={emailDialogIsOpen} maxWidth="sm" fullWidth>

                <DialogTitle>Check EMAIL and verify code</DialogTitle>

                <TextField fullWidth label="Code" variant="outlined" size="small"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Type code sended in your email"
                />

                <DialogActions>
                    <Button onClick={handleVerifyAndClose}>Verify</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>

            </Dialog>

        </Box>
    );
};

export default EmailLoginCmp;

const sxRoot: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
}