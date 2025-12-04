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
					title: "Account Selected",
					desc: `<br/>Attenzione però: Non è il proprietario del repository Github. Ti fidi?`
				},
				matched: {
					title: "Account Selected (Match)",
					desc: "<br/>Benissimo è proprio il poprietario del repository GitHub."
				},
				none: {
					title: "Seleziona l'account che dovrà svolgere la modifica",
					desc: `<br/>Se non trovi il proprietario del repository, contattalo e fallo registrare a questa piattaforma!
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
			empty: "No fundings yet for this feature.",
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
		}
	},
	overview: {
		title: "Overview",
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
		account: {
			message: {
				default: `This page allows you to manage your personal information, 
				linked login services, and payment details.
                Keep your profile up to date to ensure smooth collaboration 
				and funding processing.`,
				email: {
					warning: `Non possiamo mandarti notifiche importanti per EMAIL.`,
					success: `Riceverai nella tua EMAIL le notifiche importanti.
					Per esempio se una FEATURE a cui hai contribuito viene rilasciata.`
				},
				github: {
					warning: `Non potrai proporti come DEVELOPER senza un repository GitHub.`,
					success: `Puoi proporti come DEVELOPER di una FEATURE.`
				},
				credit_card: {
					warning: `Non potrai finanziare le FEATURE senza una carta di credito`,
					success: `Puoi finanziare le FEATURE con la tua carta di credito.`
				},
				stripe: {
					warning: `Non potrai ricevere fondi senza un account STRIPE `,
					success: `Puoi ricevere fondi nel tuo account STRIPE per le FEATURE che sviluppi.`
				},
			},
			label: {
				total: "TOTAL FEATURES"
			}
		}
	},
	rightmenu: {
		account: {

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
	viewers: {
		githubRepo: {
			no_description: "No description available",
			empty: "NO REPOSITORY SELECTED"
		},
		funding: {
			
		}
	}
}

export default en;
export const helper: Partial<typeof en> = {}
