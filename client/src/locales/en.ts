
const en = {
	common: {
		ok: "OK",
		accept: "Accept",
		cancel: "Cancel",
		close: "Close",

		save: "Save",
		edit: "Edit",
		modify: "Modify",
		change: "Change",
		update: "Update",
		complete: "Complete",
		register: "Register",

		new: "New",
		add: "Add",

		remove: "Remove",
		delete: "Delete",
		detach: "Detach",

		select: "Select",
		refresh: "Refresh",
		send: "Send",

		enabled: "enabled",
		disabled: "disabled",

		dashboard: "Dashboard",
		privacy_policy: "Privacy Policy",

		msgbox: {
			info: "INFO",
			warning: "WARNING",
			error: "ERROR",
			success: "SUCCESS"
		}
	},
	pag: {
		features: {
			empty: "NO FEATURES :( MAYBE SOME FILTER IS ACTIVE?",
		},
	},
	cards: {
		GithubRepoSelectorCard: {
			title: "GITHUB REPOSITORY",
			status: {
				selected: {
					title: "Repository Selected",
					desc: "<br/>This is the repository the feature refers to."
				},
				none: {
					title: "No Repository Selected",
					desc: "<br/>Select a GitHub repository where the feature should be implemented."
				}
			},
			dialog: {
				placeholder: "Start typing the repository name...",
			}
		},
		GithubLoginCard: {
			title: "GITHUB ACCESS",
			status: {
				warn: {
					title: "You haven't connected GitHub yet",
					desc: "<br/>This way you can propose yourself as a developer and have priority on your repositories."
				},
				done: {
					title: "You have connected GitHub",
					desc: "<br/>Now if there is a feature you are interested in, you can propose yourself as a developer."
				}
			},
			alerts: {
				detach: {
					check: "If you disconnect from GitHub you will no longer be able to access the features you were developing.",
					succes: "YOU ARE NO LONGER CONNECTED TO GITHUB."
				}
			},
			actions: {
				attach: "REGISTER",
				detach: "REMOVE",
				login: "LOGIN"
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
				link_email: "YOU MUST FIRST ENTER AN EMAIL ADDRESS (GOOGLE OR GITHUB).",
				registration_error: "ERROR DURING STRIPE REGISTRATION. TRY AGAIN.",
				account_not_found: "STRIPE ACCOUNT NOT FOUND.",
				detach_warning_text: "If you disconnect from Stripe you will no longer be able to receive payments.",
				detached_success: "YOU HAVE BEEN DISCONNECTED FROM STRIPE."
			},
			status: {
				warn: {
					title: "You don't have a Stripe account yet.",
					desc: `<br/>Register to receive donations from your supporters.
					<br/>Registration is a bit long but it is free and only needs to be done once.
					<br/>Furthermore, Stripe is a well-known and reliable platform.
					`
				},
				info: {
					title: "Almost there. You are registered but there is something to complete.",
					desc: `<br/>Click on (MODIFY) and you will be redirected to the Stripe page.
					Then you can complete the missing data.
					`
				},
				done: {
					title: "Great, you are registered with Stripe!",
					desc: `<br/>This will allow you to receive donations from your supporters.
					<br/>Use the control panel (DASHBOARD) to manage your Stripe account.
					`
				}
			},
		},
		StripeCreditCard: {
			title: "CREDIT CARD",
			status: {
				warn: {
					title: "You do not have a Credit Card set.",
					desc: "<br/>You can trust: Your data will be managed EXCLUSIVELY by Stripe in complete security."
				},
				done: {
					title: "Great, you have registered your Credit Card.",
					desc: "<br/>PUCE does not store your card details: STRIPE manages them in complete security."
				}
			},
			alerts: {
				save_cc: {
					error: "CARD ACCEPTANCE ERROR: {{message}}",
					success: "CREDIT CARD SET!"
				},
				remove_cc: {
					alert: "If you remove the CARD your scheduled donations will be cancelled and you will not be able to make new ones.",
					error: "Error removing payment method.",
					success: "Payment method removed."
				}
			},
			actions: {
				detach: "REMOVE",
				set_card: "REGISTER"
			}
		},

		GoogleLoginCard: {
			title: "GOOGLE ACCESS",
			status: {
				warn: {
					title: "You are not authenticated with Google.",
					desc: "<br/>Connect your Google account for faster login and to receive notifications.",
				},
				done: {
					title: "You have connected Google.",
					desc: "<br/>Now you can use Google to login and receive notifications.",
				}
			},
			alerts: {
				login: {
					error: "ERROR DURING GOOGLE LOGIN, TRY AGAIN.",
					success: "GOOGLE LOGIN SUCCESSFUL!"
				},
				detach: {
					check: "If you disconnect from Google you will no longer be able to use features that require Google.",
					succes: "Perfect, now you are no longer connected to Google."
				}
			},
			actions: {
				detach: "REMOVE"
			}
		},
		EmailLoginCard: {
			title: "EMAIL",
			status: {
				register: {
					title: "Enter with your email.",
					desc: "<br/>Confirm your email by clicking on (SEND). You will receive a code that will allow you to login without a password."
				},
				none: {
					title: "Your account does not have an email associated.",
					desc: `<br/>Enter your email and press (SEND). You will receive a temporary code and you will be able to login and receive notifications.`,
				},
				unverified: {
					title: "Your email is not verified yet.",
					desc: "<br/>Send a code to your email to verify it."
				},
				done: {
					title: "Your email is verified.",
					desc: "<br/>You can use your email to access your account and receive notifications."
				}
			},
			alerts: {
				send_code: {
					empty: "YOU MUST ENTER A VALID EMAIL",
					error: "ERROR SENDING CODE"
				},
				verify_code: {
					empty: "YOU MUST ENTER A VALID CODE",
					error: "ERROR VERIFYING CODE",
					success: "EMAIL VERIFIED SUCCESSFULLY"
				}
			},
			dialog: {
				title: "VERIFY CODE",
				text: `We sent a code to your email address.
				<br/>Enter it below to verify your email.`,
				placeholder: "Type the code received via email",
				actions: {
					cancel: "CANCEL",
					verify: "VERIFY"
				}
			},
			actions: {
				send: "SEND",
				resend: "RETRY"
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
					title: "Account selected",
					desc: `<br/>Warning though: It is not the owner of the Github repo. Do we trust them?`
				},
				matched: {
					title: "Account found!",
					desc: "<br/>Great, it is the owner of the GitHub repository. They will do a good job!"
				},
				none: {
					title: "Select the developer who will implement the feature",
					desc: `<br/>If you don't find the owner of the GitHub repo, contact them and get them to register on this platform!
					<br/>Otherwise look for someone else or leave it empty and hope someone steps forward`
				}
			},
		},
		AccountFinderDialog: {
			placeholder:"Start typing the account name...",
			empty: "No account found.",
		},

		SettingsCard: {
			title: "SETTINGS",
			sections: {
				name: "NAME",
				theme: "THEME",
				language: "LANGUAGE",
				notification: {
					label:"NOTIFICATIONS",
					desc_on: "You will receive email notifications for important updates.",
					desc_off: "You will not receive email notifications."
				},
				currency: "PREFERRED CURRENCY",
			},
			theme: {
				light: {
					title: "Light theme",
					desc: "Switch to dark theme for better visibility in low light"
				},
				dark: {
					title: "Dark Mode",
					desc: "Switch to light theme if you like"
				}
			},
			alerts: {
				save_success: "SETTINGS HAVE BEEN SAVED!",
				name_required: "THE NAME FIELD IS REQUIRED."
			}
		},

		FundingsCard: {
			title: "DONATIONS",
			actions: {
				contribute: "CONTRIBUTE"
			},
			empty: "NO CONTRIBUTIONS FOR THIS FEATURE YET",
			alerts: {
				pay: {
					check: "By confirming (OK) you will proceed with the immediate payment of the donation to the developer.",
					success: "PAYMENT SUCCESSFUL.",
					error: "PAYMENT ERROR: {{message}}"
				},
				cancel: {
					check: "This payment will never be made and cannot be restored. You can eventually create a new payment",
					success: "PAYMENT CANCELLED SUCCESSFULLY.",
					error: "CANCELLATION ERROR: {{message}}"
				}
			}
		},
		FundingDialog: {
			title: "CONTRIBUTION TO THE FEATURE",
			amount: "AMOUNT",
			description: `Remember that you can cancel the funding <0>at any time</0>.
			<br/>When the feature is declared <0>COMPLETED by the author</0> you will receive a notification.
			<br/>From then on, <0>if you want</0>, you will still have <0>{{time}} hours to cancel</0> the funding (if you are not convinced) otherwise the payment will be made automatically.
			<br/>Payment is securely managed by <0>Stripe</0>: You can trust it!
			`,
			placeholder: "If you want you can enter a message (optional)",
			button: {
				ok: "OK",
				cancel: "CANCEL"
			}
		},
		FeatureDetailCard: {
			title: "DETAIL",
			title_field: {
				title: "TITLE",
				placeholder: "Write a short title for the feature"
			},
			description: {
				title: "DESCRIPTION",
				placeholder: "Describe the feature you would like..."
			},
			link: {
				title: "LINK (e.g. GitHub issue)",
				placeholder: "Link related to the feature (for example: issues or discussion in Github)",
				no_link: "No link provided."
			},
		},
		CommentsCard: {
			title: "COMMENTS",
			empty: "NO COMMENTS YET",
			label: {
				add: "COMMENT"
			},
			dialog: {
				title: "COMMENT",
				placeholder: "Add a message"
			}
		},

	},
	overview: {
		title: "OVERVIEW",
		feature: {
			message: {
				new: `Indicate the GitHub repository and enter the detail of the <0>feature</0> to be implemented.
				It would be perfect if there was a link to a detailed description on GitHub (e.g. an <0>issue</0> or a <0>discussion</0>).
				<br/>Then click on the <0>CREATE</0> button to make it available.`,
				proposed_no_dev: `This feature is a <0>draft</0> (proposed).
				It must be accepted by a <0>developer</0> to start development. 
				<br/>It would be perfect if it was the owner of the GitHub repository itself!
				If they are not among those registered on PUCE, 
				<0>contact them and have them create an account!</0>
				Or let's wait for someone to step forward`,
				proposed: `This feature is a <0>draft</0> and has been proposed to a <0>developer</0>.
				<br/>Now it is the developer who must accept and carry out the feature.
				<br/>To encourage them you can contribute financially!`,
				in_development: `We are in the development phase.
				<br/>The <0>developer</0> is working to complete the <0>feature</0>. 
				<br/>When finished they will release a <0>release</0> which must be confirmed by the <0>author</0>.
				<br/>In the meantime you can always contribute financially!`,
				released: `The feature has been released by the <0>developer</0>.,
				<br/>Now the <0>author</0> must confirm its completion.
				<br/>If confirmed, a <0>countdown</0> is activated and afterwards the system will make payments to the <0>developer</0>.
				<br/>Hurry to contribute: When you use this feature you will feel better!`,
				completed: `Hurray! The feature has been accepted by the <0>author</0>!
				<br/>After a <0>countdown</0> of {{time}} hours the system will make the payment to the <0>developer</0>.
				<br/>If you contributed check that everything is ok: you can always cancel the funding before the <0>countdown</0> expires.`,
				paid: `This feature has been paid by the system.
				<br/>Thank you for using PUCE we hope to have contributed to the funding of Open Source!`,
				cancelled: `Unfortunately this FEATURE has been CANCELLED.
				<br/>It will no longer be possible to proceed with its development.
				<br/>If you contributed financially, your funds have not been charged. 
				<br/>If you want, you can always recreate the feature!`
			},
			label: {
				amount: "TOTAL AMOUNT",
				author: "AUTHOR",
				created_at: "CREATED AT"
			}
		},
		features: {
			message: {
				default: `Browse through the features. 
				You can filter or sort them with the menu on the right. 
				Or type above to search for a specific feature.
				Naturally you can also CREATE a new feature!
				`,
			},
			label: {
				total: "NUMBER OF FEATURES"
			}
		},
		messages: {
			message: {
				default: `You can read system notifications and received messages.
				<br/><0>Never give sensitive data like credit cards or passwords.</0>
				<br/>Please write freely to anyone in a respectful manner, avoiding controversy and spam.
				<br/>This place is perfect for agreeing on feature development for example asking for delivery times or proposing changes.
				`,
			},
			label: {
				unread: "UNREAD",
				total: "TOTAL MESSAGES",
			}
		},
		account: {
			message: {
				default: `Manage your account data and preferences here.`,
				email: {
					warning: `We cannot send you notifications by <0>email</0>.`,
					success: `You will receive the most important notifications in your <0>email</0>.
					For example if a <0>feature</0> you contributed to has been released.`
				},
				github: {
					warning: `You cannot propose yourself as a <0>developer</0> without a <0>GitHub</0> repository`,
					success: `You can propose yourself as a <0>developer</0> of a <0>feature</0>.`
				},
				credit_card: {
					warning: `You cannot fund <0>features</0> if you do not enter a <0>credit card</0>`,
					success: `You can fund <0>features</0> with your <0>credit card</0>.`
				},
				stripe: {
					warning: `You will not be able to receive <0>donations</0> without a connected <0>Stripe</0> account.`,
					success: `You can receive <0>donations</0> in your <0>Stripe</0> account.`
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
				warn: "Enter a GitHub repository",
			},
			details: {
				label: "DETAIL",
				ok: "Details have been filled",
				warn: "Write a title and a description (and eventually a link)"
			},
			developer: {
				label: "DEVELOPER",
				ok: "Assigned",
				warn: "Search and select a developer"
			},
			fundings: {
				label: "DONATIONS",
				ok: "number of donations",
				warn: "No donations yet",
			},
			comments: {
				label: "COMMENTS",
				ok: "number of comments",
				warn: "No comments yet",
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
				my: "CREATED BY ME",
				financed: "CONTRIBUTED BY ME",
				developed: "DEVELOPED BY ME",
			},
			status: {
				title: "STATUS",
				all: "ALL EXCEPT CANCELLED",
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
				title: "SENDER",
				all: "ALL",
			},
		},
		account: {

		}
	},
	header: {
		feature: {
			title: "FEATURE",
			label: {
				create: "CREATE",

				save: "SAVE",
				accept: "ACCEPT",
				decline: "DECLINE",

				delete: "DELETE",
				leave: "LEAVE",
				release: "RELEASE",

				reject: "REJECT",
				complete: "COMPLETED!",
			},
			tooltip: {
				save_yes: "SAVE CHANGES MADE",
				save_no: "TO SAVE ENTER GITHUB AND DETAIL",

				accept: "ACCEPT TO IMPLEMENT THIS FEATURE",
				decline: "DECLINE! YOU WILL NOT IMPLEMENT THIS FEATURE",

				delete: "DELETE THE FEATURE PERMANENTLY O.O",
				leave: "GIVE UP! YOU WILL NO LONGER IMPLEMENT THIS FEATURE",
				release: "OK! THE FEATURE HAS BEEN IMPLEMENTED",

				reject: "SOMETHING IS WRONG WITH THE IMPLEMENTATION. TRY AGAIN",
				complete: "PERFECT! THE FEATURE IS COMPLETED",
			},
			message: {
				modify: "CHANGES SAVED SUCCESSFULLY!",
				accept: "YOU HAVE ACCEPTED TO DEVELOP THIS FEATURE!",
				decline: "YOU HAVE DECLINED TO DEVELOP THIS FEATURE.",

				delete: "FEATURE DELETED PERMANENTLY.",
				leave: "YOU HAVE ABANDONED THE DEVELOPMENT OF THIS FEATURE.",
				release: "YOU HAVE RELEASED THE FEATURE AS COMPLETED.",

				reject: "YOU HAVE REJECTED THE IMPLEMENTATION OF THE FEATURE.",
				complete: "YOU HAVE CONFIRMED THE COMPLETION OF THE FEATURE.",
			},
			dialog: {
				warning: "WARNING",

				accept: "You commit to developing this feature. Are you sure?",
				decline: "If you decline this feature it will no longer be assigned to you. Are you sure?",

				delete: "Donations will be cancelled and the developer will not be paid. This feature will be closed permanently and will not be editable",
				leave: "You are abandoning the feature. You will be removed as developer and the feature will return to a proposed state",
				release: "After release, the author must accept or reject. If accepted, payment will occur after {{time}} hours",

				reject: "If you reject the release the feature will return to development state and must be accepted again",
				complete: "You declare that the feature is completed. So in {{time}} hours payments will be made to the developer",

			}
		},
		features: {
			title: "FEATURES",
			placeholder: "Search by title, description or github ...",
			new: {
				label: "CREATE",
				tooltip: "CREATE A REQUEST FOR A FEATURE ON A GITHUB REPOSITORY",
			},
		},
		messages: {
			title: "MESSAGES",
			//placeholder: "Cerca per mittente o contenuto ...",
		}
	},
	view: {
		githubRepo: {
			no_description: "Description not available",
			empty: "NO REPOSITORY SELECTED"
		},
		funding: {
			label: {
				cancel: "CANCEL PAYMENT",
				pay_now: "PAY NOW!",
				try_again: "TRY AGAIN!"
			},
			status: {
				pending: {
					label: "PENDING",
					tooltip: "WAITING TO BE ACCEPTED BY A DEVELOPER"
				},
				cancelled: {
					label: "CANCELLED",
					tooltip: "CANCELLED BEFORE PAYMENT"
				},
				payable: {
					label: "PAYABLE",
					tooltip: "READY TO BE PAID"
				},
				waiting: {
					label: "WAITING",
					tooltip: "WAITING FOR CONFIRMATION FROM STRIPE"
				},
				paied: {
					label: "PAID",
					tooltip: "FINISHED AND HAS BEEN PAID!"
				},
				error: {
					label: "ERROR",
					tooltip: "BLOCKED DUE TO SOME SYSTEM ERROR"
				},
			}
		},
		account: {
			empty: "NO ACCOUNT SELECTED",
			stripe: {
				ready: {
					label: "STRIPE",
					tooltip: "ENABLED TO RECEIVE PAYMENTS",
				},
				partial: {
					label: "STRIPE",
					tooltip: "CAN RECEIVE PAYMENTS BUT MUST COMPLETE REGISTRATION",
				},
				no: {
					label: "NO STRIPE",
					tooltip: "CURRENTLY CANNOT RECEIVE STRIPE PAYMENTS",
				},
			},
			email: {
				label: "EMAIL",
				tooltip: "EMAIL IS VERIFIED",
			},
			google: {
				label: "GOOGLE",
				tooltip: "HAS A GOOGLE ACCOUNT",
			},
			github: {
				label: "GITHUB",
				tooltip: "HAS A GITHUB ACCOUNT",
			},
			card: {
				label: "CARD",
				tooltip: "HAS ENTERED CREDIT CARD",
			}
		},
		feature: {
			proposed: {
				label: "PROPOSED",
				desc: "FEATURE HAS BEEN PROPOSED BY AUTHOR"
			},
			in_development: {
				label: "DEVELOPMENT",
				desc: "FEATURE ACCEPTED BY A DEVELOPER AND IS IN PROGRESS"
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
				removed: "THE MESSAGE HAS BEEN DELETED.",
				as_unread: "Mark as unread",
				reply: "Reply",
			},
			MessageView: {
				new_message: "NEW MESSAGE",
				send: "MESSAGE SENT SUCCESSFULLY.",
				placeholder: "Write your message here...",
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
