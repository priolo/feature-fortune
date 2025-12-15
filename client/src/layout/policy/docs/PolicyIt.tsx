import { Box, Link, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

const PolicyEn: FunctionComponent = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

			<Typography variant='h4'>
				1. Privacy Policy
			</Typography>

			<Typography variant='h6'>
				Titolare del Trattamento
			</Typography>

			<Typography variant='body1'>
				Il Titolare del trattamento dei dati è: <strong> Ivano Iorio</strong>
				<br />
				Indirizzo: <strong> Via Don Giovanni Verità, 5 Padova</strong>
				<br />
				Email di contatto: <strong>
					<Link href="mailto:info@puce.app"> info@puce.app</Link>
				</strong>
			</Typography>

			<Typography variant='h6' sx={{ mt: 2 }}>
				Dati raccolti e finalità
			</Typography>
			<Typography variant='body1'>
				Raccogliamo e trattiamo i tuoi dati personali (es. nome, email, identificativi online) esclusivamente per:
			</Typography>
			<Typography variant="body1">
				<ul>
					<li>Permettere la registrazione e l'accesso alla piattaforma.</li>
					<li>Mettere in contatto donatori e sviluppatori di progetti Open Source.</li>
					<li>Gestire la sicurezza della piattaforma.</li>
					<li>Adempiere agli obblighi di legge.</li>
				</ul>
			</Typography>



			<Typography variant='h6' sx={{ mt: 2 }}>
				Destinatari dei dati e Servizi Terzi
			</Typography>

			<Typography variant='body1'>
				Per fornire il servizio, ci avvaliamo di fornitori terzi affidabili. I tuoi dati potrebbero essere trasmessi a:
			</Typography>

			<Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>

				<Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
					Elaborazione Pagamenti (Stripe)
				</Typography>
				<Typography variant='body2'>
					Per processare le donazioni utilizziamo <strong>Stripe</strong>. Quando effettui una donazione, alcuni dati (come l'ID utente, l'importo e l'email) vengono trasferiti a Stripe. Stripe agisce come Titolare autonomo per i dati finanziari e l'elaborazione del pagamento (inclusi i controlli antifrode e antiriciclaggio). Noi non memorizziamo mai i dati della tua carta di credito.
					<br />
					Per maggiori informazioni:
					<Link href="https://stripe.com/it/privacy" target="_blank" rel="noopener" color='secondary'>
						<strong> Privacy Policy di Stripe </strong>
					</Link>.
				</Typography>

				<Typography variant='subtitle1' sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
					Autenticazione (Google)
				</Typography>
				<Typography variant='body2'>
					Questa Piattaforma permette di effettuare l'accesso tramite il servizio "Sign in with Google" fornito da Google Ireland Ltd / Google LLC.
					Quando utilizzi questa funzionalità, Google raccoglie dati relativi al tuo dispositivo e al tuo account Google per verificare la tua identità e fornirci un token di accesso sicuro. Noi non abbiamo accesso alla tua password Google.
					<br />
					Per maggiori informazioni:
					<Link href="https://policies.google.com/privacy" target="_blank" rel="noopener" color="secondary">
						<strong> Privacy Policy di Google</strong>
					</Link>.
				</Typography>

				<Typography variant='subtitle1' sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
					Autenticazione (GitHub)
				</Typography>
				<Typography variant='body2'>
					Questa Piattaforma permette di effettuare l'accesso tramite il servizio "Sign in with GitHub" fornito da GitHub Inc.
					Quando utilizzi questa funzionalità, GitHub raccoglie dati relativi al tuo account GitHub (come username, email e avatar) per verificare la tua identità e fornirci un token di accesso sicuro. Noi non abbiamo accesso alla tua password GitHub né possiamo agire per conto tuo sul tuo account.
					<br />
					Per maggiori informazioni:
					<Link href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener" color="secondary">
						<strong> Privacy Policy di GitHub</strong>
					</Link>.
				</Typography>
				
			</Box>

			<Typography variant='h6' sx={{ mt: 2 }}>
				Conservazione dei dati
			</Typography>
			<Typography variant='body1'>
				I dati del tuo account sono conservati finché il tuo account è attivo. I dati relativi alle transazioni economiche sono conservati per 10 anni come richiesto dalle normative fiscali vigenti.
			</Typography>

			<Typography variant='h6' sx={{ mt: 2 }}>
				I tuoi diritti
			</Typography>
			<Typography variant='body1'>
				Ai sensi del GDPR, hai il diritto di chiedere al Titolare l'accesso ai tuoi dati, la rettifica, la cancellazione degli stessi (diritto all'oblio) o la limitazione del trattamento. Puoi esercitare questi diritti scrivendo all'indirizzo email sopra indicato.
			</Typography>

			<Typography variant='h4' sx={{ mt: 4 }}>
				2. Cookie Policy
			</Typography>

			<Typography variant='body1'>
				Questo sito <strong>non utilizza cookie di profilazione</strong> commerciale o pubblicitaria, né propri né di terze parti.
			</Typography>
			<Typography variant='body1'>
				Utilizziamo esclusivamente <strong>cookie tecnici</strong> (o strumenti analoghi come il Local Storage) strettamente necessari per il corretto funzionamento della piattaforma e per garantire la sicurezza della navigazione.
			</Typography>

			<Typography variant='h6' sx={{ mt: 2 }}>
				Tipologie di Cookie Tecnici utilizzati
			</Typography>
			<Typography variant="body1">
				<ul>
					<li>
						<strong>Funzionamento e Sessione:</strong> Utilizziamo token tecnici (es. JWT o cookie di sessione) per riconoscere il tuo utente una volta effettuato il login e permetterti di navigare nell'area riservata senza dover reinserire le credenziali ad ogni pagina.
					</li>
					<li>
						<strong>Sicurezza Pagamenti (Stripe):</strong> Utilizziamo cookie tecnici di terze parti forniti da Stripe Inc. necessari per elaborare i pagamenti, garantire la sicurezza delle transazioni e prevenire le frodi.
					</li>
					<li>
						<strong>Autenticazione Federata (Google):</strong> Utilizziamo cookie tecnici di terze parti strettamente necessari per la gestione del servizio "Sign-in with Google". Questi sono necessari per permettere l'accesso rapido tramite il tuo account Google.
					</li>
					<li>
						<strong>Autenticazione Federata (GitHub):</strong> Utilizziamo cookie tecnici di terze parti strettamente necessari per la gestione del servizio "Sign-in with GitHub". Questi sono necessari per permettere l'accesso rapido tramite il tuo account GitHub.
					</li>
				</ul>
			</Typography>

			<Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
				<Typography variant='body1'>
					<strong>Base giuridica:</strong> Ai sensi della Direttiva ePrivacy e dei provvedimenti del Garante Privacy, per l'installazione di tali cookie tecnici necessari non è richiesto il consenso preventivo dell'utente, pertanto non viene mostrato il banner di blocco preventivo.
				</Typography>
			</Box>

			<Box component="footer" sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
				<Typography variant='caption' color="text.secondary">
					&copy; 2024 PUCE - Tutti i diritti riservati.
				</Typography>
			</Box>
		</Box>
	);
};

export default PolicyEn;
