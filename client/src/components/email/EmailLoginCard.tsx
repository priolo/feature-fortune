import Card, { sxActionCard } from '@/components/Card';
import authSo from '@/stores/auth/repo';
import { Done, WarningAmber } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, SxProps, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useState } from 'react';



interface Props {
}

/**
 * validazione email per login e registrazione
 */
const EmailLoginCard: React.FC<Props> = ({
}) => {

    // STORES
    useStore(authSo)

    // HOOKS
    const [emailDialogIsOpen, setEmailDialogIsOpen] = useState(false);
    const [email, setEmail] = useState(authSo.state.user?.email || '');
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
    const logged = !!authSo.state.user;
    const haveEmail = !!authSo.state.user?.email;
    const isVerified = !!authSo.state.user?.emailVerified;

    return <>
        <Card
            title="Email access"
            icon={<MailOutlineIcon color="primary" />}
        >
            <Typography variant="body2" color="text.secondary">
                <Message logged={logged} haveEmail={haveEmail} isVerified={isVerified} />
            </Typography>

            <TextField fullWidth label="Email" size="small"
                value={email}
                onChange={handleEmailChange}
                placeholder="Type your email"
            />

            <Box sx={sxActionCard} >
                <Button
                    onClick={handleSendEmailClick}
                >Invia codice</Button>
            </Box>
        </Card>

        <Dialog maxWidth="sm" fullWidth
            open={emailDialogIsOpen}
            onClose={handleClose}
        >
            <DialogTitle>Verifica il codice</DialogTitle>

            <DialogContent sx={sxDialogContent}>

                <Typography variant="body2" color="text.secondary">
                    Abbiamo inviato un codice al tuo indirizzo email. Inseriscilo qui sotto per verificare la tua identita.
                </Typography>

                <TextField fullWidth size="small" label="Codice"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Type code sent to your email"
                />

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleVerifyAndClose} variant="contained">
                    Verify
                </Button>
            </DialogActions>
        </Dialog>

    </>
};

export default EmailLoginCard;

const sxDialogContent: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};


interface MessageProps {
    logged: boolean;
    haveEmail: boolean;
    isVerified: boolean;
}

const Message: React.FC<MessageProps> = ({ 
    logged, 
    haveEmail, 
    isVerified 
}) => {
    
    if (!logged) {
        return <span>
            Inserisci il tuo indirizzo email per ricevere un codice di accesso temporaneo.
        </span>;
    }

    if (!haveEmail) {
        return <span>
            <WarningAmber color="warning" sx={{ fontSize: '1.4em', verticalAlign: 'text-bottom', mx: "2px" }} />
            Il tuo account non ha ancora una email associata.
            Inseriscila qui sotto per ricevere un codice di accesso temporaneo.
        </span>;
    }

    if (!isVerified) {
        return <span>
            <WarningAmber color="warning" sx={{ fontSize: '1.4em', verticalAlign: 'text-bottom', mx: "2px" }} />
            La tua email non è ancora verificata.
            Inseriscila qui sotto per ricevere un codice di accesso temporaneo.
        </span>;
    }

    return <span>
        <Done color="success" sx={{ fontSize: '1.4em', verticalAlign: 'text-bottom', mx: "2px" }} />
        La tua email è verificata.
    </span>;
};