import { ServiceBase } from "@priolo/julian";
import Stripe from "stripe";
import { Actions, PaymentIntentData } from "./types.js";
import { paymentCheck } from "./utils.js";



const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
	apiVersion: '2025-10-29.clover',
});

class StripeService extends ServiceBase {

	get stateDefault() {
		return {
			...super.stateDefault,
			name: "stripe",
			key: "stripe",
		}
	}

	get executablesMap() {
		return {
			...super.executablesMap,

			[Actions.CUSTOMER_GET]: (stripeCustomerId: string) => this.getCustomer(stripeCustomerId),
			[Actions.CUSTOMER_CREATE]: (accountId: string) => this.createCustomer(accountId),

			[Actions.INTENT_SETUP]: (customerId: string) => this.createSetupIntent(customerId),

			//[Actions.PAYMENT_METHOD_LIST]: (customerId: string) => this.listPaymentMethods(customerId),
			[Actions.PAYMENT_METHOD_GET]: (paymentMethodId: string) => this.getPaymentMethod(paymentMethodId),
			[Actions.PAYMENT_METHOD_REMOVE_ALL]: (customerId: string) => this.removeAllPaymentMethods(customerId),

			[Actions.PAYMENT_EXECUTE]: (data: PaymentIntentData) => this.executePayment(data),

			[Actions.ACCOUNT_CREATE]: (data: { email: string, accountId: string }) => this.createAccount(data),
			[Actions.ACCOUNT_LINK]: (stripeAccountId: string) => this.getAccountLink(stripeAccountId),
			[Actions.ACCOUNT_GET]: (stripeAccountId: string) => this.getAccount(stripeAccountId),
		}
	}

	/**
	 * retrieve a Stripe Customer
	 * @param stripeCustomerId the id of stripe customer
	 */
	async getCustomer(stripeCustomerId: string): Promise<Stripe.Customer> {
		if (!stripeCustomerId) throw new Error("No stripe customer id provided")

		let customer: Stripe.Customer | Stripe.DeletedCustomer | null = null;
		try {
			customer = await stripe.customers.retrieve(stripeCustomerId);
			if (customer.deleted) return null
			return customer as Stripe.Customer;
		} catch (error: any) {
			if (error.code === 'resource_missing') {
				return null
			} else {
				throw error;
			}
		}
	}

	/**
	 * retrieve a Stripe Customer
	 * @param accountId put it in stripe metadata
	 */
	async createCustomer(accountId: string): Promise<Stripe.Customer> {
		if (!accountId) throw new Error("No account id provided")
		return await stripe.customers.create({
			metadata: { accountId }
		})
	}


