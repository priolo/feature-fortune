import { add } from "@priolo/jon-utils/dist/object/diff";

const en = {
	common: {
		save: "Save",
		ok: "OK",
		cancel: "Cancel",
		delete: "Delete",
		edit: "Edit",
		close: "Close",
		loading: "Loading...",
		msgbox: {
			info: "INFO",
			warning: "WARNING",
			error: "ERROR",
			success: "SUCCESS"
		}
	},
	pag: {
		features: {
			empty: "NO FEATURES FOUND",
		}
	},
	cards: {
		GithubRepoSelectorCard: {
			title: "GITHUB REPOSITORY",
			status: {
				selected: {
					title: "Repository Selected",
					desc: "<br/>This is the repo on which the feature is requested."
				},
				none: {
					title: "No Repository Selected",
					desc: "<br/>Select a GitHub repository on which the feature is requested."
				}
			},
			actions: {
				remove: "REMOVE",
				change: "CHANGE",
				select: "SELECT"
			}
		},
		StripeAuthorCard: {
			title: "STRIPE CONNECTED ACCESS",
			alerts: {
				link_email: "You must first link an email (Google or Github)",
				registration_error: "Error during Stripe registration",
				account_not_found: "Error: Stripe account not found",
				detach_warning_text: "If you disconnect from Stripe you will no longer be able to receive payments.",
				detached_success: "You have been disconnected from Stripe."
			},
			status: {
				warn: {
					title: "You are not registered as a Stripe Account.",
					desc: `<br/>Register to receive funding in your account.
					<br />Registration is a bit long but it is free and only needs to be done once
					<br />furthermore Stripe is a famous and reliable platform.`
				},
				info: {
					title: "Almost there, you are registered in Stripe but there is something to complete.",
					desc: `<br/>Try to MODIFY your account.
					<br />Registration is a bit long but it is free and only needs to be done once
					<br />furthermore Stripe is a famous and reliable platform.`
				},
				done: {
					title: "Good! You are registered as a Stripe Account.",
					desc: `<br/>This allows you to receive funding autonomously.
					<br />Use the DASHBOARD to manage your Stripe account.`
				}
			},
			actions: {
				detach: "DETACH",
				modify: "MODIFY",
				complete: "COMPLETE",
				dashboard: "DASHBOARD",
				register: "REGISTER"
			}
		},
		StripeCreditCard: {
			title: "CREDIT CARD",
			status: {
				warn: {
					title: "You are not registered as a Stripe Account.",
					desc: "<br/>Non hai ancora una carta di credito salvata."
				},
				done: {
					title: "Good! You are registered as a Stripe Account.",
					desc: "<br/>Hai una carta di credito salvata."
				}
			},
			alerts: {
				save_cc: {
					error: "Error confirming card: {{message}}",
					success: "Payment method saved!"
				},
				remove_cc: {
					alert: "Se rimuovi la CARD le tue donazioni schedulate verranno annullate e non ne potrai fare di nuove",
					error: "Errore durante la rimozione del metodo di pagamento",
					success: "Metodo di pagamento rimosso."
				}
			},
			actions: {
				detach: "DETACH",
				set_card: "SET CARD"
			}
		},
		GithubLoginCard: {
			title: "GITHUB ACCESS",
			status: {
				warn: {
					title: "Autenticati con GitHub",
					desc: "<br/>per collegare rapidamente i tuoi repository e le tue richieste."
				},
				done: {
					title: "Bene hai collegato GitHub",
					desc: "<br/>Ora se c'e' una FEATURE puoi proporti come siluppatore"
				}
			},
			alerts: {
				detach: {
					check: "Se ti disconnetti da GitHub non potrai piu' accedere ai tuoi repository e alle tue richieste di funzionalita'.",
					succes: "Perfetto ora non sei piu' connesso a GitHub."
				}
			},
			actions: {
				attach: "ATTACH",
				detach: "DETACH",
				login: "ACCESS"
			}
		},
		GoogleLoginCard: {
			title: "GOOGLE ACCESS",
			status: {
				warn: {
					title: "Autenticati con Google",
					desc: "<br/>per collegare rapidamente il tuo account."
				},
				done: {
					title: "Bene hai collegato Google",
					desc: "<br/>Ora puoi usare le funzionalita' che richiedono Google."
				}
			},
			alerts: {
				login: {
					error: "Errore durante il login con Google, riprova.",
					success: "Login con Google avvenuto con successo!"
				},
				detach: {
					check: "Se ti disconnetti da Google non potrai piu' usare le funzionalita' che richiedono Google.",
					succes: "Perfetto ora non sei piu' connesso a Google."
				}
			},
			actions: {
				detach: "DETACH"
			}
		},
		EmailLoginCard: {
			title: "EMAIL",
			status: {
				register: {
					title: "Inserisci la tua email. Riceverai un codice di conferma.",
					desc: "<br/>Ti permetterà di ricevere le notifiche e di accedere al tuo account senza password."
				},
				none: {
					title: "Il tuo account non ha una email associata.",
					desc: `<br/>Inseriscila qui sotto per ricevere un codice di accesso temporaneo.`,
				},
				unverified: {
					title: "La tua email non è ancora verificata.",
					desc: "<br/>Invia un CODICE alla tua EMAIL per poterla verificare."
				},
				done: {
					title: "La tua email è verificata.",
					desc: "<br/>Puoi usare la tua email per accedere al tuo accounte ricevere le notifiche."
				}
			},
			alerts: {
				send_code: {
					empty: "Devi inserire una email valida",
					error: "Errore nell'invio del codice"
				},
				verify_code: {
					empty: "Devi inserire un codice valido",
					error: "Errore nella verifica del codice",
					success: "Email verificata con successo"
				}
			},
			dialog: {
				title: "VERIFICA IL CODICE",
				text: "Abbiamo inviato un codice al tuo indirizzo email.<br/>Inseriscilo qui sotto per verificare la tua identita.",
				placeholder: "Type code sent to your email",
				actions: {
					cancel: "CANCEL",
					verify: "VERIFY"
				}
			},
			actions: {
				send: "SEND CODE",
				resend: "RESEND"
			}
		},
		SettingsCard: {
			title: "SETTINGS",
			sections: {
				name: "NAME",
				theme: "THEME",
				language: "LANGUAGE"
			},
			theme: {
				light: {
					title: "Light Mode",
					desc: "Switch to dark theme for better visibility in low light"
				},
				dark: {
					title: "Dark Mode",
					desc: "Switch to light theme for better visibility in bright environments"
				}
			},
			actions: {
				update: "UPDATE"
			},
			alerts: {
				save_success: "Settings saved successfully!",
				name_required: "NAME is required."
			}
		},
		GithubUserSelectorCard: {
			title: "GITHUB USER",
			status: {
				selected: {
					title: "User Selected",
					desc: `<br/>This is just a placeholder for the Github user connected to the feature.
					<br/>The one who will have to take care of implementing the feature is the <strong>DEVELOPER</strong>.`
				},
				none: {
					title: "No User Selected",
					desc: "<br/>Optional: select a GitHub user connected to the feature."
				}
			},
			actions: {
				remove: "REMOVE",
				change: "CHANGE",
				select: "SELECT"
			}
		},
		AccountSelectorCard: {
			title: "ACCOUNT",
			status: {
				selected: {
					title: "Account Selected",
					desc: "<br/>The account has been selected."
				},
				none: {
					title: "No Account Selected",
					desc: "<br/>Please select an account."
				}
			},
			actions: {
				remove: "REMOVE",
				change: "CHANGE",
				select: "SELECT"
			}
		},
		DevSelectorCard: {
			title: "DEVELOPER",
			status: {
				selected: {
					title: "Account selezionato",
					desc: `<br/>Attenzione però: Non è il proprietario del repo Github. Ci fidiamo?`
				},
				matched: {
					title: "Account trovato!",
					desc: "<br/>Benissimo è proprio il poprietario del repository GitHub. Siamo sicuri che farà un buon lavoro!"
				},
				none: {
					title: "Seleziona il developer che dovrà implementare la feature",
					desc: `<br/>Se non trovi il proprietario del repo GitHub, contattalo e fallo registrare a questa piattaforma!
					<br/>Altrimenti cerca qualcun'altro oppure lascialo vuoto e spera che qualcuno si faccia avanti`
				}
			},
			actions: {
				remove: "REMOVE",
				change: "CHANGE",
				select: "SELECT"
			}
		},
		FundingsCard: {
			title: "FUNDINGS",
			actions: {
				contribute: "CONTRIBUTE"
			},
			empty: "NO FUNDINGS YET FOR THIS FEATURE",
			alerts: {
				pay: {
					check: "Confermando (OK) procederai con il pagamento immediato del funding.",
					success: "Payment processed successfully!",
					error: "Error processing payment: {{message}}"
				},
				cancel: {
					success: "Funding cancelled successfully!",
					error: "Error cancelling funding: {{message}}"
				}
			}
		},
		FeatureDetailCard: {
			title: "DETAILS",
			title_field: {
				title: "TITLE",
				placeholder: "Enter a short title for the feature"
			},
			description: {
				title: "DESCRIPTION",
				placeholder: "Enter a complete description of the feature..."
			},
			link: {
				title: "LINK (e.g. issue GitHub)",
				placeholder: "Enter a link related to the feature (e.g., issues, discussion, etc.)",
			},
			save: "SAVE DETAILS",
		},
		CommentsCard: {
			title: "COMMENTS",
			empty: "NO COMMENTS YET",
			label: {
				add: "ADD"
			}
		},
		FundingDialog: {
			title: "CONTRIBUTE",
			amount: "AMOUNT",
			description: `Puoi annullare il finanziamento <0>in qualunque momento</0> durante lo sviluppo della feature.
			Quando la feature è dichiarata <0>COMPLETED dal autore</0> riceverai una notifica e avrai <0>{{time}} minuti di tempo per annullare</0> il finanziamento (se non ti convince) altrimenti avverrà il pagamento in automatico.
			Il pagamento è gestito in sicurezza da <0>Stripe</0>: ti puoi fidare!
			`,
			placeholder: "Se vuoi puoi inserire un messaggio (opzionale)",
			button: {
				ok: "OK",
				cancel: "CANCEL"
			}

		}
	},
	overview: {
		title: "OVERVIEW",
		feature: {
			message: {
				new: `Indica il repository GitHub e inserisci il dettaglio della FEATURE che vorresti fosse implementata.
		<br />Quindi CREA la FEATURE per renderla disponibile.`,
				proposed: `Questa FEATURE è una bozza.
        <br />Deve essere accettata da un DEVELOPER per iniziare lo sviluppo.`,
				in_development: `Questa FEATURE è in fase di sviluppo.
		<br />Il DEVELOPER sta lavorando per completarla.`,
				released: `Questa FEATURE è stata rilasciata dal DEVELOPER.,
		<br />ora l'AUTHOR deve confermarne il completamento.`,
				completed: `Questa FEATURE è stata completata dall'AUTHOR.
		<br />Ora il sistema la segnerà come PAGATA.`,
				paid: `Questa FEATURE è stata PAGATA dal sistema.
		<br />Grazie per aver usato Feature Fortune!`,
				cancelled: `Questa FEATURE è stata ANNULLATA.
		<br />Non sarà più possibile procedere con il suo sviluppo.`
			},
			label: {
				author: "AUTHOR",
				created_at: "CREATED AT"
			}
		},
		features: {
			message: {
				default: `Browse all requested features, vote for the ones you want, 
				or fund them to speed up development.`,
			},
			label: {
				total: "TOTAL FEATURES"
			}
		},
		messages: {
			message: {
				default: `Check your inbox, read messages from other users, or send a new message.`,
			},
			label: {
				unread: "UNREAD",
				total: "TOTAL MESSAGES",
			}
		},
		account: {
			message: {
				default: `Gestisci i tuoi dati di account e le tue preferenze qui.`,
				email: {
					warning: `Non possiamo mandarti notifiche per <0>email</0>.`,
					success: `Riceverai nella tua <0>email</0> le notifiche più importanti.
					Per esempio se una <0>feature</0> a cui hai contribuito è stata rilasciata.`
				},
				github: {
					warning: `Non puoi proporti come <0>developer</0> senza un repository <0>GitHub</0>`,
					success: `Puoi proporti come <0>developer</0> di una <0>feature</0>.`
				},
				credit_card: {
					warning: `Non puoi finanziare le <0>feature</0> se non inserisci una <0>carta di credito</0>`,
					success: `Puoi finanziare le <0>feature</0> con la tua <0>carta di credito</0>.`
				},
				stripe: {
					warning: `Non potrai ricevere <0>donazioni</0> senza un account <0>Stripe</0> collegato.`,
					success: `Puoi ricevere <0>donazioni</0> nel tuo account <0>Stripe</0>.`
				},
			},
			label: {
				total: "TOTAL FEATURES"
			}
		}
	},
	rightmenu: {
		feature: {
			repo: {
				label: "REPOSITORY",
				warn: "Inserisci un repository GitHub",
			},
			details: {
				label: "DETAILS",
				ok: "La feature è descritta",
				warn: "Scrivi un titolo e una descrizione (ed eventualmente un link)"
			},
			developer: {
				label: "DEVELOPER",
				ok: "Assigned",
				warn: "Cerca e seleziona un developer"
			},
			fundings: {
				label: "FUNDINGS",
				ok: "number of donations",
				warn: "Ancora nessuna donazione",
			},
			comments: {
				label: "COMMENTS",
				ok: "number of discussions",
				warn: "Ancora nessun commento",
			}
		},
		features: {
			sort: {
				title: "SORT BY",
				newest: "NEWEST",
				oldest: "OLDEST",
				most_funded: "MOST FUNDED",
				github: "GITHUB REPO",
			},
			filter: {
				title: "FILTER BY",
				all: "ALL",
				my: "I CREATED",
				financed: "I CONTRIBUTE",
				developed: "I DEVELOP",
			},
			status: {
				title: "STATUS"
			}
		},
		messages: {
			status: {
				title: "STATUS",
				all: "ALL",
				to_read: "TO READ",
				read: "ALREADY READ",
			},
			sender: {
				title: "BY SENDER",
				all: "ALL",
			},
		}
	},
	header: {
		feature: {
			title: "FEATURE",
			label: {
				create: "CREATE",
				modify: "MODIFY",
				delete: "DELETE",
				reject: "REJECT",
				complete: "COMPLETE",
				accept: "ACCEPT",
				decline: "DECLINE",
				leave: "LEAVE",
				release: "RELEASE"
			},
			tooltip: {
				save_yes: "Save the feature",
				save_no: "Iserisci il repo Github e il dettaglio",
				delete: "Delete the feature",
				reject: "Reject the feature",
				complete: "Complete the feature",
				accept: "Accept to develop the feature",
				decline: "Decline to develop the feature",
				leave: "Leave the development of the feature",
				release: "Release the feature"
			}
		},
		features: {
			title: "FEATURES"
		}
	},
	view: {
		githubRepo: {
			no_description: "No description available",
			empty: "NO REPOSITORY SELECTED"
		},
		funding: {
			label: {
				cancel: "CANCEL",
				pay_now: "PAY NOW!",
				try_again: "TRY AGAIN!"
			},
			status: {
				pending: {
					label: "PENDING",
					tooltip: "FUNDING IS PENDING APPROVAL"
				},
				cancelled: {
					label: "CANCELLED",
					tooltip: "FUNDING HAS BEEN CANCELLED"
				},
				payable: {
					label: "PAYABLE",
					tooltip: "FUNDING IS READY TO BE PAID"
				},
				paied: {
					label: "PAIED",
					tooltip: "FUNDING HAS BEEN SUCCESSFULLY PAID"
				},
				error: {
					label: "ERROR",
					tooltip: "FEATURE HAS BEEN CANCELLED"
				},
			}
		},
		account: {
			empty: "NO ACCOUNT SELECTED",
			stripe: {
				ready: {
					label: "STRIPE READY",
					tooltip: "ABILITATO A RICEVERE PAGAMENTI",
				},
				partial: {
					label: "STRIPE PARTIAL",
					tooltip: "PUO' RICEVERE PAGAMENTI MA DEVE COMPLETARE LA REGISTRAZIONE",
				},
				no: {
					label: "NO STRIPE",
					tooltip: "ATTUALMENTE NON PUO' RICEVERE PAGAMENTI STRIPE",
				},
			},
			email: {
				label: "EMAIL",
				tooltip: "L'EMAIL E' VERIFICATA",
			},
			google: {
				label: "GOOGLE",
				tooltip: "HA UN ACCOUNT GOOGLE",
			},
			github: {
				label: "GITHUB",
				tooltip: "HA UN ACCOUNT GITHUB",
			},
			card: {
				label: "CARD",
				tooltip: "HA INSERITO LA CARTA DI CREDITO",
			}
		},
		feature: {
			proposed: {
				label: "PROPOSED",
				desc: "FEATURE HAS BEEN PROPOSED FROM AUTHOR"
			},
			in_development: {
				label: "IN DEVELOPMENT",
				desc: "FEATURE ACCEPTED BY AN DEVELOPER AND IS IN PROGRESS"
			},
			released: {
				label: "RELEASED",
				desc: "DEVELOPER DECLARES THE FEATURE COMPLETED"
			},
			completed: {
				label: "COMPLETED",
				desc: "AUTHOR CONFIRMS THE FEATURE IS SUCCESSFUL"
			},
			paid: {
				label: "PAID",
				desc: "AUTHOR CONFIRMS THE FEATURE IS PAID"
			},
			cancelled: {
				label: "CANCELLED",
				desc: "AUTHOR OR DEVELOPER HAS CANCELLED THE FEATURE"
			},
		}
	},
	policy: {
		title: "PRIVACY POLICY",
		button_ok: "ACCEPT",
		last_updated: "Last updated: June 10, 2024",
		content: `
		<title>1. Privacy Policy</title>

		<subtitle>Titolare del Trattamento</subtitle>
		<p>
			Il Titolare del trattamento dei dati è:<br>
			<strong>[Tuo Nome o Ragione Sociale]</strong><br>
			Indirizzo: [Il tuo indirizzo fisico completo]<br>
			Email di contatto: <a href="mailto:[Tua Email]">[Tua Email]</a>
		</p>

		<h3>Dati raccolti e finalità</h3>
		<p>Raccogliamo e trattiamo i tuoi dati personali (es. nome, email, identificativi online) esclusivamente per:</p>
		<ul>
			<li>Permettere la registrazione e l'accesso alla piattaforma.</li>
			<li>Mettere in contatto donatori e sviluppatori di progetti Open Source.</li>
			<li>Gestire la sicurezza della piattaforma e prevenire frodi.</li>
			<li>Adempiere agli obblighi di legge (es. conservazione fiscale delle transazioni).</li>
		</ul>

		<h3>Destinatari dei dati e Servizi Terzi</h3>
		<p>Per fornire il servizio, ci avvaliamo di fornitori terzi affidabili. I tuoi dati potrebbero essere trasmessi a:</p>

		<div class="highlight">
			<h4>Elaborazione Pagamenti (Stripe)</h4>
			<p>
				Per processare le donazioni utilizziamo <strong>Stripe</strong>. Quando effettui una donazione, alcuni dati (come l'ID utente, l'importo e l'email) vengono trasferiti a Stripe. Stripe agisce come Titolare autonomo per i dati finanziari e l'elaborazione del pagamento (inclusi i controlli antifrode e antiriciclaggio). Noi non memorizziamo mai i dati della tua carta di credito.
				<br>Per maggiori informazioni: <a href="https://stripe.com/it/privacy" target="_blank">Privacy Policy di Stripe</a>.
			</p>

			<h4>Autenticazione (Google)</h4>
			<p>
				Questa Piattaforma permette di effettuare l'accesso tramite il servizio "Sign in with Google" fornito da Google Ireland Ltd / Google LLC.
				Quando utilizzi questa funzionalità, Google raccoglie dati relativi al tuo dispositivo e al tuo account Google per verificare la tua identità e fornirci un token di accesso sicuro. Noi non abbiamo accesso alla tua password Google.
				<br>Per maggiori informazioni: <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy di Google</a>.
			</p>
		</div>

		<h3>Conservazione dei dati</h3>
		<p>
			I dati del tuo account sono conservati finché il tuo account è attivo. I dati relativi alle transazioni economiche sono conservati per 10 anni come richiesto dalle normative fiscali vigenti.
		</p>

		<h3>I tuoi diritti</h3>
		<p>
			Ai sensi del GDPR, hai il diritto di chiedere al Titolare l'accesso ai tuoi dati, la rettifica, la cancellazione degli stessi (diritto all'oblio) o la limitazione del trattamento. Puoi esercitare questi diritti scrivendo all'indirizzo email sopra indicato.
		</p>

		<h2>2. Cookie Policy</h2>

		<p>
			Questo sito <strong>non utilizza cookie di profilazione</strong> commerciale o pubblicitaria, né propri né di terze parti.
		</p>
		<p>
			Utilizziamo esclusivamente <strong>cookie tecnici</strong> (o strumenti analoghi come il Local Storage) strettamente necessari per il corretto funzionamento della piattaforma e per garantire la sicurezza della navigazione.
		</p>

		<h3>Tipologie di Cookie Tecnici utilizzati</h3>
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
		</ul>

		<p class="highlight">
			<strong>Base giuridica:</strong> Ai sensi della Direttiva ePrivacy e dei provvedimenti del Garante Privacy, per l'installazione di tali cookie tecnici necessari non è richiesto il consenso preventivo dell'utente, pertanto non viene mostrato il banner di blocco preventivo.
		</p>


		<footer>
			<p>&copy; 2024 [Nome Piattaforma] - Tutti i diritti riservati.</p>
		</footer>
		`
	}
}

export default en;
export const helper: Partial<typeof en> = {}
