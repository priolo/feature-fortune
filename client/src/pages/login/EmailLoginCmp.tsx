import React, { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SxProps,
    TextField,
    Typography,
} from '@mui/material';
import Card from '@/components/Card';
import authSo from '@/stores/auth/repo';


interface Props {
}

/**
 * login and register new accout
 */
const EmailLoginCmp: React.FC<Props> = ({
}) => {

    // STORES

    // HOOKS
    const [emailDialogIsOpen, setEmailDialogIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');


    // HANDLERS
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };
    const handleSendEmailClick = async () => {
        if (!email) return alert('Devi inserire una email valida');
        try {
            await authSo.emailSendCode(email);
            setEmailDialogIsOpen(true);
        } catch (err) {
            alert('Errore nell\'invio del codice');
        }
    };
    const handleVerifyAndClose = async () => {
        if (!code) return alert('Devi inserire un codice valido');
        try {
            await authSo.emailVerifyCode(code);
            alert('Email verificata con successo');
            setEmailDialogIsOpen(false);
        }
        catch (err) {
            alert('Errore nella verifica del codice');
        }
    };
    const handleClose = () => {
        setEmailDialogIsOpen(false);
    };


    // RENDER

    return <>
        
            <Card collapsible
                title="Email access"
                icon={<MailOutlineIcon color="primary" />}
            >
                <Typography variant="body2" color="text.secondary">
                    Inserisci il tuo indirizzo email per ricevere un codice di accesso temporaneo.
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Type your email"
                />
                <Button variant="contained" fullWidth onClick={handleSendEmailClick}>
                    Invia codice
                </Button>
                <Typography variant="caption" color="text.secondary" textAlign="center">
                    Controlla la posta in arrivo e inserisci il codice per completare il login.
                </Typography>
            </Card>

            <Dialog onClose={handleClose} open={emailDialogIsOpen} maxWidth="sm" fullWidth>
                <DialogTitle>Verifica il codice</DialogTitle>
                <DialogContent sx={sxDialogContent}>
                    <Typography variant="body2" color="text.secondary">
                        Abbiamo inviato un codice al tuo indirizzo email. Inseriscilo qui sotto per verificare la tua identita.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Codice"
                        variant="outlined"
                        size="small"
                        value={code}
                        onChange={handleCodeChange}
                        placeholder="Type code sent to your email"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleVerifyAndClose} variant="contained">
                        Verify
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    
};

export default EmailLoginCmp;



const sxDialogContent: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};