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
			empty: "ANCORA NON CI SONO FEATURE! :(",
		}
	},
	cards: {
		GithubRepoSelectorCard: {
			title: "GITHUB REPOSITORY",
			status: {
				selected: {
					title: "Repository Selezionato",
					desc: "<br/>Questo è il repository a cui fa riferimanto la feature."
				},
				none: {
					title: "Nessun Repository Selezionato",
					desc: "<br/>Seleziona un repository GitHub su cui deve essere implementala la feature."
				}
			},
			actions: {
				remove: "CANCELLA",
				change: "CAMBIA",
				select: "SELEZIONA"
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
			title: "DESCRIZIONE",
			title_field: {
				title: "TITOLO",
				placeholder: "Scrivi un breve titolo per la feature"
			},
			description: {
				title: "TESTO",
				placeholder: "Scrivi una dettagliata descrizione della feature..."
			},
			link: {
				title: "LINK (es. issue GitHub)",
				placeholder: "Link relativo alla feature (per esempio: issues o discussion in Github)",
			},
			save: "SALVA DESCRIZIONE",
		},
		CommentsCard: {
			title: "COMMENTI",
			empty: "ANCORA NESSUN COMMENTO",
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
				new: `Indica il repository GitHub e inserisci il dettaglio della <0>feature</0> che vorresti fosse implementata.
		<br/>Quindi <0>CREA</0> la feature per renderla disponibile.`,
				proposed_no_dev: `Questa feature è una <0>bozza</0> (proposed).
        <br/>Deve essere proposta e accettata da un <0>developer</0> per iniziare lo sviluppo.
		Sarebbe perfetto se fosse il proprietario del repository GitHub stesso!
		<br/>Se non c'è tra i registrati a PUCE, contattalo e fagli creare un account!
		<br/>Oppure aspettiamo che qualcuno si faccia avanti`,
				proposed: `Questa feature è una <0>bozza</0> ed è stata proposta ad un <0>developer</0>.
		<br/>Ora è lo sviluppatore che deve accettare e portare avanti la feature.
		<br/>Per invogliarlo puoi contribuire finanziariamente!`,
				in_development: `Siamo in fase di sviluppo.
		<br/>Il <0>developer</0> sta lavorando per completare la <0>feature</0>. 
		<br/>Quando avrà finito rilascerà una <0>release</0> che dovà essere confermata dall'<0>autore</0>.
		<br/>Nel frattempo puoi sempre contribuire finanziariamente!`,
				released: `La feature è stata rilasciata dal <0>developer</0>.,
		<br/>Ora l'<0>autore</0> deve confermarne il completamento.
		<br/>Se conferma, si attiva un <0>countdown</0> e dopo il sistema effettuerà i pagamenti al <0>developer</0>.
		<br/>Affettati a contribuire: Quando userai questa feature ti sentirai meglio!`,
				completed: `Evviva! La feature è stata accettata dall'<0>autore</0>!
		<br/>Dopo un <0>countdwon</0> di {{time}} ore il sistema effettuerà il pagamento al <0>developer</0>.
		<br/>Se hai contribuito controlla che sia tutto ok: puoi sempre annullare il finanziamento prima dello scadere del <0>countdown</0>.`,
				paid: `Questa feature è stata pagata dal sistema.
		<br/>Grazie per aver usato PUCE speriamo di aver contribuito al finanziamento dell Open Source!`,
				cancelled: `Purtroppo questa FEATURE è stata ANNULLATA.
		<br/>Non sarà più possibile procedere con il suo sviluppo.
		<br/>Se hai contribuito finanziariamente, i tuoi non sono stati addebitati. 
		<br/>Se vuoi, puoi sempre ricreare la feature!`
			},
			label: {
				author: "AUTORE",
				created_at: "CREATA IL"
			}
		},
		features: {
			message: {
				default: `Naviga tra le feature. 
				Le puoi filtrare o mettere in odine con il menù a destra. 
				Oppure scrivi in alto per cercare una feature specifica.
				Natualmente puoi anche CREARE una nuova feature!
				`,
			},
			label: {
				total: "NUMERO FEATURES"
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
				title: "ORDINA PER",
				newest: "NUOVE",
				oldest: "VECCHIE",
				most_funded: "PIU' FINANZIATE",
				github: "GITHUB REPO",
			},
			filter: {
				title: "FILTRA PER",
				all: "TUTTE",
				my: "HO CREATO",
				financed: "HO CONTRIBUITO",
				developed: "HO SVILUPPATO",
			},
			status: {
				title: "STATO",
				all: "TUTTE (NO CANCELLED)",
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
				create: "CREA",

				modify: "MODIFICA",
				accept: "ACCETTA",
				decline: "RIFIUTA",

				delete: "ELIMINA",
				leave: "ABBANDONA",
				release: "RILASCIA",

				reject: "RIFIUTA",
				complete: "FINITA!",
			},
			tooltip: {
				save_yes: "SALVA LE MODIFICHE FATTE",
				save_no: "PER SALVARE ISERISCI GITHUB E IL DETTAGLIO",

				accept: "ACCETTA DI IMPLEMENTARE QUESTA FEATURE",
				decline: "RIFIUTA! NON IMPLEMENTERAI QUESTA FEATURE",

				delete: "CANCELLA LA FEATURE DEFINITIVAMENTE O.O",
				leave: "RINUNCIA! NON IMPLEMENTERAI PIU' QUESTA FEATURE",
				release: "OK! LA FEATURE è STATA IMPLEMENTATA",

				reject: "QUALCOSA NON VA NELL'IMPLEMENTAZIONE. RIPROVA",
				complete: "PERFETTO! LA FEATURE E' COMPLETATA",
			},
			message: {
				modify: "MODIFICHE SALVATE CON SUCCESSO!",
				accept: "Hai accettato di sviluppare questa feature!",
				decline: "Hai rifiutato di sviluppare questa feature.",

				delete: "Feature eliminata definitivamente.",
				leave: "Hai abbandonato lo sviluppo di questa feature.",
				release: "Hai rilasciato la feature come completata.",

				reject: "Hai rifiutato l'implementazione della feature.",
				complete: "Hai confermato il completamento della feature.",
			},
			dialog:{
				warning: "ATTENZIONE",

				accept: "TI IMPEGNI A SVILUPPARE QUESTA FEATURE. SEI SICURO?",
				decline: "SE RIFIUTI QUESTA FEATURE NON SARA' PIU' ASSEGNATA A TE. SEI SICURO?",

				delete: "LE DONAZIONI VERRANNO ANNULLATE E IL DEVELOPER NON VERRÀ PAGATO. QUESTA FEATURE VERRÀ CHIUSA DEFINITIVAMENTE E NON SARÀ MODIFICABILE",
				leave: "STAI ABBANDONADO LA FEATURE. VERRAI RIMOSSO COME DEVELOPER E LA FEATURE TORNERÀ IN UNO STATO DI PROPOSTA",
				release: "DOPO QUESTO RILASCIO, L'AUTORE DOVRÀ ACCETTARE O RIFIUTARE. SE ACCETTA DOPO {{time}} ORE AVVERRÀ IL PAGAMENTO",

				reject: "SE RESPINGI LE RELEASE LA FEATURE TORNERÀ ALLO STATO DI SVILUPPO E DOVRÀ ESSERE ACCETTATA NUOVAMENTE",
				complete: "DICHIARI CHE LA FEATURE È COMPLETATA. QUINDI TRA {{time}} ORE VERRANNO EFFETTUATI I PAGAMENTI AL DEVELOPER",

			}
		},
		features: {
			title: "FEATURES",
			placeholder: "Cerca per titolo, descrizione o github ...",
			new: {
				label: "CREA",
				tooltip: "Crea una richiesta per una funzionalità su un repository GitHub",
			},
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
	}
}

export default en;
export const helper: Partial<typeof en> = {}