	/**
	 * Setup Intent operations (for saving cards)
	 */
	async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
		return await stripe.setupIntents.create({
			customer: customerId,
			payment_method_types: ["card"],
			usage: "off_session",
		});
	}

	/** 
	 * List all payment methods for a customer
	 */
	// async listPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
	// 	const paymentMethods = await stripe.paymentMethods.list({
	// 		customer: customerId,
	// 		type: 'card',
	// 	});
	// 	return paymentMethods.data;
	// }

	/**
	 * Fetch a payment method by its id
	 */
	async getPaymentMethod(paymentMethodId: string): Promise<Stripe.PaymentMethod> {
		if (!paymentMethodId) throw new Error("No payment method id provided");
		return await stripe.paymentMethods.retrieve(paymentMethodId);
	}

	/**
	 * Remove all payment methods for a customer
	 */
	async removeAllPaymentMethods(customerId: string): Promise<void> {
		const res = await stripe.paymentMethods.list({
			customer: customerId,
			//type: 'card',
			//limit: 100,
		});
		const paymentMethods = res?.data;
		if (!paymentMethods || paymentMethods.length === 0) return;
		await Promise.all(paymentMethods.map(pm => stripe.paymentMethods.detach(pm.id)));
	}

	/**
	 * Execute a memorized payment
	 */
	async executePayment(data: PaymentIntentData): Promise<Stripe.PaymentIntent> {

		// check
		if (!data.destination) throw new Error(`Funding ${data} has no Stripe Destination Account ID`)
		if (!data.customer) throw new Error(`Funding ${data} has no Stripe Customer ID`)
		if (!data.paymentMethod) throw new Error(`Funding ${data} has no Stripe Payment Method ID`)
		const error = paymentCheck(data.amount, data.currency)
		if (!!error) throw new Error(error)

		// Creiamo una copia del metodo di pagamento sull'account del venditore
		const clonedPaymentMethod = await stripe.paymentMethods.create(
			{
				/** ID Customer sulla TUA Platform */
				customer: data.customer,
				/** ID PaymentMethod sulla TUA Platform */
				payment_method: data.paymentMethod,
			},
			{
				/** ID Account Venditore */
				stripeAccount: data.destination,
			}
		)
		if (!clonedPaymentMethod) {
			throw new Error("Failed to clone payment method to seller's account");
		}

		// Eseguiamo il pagamento usando il metodo clonato
		try {
			const paymentIntent = await stripe.paymentIntents.create(
				{
					amount: data.amount,
					currency: data.currency,

					// Usiamo il metodo appena clonato
					payment_method: clonedPaymentMethod.id,

					// IMPORTANTE: NON specificare il parametro 'customer'.
					// Non collegando questo pagamento a un Customer ID dell'account venditore,
					// il metodo di pagamento non viene salvato nel "portafoglio" del venditore.
					// Risulterà come un pagamento "Guest" (Ospite).

					off_session: true,
					confirm: true,

					// Metadata per il venditore
					metadata: {
						platform_customer_id: data.customer,
						funding_id: data.fundingId || 'N/A',
						original_pm_id: data.paymentMethod,
						project_name: data.projectName || 'N/A',
					},

					// Invia ricevuta al cliente
					receipt_email: data.receiptEmail,

					// Qui definisci SOLO il tuo guadagno netto.
					// Esempio: Se amount è 100€ e tu vuoi 10€, metti 1000.
					// Stripe toglierà a data.destination:
					// 1. I 10€ che vanno a te
					// 2. Le commissioni Stripe (es. 1.4% + 0.25€)
					application_fee_amount: data.applicationFee, // La tua commissione

					// Metti il nome del progetto specifico per questa donazione.
					// Deve sempre contenere caratteri latini e max 22 char.
					//statement_descriptor: formatDescriptor('NOME PROGETTO'),
					statement_descriptor_suffix: formatSuffix(data.descriptorSuffix ?? 'PUCE'),
				},
				{
					stripeAccount: data.destination, // Eseguito sul conto del venditore
					// Idempotenza: Se ri-esegui questa funzione con lo stesso fundingId, Stripe non addebiterà due volte
					idempotencyKey: data.fundingId ? `fund_${data.fundingId}` : undefined
				}
			)

			// Controllo dello STATO del pagamento
			if (paymentIntent.status === 'succeeded') {
				this.log("EXECUTE PAYMENT : succeded", paymentIntent);
			} else if (paymentIntent.status === 'requires_action') {
				// IMPORTANTE: Questo accade se la banca chiede 3D Secure anche se off_session
				// Dovresti inviare una email al cliente per tornare online a pagare.
				this.log("EXECUTE PAYMENT : requires_action", paymentIntent);
			} else if (paymentIntent.status === 'processing') {
				// Raro per le carte, comune per bonifici. Il pagamento non è ancora certo.
				this.log("EXECUTE PAYMENT : processing", paymentIntent);
			} else {
				// Altri stati (requires_payment_method, etc.)
				throw new Error(`Stato imprevisto: ${paymentIntent.status}`);
			}

			return paymentIntent
		} catch (e: any) {
			// Gestione specifica errori SCA
			if (e.code === 'authentication_required') {
				console.error("Il pagamento richiede autenticazione 3D Secure (SCA).");
			}
			throw e;
		}
	}


	/**
	 * Create a express account for AUTHOR
	 */
	async createAccount(data: CreateAccountParams): Promise<Stripe.Account> {
		const { name, email, accountId, url, country = 'IT' } = data

		// Separiamo nome e cognome per facilitare l'onboarding su Stripe
		const nameParts = name ? name.split(' ') : [];
		const firstName = nameParts[0];
		const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined;

		const account = await stripe.accounts.create({
			type: "standard",

			email: email,
			business_type: "individual",
			country: country,

			// Precompili i dati del profilo business
			business_profile: {
				// Usa il nome dell'autore come nome business, così l'utente si riconosce
				name: name ?? undefined,
				url: url, // è il github del profilo
				mcc: '5734', // Codice categoria merceologica: Computer Software Stores
				product_description: 'Development of open source software features',
			},

			// Passiamo i dati anagrafici per saltare passaggi nell'onboarding
			individual: {
				first_name: firstName,
				last_name: lastName,
				email: email,
			},

			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},

			metadata: {
				accountId: accountId,
				platform: "PUCE"
			}
		})

		return account
	}

	/**
	 * Create a express account link for AUTHOR
	 */
	async getAccountLink(stripeAccountId: string): Promise<string> {
		const accountLink = await stripe.accountLinks.create({
			account: stripeAccountId,
			refresh_url: process.env.STRIPE_REFESH_URL,
			return_url: process.env.STRIPE_RETURN_URL,
			type: "account_onboarding",
			collection_options: {
				fields: 'eventually_due',          // upfront onboarding
				future_requirements: 'include',    // gather future requirements too
			},
		})
		return accountLink.url
	}

	/**
	 * Retrieve a connected account
	 */
	async getAccount(stripeAccountId: string): Promise<Stripe.Account> {
		return await stripe.accounts.retrieve(stripeAccountId);
	}

}


export default StripeService


export type CreateAccountParams = {
	name?: string,
	email?: string,
	accountId?: string,
	url?: string,
	country?: string,
}


// Funzione per formattare correttamente il suffisso
function formatSuffix(text: string): string {
	// Rimuovi caratteri non permessi (tieni solo lettere, numeri e spazi)
	let clean = text.replace(/[^a-zA-Z0-9 ]/g, "");
	// Rimuovi spazi doppi
	clean = clean.replace(/\s+/g, " ").trim();
	// Taglia a max 18 caratteri (lasciando spazio per il prefisso se necessario)
	return clean.substring(0, 18).toUpperCase();
}