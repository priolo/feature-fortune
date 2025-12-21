import { add } from "@priolo/jon-utils/dist/object/diff";

const en = {
	common: {
		ok: "OK",
		accept: "Accetta",
		cancel: "Annulla",
		close: "Chiudi",

		save: "Salva",
		edit: "Modifica",
		modify: "Modifica",
		change: "Cambia",
		update: "Aggiorna",
		complete: "Completa",
		register: "Registrati",

		new: "Nuovo",

		remove: "Cancella",
		delete: "Elimina",
		detach: "Abbandona",

		select: "Seleziona",
		refresh: "Aggiorna",
		send: "Invia",

		enabled: "abilitato",
		disabled: "disabilitato",

		dashboard: "Dashboard",
		privacy_policy: "Privacy Policy",

		msgbox: {
			info: "INFO",
			warning: "ATTENZIONE",
			error: "ERRORE",
			success: "SUCCESSO"
		}
	},
	pag: {
		features: {
			empty: "NESSUNA FEATURE :( FORSE è ATTIVO QUALCHE FILTRO?",
		},
		
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
			dialog: {
				placeholder: "Inizia a digitare il nome del repository...",
			}
		},
		GithubLoginCard: {
			title: "GITHUB ACCESS",
			status: {
				warn: {
					title: "Non hai ancora collegato GitHub",
					desc: "<br/>In questa maniera puoi proporti come sviluppatore e avere priorità sui tuoi repository."
				},
				done: {
					title: "Hai collegato GitHub",
					desc: "<br/>Ora se c'è una feature che ti interessa puoi proporti come siluppatore."
				}
			},
			alerts: {
				detach: {
					check: "Se ti disconnetti da GitHub non potrai più accedere alle feature che stavi sviluppando.",
					succes: "ORA NON SEI PIÙ CONNESSO A GITHUB."
				}
			},
			actions: {
				attach: "REGISTRA",
				detach: "ELIMINA",
				login: "ACCEDI"
			}
		},
		// NON USATO
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

		StripeAuthorCard: {
			title: "STRIPE CONNECTED",
			alerts: {
				link_email: "PRIMA DEVI INSERIRE UN RECAPITO EMAIL (GOOGLE OR GITHUB).",
				registration_error: "ERRORE DURANTE LA REGISTRAZIONE SU STRIPE. RIPROVA.",
				account_not_found: "ACCOUNT STRIPE NON TROVATO.",
				detach_warning_text: "Se ti disconnetti da Stripe non sarai più in grado di ricevere pagamenti.",
				detached_success: "SEI STATO DISCONNESSO DA STRIPE."
			},
			status: {
				warn: {
					title: "Non hai ancora un account Stripe.",
					desc: `<br/>Registrati per ricevere donazioni dai tuoi sostenitori.
					<br/>La registrazione è un pò lunga ma è gratuita e va fatta una sola volta.
					<br/>Inoltre Stripe è una piattaforma nota e affidabile.
					`
				},
				info: {
					title: "Ci siamo quasi. Sei registrato ma c'è qualcosa da completare.",
					desc: `<br/>Clicca su (MODIFICA) e verrai reindirizzato sulla pagina di Stripe.
					Quindi potrai completare i dati mancanti.
					`
				},
				done: {
					title: "Bene, sei registrato a Stripe!",
					desc: `<br/>Questo ti permetterà di ricevere donazioni dai tuoi sostenitori.
					<br/>Usa il pannello di controllo (DASHBOARD) per gestire il tuo account Stripe.
					`
				}
			},
		},
		StripeCreditCard: {
			title: "CREDIT CARD",
			status: {
				warn: {
					title: "Non hai una Carta di Credito impostata.",
					desc: "<br/>Puoi fidarti: I tuoi dati saranno gestiti ESCLUSIVAMENTE da Stripe in completa sicurezza."
				},
				done: {
					title: "Bene, hai registrato la tua Carta di Credito.",
					desc: "<br/>PUCE non memorizza i dati della tua carta: Li gestisce STRIPE in completa sicurezza."
				}
			},
			alerts: {
				save_cc: {
					error: "ERRORE DI ACCETTAZIONE CARTA: {{message}}",
					success: "CARTA DI CREDITO IMPOSTATA!"
				},
				remove_cc: {
					alert: "Se rimuovi la CARD le tue donazioni schedulate verranno annullate e non ne potrai fare di nuove.",
					error: "Errore durante la rimozione del metodo di pagamento.",
					success: "Metodo di pagamento rimosso."
				}
			},
			actions: {
				detach: "ELIMINA",
				set_card: "REGISTRA"
			}
		},

		GoogleLoginCard: {
			title: "GOOGLE ACCESS",
			status: {
				warn: {
					title: "Non sei autenticato con Google.",
					desc: "<br/>Collega il tuo account Google per un login più veloce e per ricevere notifiche.",
				},
				done: {
					title: "Hai collegato Google.",
					desc: "<br/>Ora puoi usare Google per accedere e ricevere notifiche.",
				}
			},
			alerts: {
				login: {
					error: "ERRORE DURANTE IL LOGIN CON GOOGLE, RIPROVA.",
					success: "LOGIN CON GOOGLE AVVENUTO CON SUCCESSO!"
				},
				detach: {
					check: "Se ti disconnetti da Google non potrai piu' usare le funzionalita' che richiedono Google.",
					succes: "Perfetto ora non sei piu' connesso a Google."
				}
			},
			actions: {
				detach: "ELIMINA"
			}
		},
		EmailLoginCard: {
			title: "EMAIL",
			status: {
				register: {
					title: "Entra con la tua email.",
					desc: "<br/>Conferma la tua email cliccando su (INVIA). Riceverai un codice che ti permetterà di accedere senza password."
				},
				none: {
					title: "Il tuo account non ha una email associata.",
					desc: `<br/>Inserisci la tua email e premi (INVIA). Riceverai un codice temporaneo e potrai accedere e ricevere notifiche.`,
				},
				unverified: {
					title: "La tua email non è ancora verificata.",
					desc: "<br/>Invia un codice alla tua email per poterla verificare."
				},
				done: {
					title: "La tua email è verificata.",
					desc: "<br/>Puoi usare la tua email per accedere al tuo accounte ricevere le notifiche."
				}
			},
			alerts: {
				send_code: {
					empty: "DEVI INSERIRE UNA EMAIL VALIDA",
					error: "ERRORE NELL'INVIO DEL CODICE"
				},
				verify_code: {
					empty: "DEVI INSERIRE UN CODICE VALIDO",
					error: "ERRORE NELLA VERIFICA DEL CODICE",
					success: "EMAIL VERIFICATA CON SUCCESSO"
				}
			},
			dialog: {
				title: "VERIFICA IL CODICE",
				text: `Abbiamo inviato un codice al tuo indirizzo email.
				<br/>Inseriscilo qui sotto per verificare la tua email.`,
				placeholder: "Scrivi il codice ricevuto via email",
				actions: {
					cancel: "ANNULLA",
					verify: "VERIFICA"
				}
			},
			actions: {
				send: "INVIA",
				resend: "RIPROVA"
			}
		},

		// NON USATO
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
					desc: "<br/>Benissimo è proprio il poprietario del repository GitHub. Farà un buon lavoro!"
				},
				none: {
					title: "Seleziona il developer che dovrà implementare la feature",
					desc: `<br/>Se non trovi il proprietario del repo GitHub, contattalo e fallo registrare a questa piattaforma!
					<br/>Altrimenti cerca qualcun'altro oppure lascialo vuoto e spera che qualcuno si faccia avanti`
				}
			},
		},
		AccountFinderDialog: {
			placeholder:"Inizia a scrivere il nome dell'account...",
			empty: "Nessun account trovato.",
		},

		SettingsCard: {
			title: "SETTAGGI",
			sections: {
				name: "NOME",
				theme: "TEMA",
				language: "LINGUA",
				notification: {
					label:"NOTIFICHE",
					desc_on: "Ti arriveranno notifiche via email per aggiornamenti importanti.",
					desc_off: "Non riceverai notifiche via email."
				},
				currency: "VALUTA PREFERITA",
			},
			theme: {
				light: {
					title: "Tema chiaro",
					desc: "Cambia al tema scuro per una migliore visibilità con poca luce"
				},
				dark: {
					title: "Dark Mode",
					desc: "Cambia al tema chiaro se ti piace"
				}
			},
			alerts: {
				save_success: "LE IMPOSTAZIONI SONO STATE SALVATE!",
				name_required: "IL CAMPO NOME È NECESSARIO."
			}
		},

		FundingsCard: {
			title: "DONAZIONI",
			actions: {
				contribute: "CONTRIBUISCI"
			},
			empty: "ANCORA NESSUN CONTRIBUTO PER QUESTA FEATURE",
			alerts: {
				pay: {
					check: "Confermando (OK) procederai con il pagamento immediato della donazione al developer.",
					success: "PAGAMENTO EFFETTUATO CON SUCCESSO.",
					error: "ERRORE DI PAGAMENTO: {{message}}"
				},
				cancel: {
					check: "Questo pagamento non verrà mai effettuato e non può essere ripristinato. Eventualmente puoi creare un nuovo pagamento",
					success: "PAGAMENTO CANCELLATO CON SUCCESSO.",
					error: "ERRORE DI CANCELLAZIONE: {{message}}"
				}
			}
		},
		FundingDialog: {
			title: "CONTRIBUTO ALLA FEATURE",
			amount: "SOMMA",
			description: `Ricorda cha puoi annullare il finanziamento <0>in qualunque momento</0>.
			<br/>Quando la feature è dichiarata <0>COMPLETED dall'autore</0> riceverai una notifica.
			<br/>Da allora, <0>se vorrai</0>, avrai ancora <0>{{time}} ore di tempo per annullare</0> il finanziamento (se proprio non ti convince) altrimenti avverrà il pagamento in automatico.
			<br/>Il pagamento è gestito in sicurezza da <0>Stripe</0>: Puoi fidarti!
			`,
			placeholder: "Se vuoi puoi inserire un messaggio (opzionale)",
			button: {
				ok: "OK",
				cancel: "ANNULLA"
			}
		},
		FeatureDetailCard: {
			title: "DETTAGLIO",
			title_field: {
				title: "TITOLO",
				placeholder: "Scrivi un breve titolo per la feature"
			},
			description: {
				title: "DESCRIZIONE",
				placeholder: "Descrivi la feature che vorresti..."
			},
			link: {
				title: "LINK (es. issue GitHub)",
				placeholder: "Link relativo alla feature (per esempio: issues o discussion in Github)",
				no_link: "Nessun link fornito."
			},
		},
		CommentsCard: {
			title: "COMMENTI",
			empty: "ANCORA NESSUN COMMENTO",
			label: {
				add: "COMMENTA"
			}
		},

	},
	overview: {
		title: "OVERVIEW",
		feature: {
			message: {
				new: `Indica il repository GitHub e inserisci il dettaglio della <0>feature</0> da implementare.
				Sarebbe perfetto se ci fosse un link ad una descrizione dettagliata su GitHub (es. una <0>issue</0> o una <0>discussion</0>).
				<br/>Quindi clicca sul bottone <0>CREA</0> per renderla disponibile.`,
				proposed_no_dev: `Questa feature è una <0>bozza</0> (proposed).
				Deve essere accettata da un <0>developer</0> per iniziare lo sviluppo. 
				<br/>Sarebbe perfetto se fosse il proprietario del repository GitHub stesso!
				Se non c'è tra i registrati a PUCE, 
				<0>contattalo e fagli creare un account!</0>
				Oppure aspettiamo che qualcuno si faccia avanti`,
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
				amount: "SOMMA TOTALE",
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
				default: `Puoi leggere le notifiche di sistema e i messaggi ricevuti.
				<br/><0>Non dare mai dati sensibili come carte di credito o password.</0>
				<br/>Ti preghiamo di scrivere liberamente a qualunque in maniera rispettosa, evitando polemiche e spam.
				<br/>Questo posto è perfetto per mettersi d'accordo sullo sviluppo delle feature per esempio chiedere i tempi di consegna o proporre modifiche.
				`,
			},
			label: {
				unread: "DA LEGGERE",
				total: "MESSAGGI TOTALI",
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
				label: "GITHUB REPOSITORY",
				warn: "Inserisci un repository GitHub",
			},
			details: {
				label: "DETTAGLIO",
				ok: "I dettagli sono stati compilati",
				warn: "Scrivi un titolo e una descrizione (ed eventualmente un link)"
			},
			developer: {
				label: "DEVELOPER",
				ok: "Assegnato",
				warn: "Cerca e seleziona un developer"
			},
			fundings: {
				label: "DONAZIONI",
				ok: "numero donazioni",
				warn: "Ancora nessuna donazione",
			},
			comments: {
				label: "COMMENTI",
				ok: "numero di commenti",
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
				all: "TUTTE TRANNE CANCELLED",
			}
		},
		messages: {
			status: {
				title: "STATUS",
				all: "TUTTI",
				to_read: "DA LEGGERE",
				read: "GIA' LETTI",
			},
			sender: {
				title: "MITTENTE",
				all: "TUTTI",
			},
		},
		account: {

		}
	},
	header: {
		feature: {
			title: "FEATURE",
			label: {
				create: "CREA",

				save: "SALVA",
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
				copy: "COPIA URL NEGLI APPUNTI",

				reject: "QUALCOSA NON VA NELL'IMPLEMENTAZIONE. RIPROVA",
				complete: "PERFETTO! LA FEATURE E' COMPLETATA",
			},
			message: {
				modify: "MODIFICHE SALVATE CON SUCCESSO!",
				accept: "HAI ACCETTATO DI SVILUPPARE QUESTA FEATURE!",
				decline: "HAI RIFIUTATO DI SVILUPPARE QUESTA FEATURE.",

				delete: "FEATURE ELIMINATA DEFINITIVAMENTE.",
				leave: "HAI ABBANDONATO LO SVILUPPO DI QUESTA FEATURE.",
				release: "HAI RILASCIATO LA FEATURE COME COMPLETATA.",
				copy: "URL COPIATO NEGLI APPUNTI!",

				reject: "HAI RIFIUTATO L'IMPLEMENTAZIONE DELLA FEATURE.",
				complete: "HAI CONFERMATO IL COMPLETAMENTO DELLA FEATURE.",
			},
			dialog: {
				warning: "ATTENZIONE",

				accept: "Ti impegni a sviluppare questa feature. Sei sicuro?",
				decline: "Se rifiuti questa feature non sara' piu' assegnata a te. Sei sicuro?",

				delete: "Le donazioni verranno annullate e il developer non verrà pagato. Questa feature verrà chiusa definitivamente e non sarà modificabile",
				leave: "Stai abbandonado la feature. Verrai rimosso come developer e la feature tornerà in uno stato di proposta",
				release: "Dopo il rilascio, l'autore dovrà accettare o rifiutare. Se accetta dopo {{time}} ore avverrà il pagamento",

				reject: "Se respingi le release la feature tornerà allo stato di sviluppo e dovrà essere accettata nuovamente",
				complete: "Dichiari che la feature è completata. Quindi tra {{time}} ore verranno effettuati i pagamenti al developer",

			}
		},
		features: {
			title: "FEATURES",
			placeholder: "Cerca per titolo, descrizione o github ...",
			new: {
				label: "CREA",
				tooltip: "CREA UNA RICHIESTA PER UNA FUNZIONALITÀ SU UN REPOSITORY GITHUB",
			},
		},
		messages: {
			title: "MESSAGGI",
			//placeholder: "Cerca per mittente o contenuto ...",
		}
	},
	view: {
		githubRepo: {
			no_description: "Descrizione non disponibile",
			empty: "NESSUN REPOSITORY SELEZIONATO"
		},
		funding: {
			label: {
				cancel: "ANNULLA PAGAMENTO",
				pay_now: "PAGA SUBITO!",
				try_again: "RIPROVA!"
			},
			status: {
				pending: {
					label: "PENDING",
					tooltip: "IN ATTESI DI ESSERE ACCETTATA DA UN DEVELOPER"
				},
				cancelled: {
					label: "CANCELLED",
					tooltip: "CANCELLATA PRIMA DEL PAGAMENTO"
				},
				payable: {
					label: "PAYABLE",
					tooltip: "PRONTA PER ESSERE PAGATA"
				},
				paied: {
					label: "PAIED",
					tooltip: "TERMINATA ED E' STATA PAGATA!"
				},
				error: {
					label: "ERROR",
					tooltip: "BLOCCATA PER QUALCHE ERRORE DI SISTEMA"
				},
			}
		},
		account: {
			empty: "NESSUN ACCOUNT SELEZIONATO",
			stripe: {
				ready: {
					label: "STRIPE",
					tooltip: "ABILITATO A RICEVERE PAGAMENTI",
				},
				partial: {
					label: "STRIPE",
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
				label: "DEVELOPMENT",
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
		},
		messages: {
			MessageRow: {
				removed: "IL MESSAGGIO È STATO ELIMINATO.",
				as_unread: "Come non letto",
				reply: "Rispondi",
			},
			MessageView: {
				placeholder: "Scrivi il tuo messaggio qui...",
			}
		}
	},
	policy: {
		title: "PRIVACY POLICY",
		last_updated: "Last updated: June 10, 2024",
	}
}

export default en;
export const helper: Partial<typeof en> = {}
