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

			[Actions.CUSTOMER_GET_CREATE]: (data: { stripeCustomerId: string | null, accountId: string }) => this.getOrCreateCustomer(data.stripeCustomerId, data.accountId),

			[Actions.INTENT_SETUP]: (customerId: string) => this.createSetupIntent(customerId),

			[Actions.PAYMENT_METHOD_LIST]: (customerId: string) => this.listPaymentMethods(customerId),
			[Actions.PAYMENT_METHOD_GET]: (paymentMethodId: string) => this.getPaymentMethod(paymentMethodId),
			[Actions.PAYMENT_METHOD_REMOVE_ALL]: (customerId: string) => this.removeAllPaymentMethods(customerId),

			[Actions.PAYMENT_EXECUTE]: (data: PaymentIntentData) => this.executePayment(data),

			[Actions.ACCOUNT_CREATE]: (data: { email: string, accountId: string }) => this.accountCreate(data),
			[Actions.ACCOUNT_URL]: (stripeAccountId: string) => this.accountUrl(stripeAccountId),
		}
	}

	/**
	 * Create or retrieve a Stripe Customer
	 * @param stripeCustomerId the id of stripe customer
	 * @param accountId put it in stripe metadata
	 * @returns 
	 */
	async getOrCreateCustomer(stripeCustomerId: string | null, accountId: string): Promise<Stripe.Customer> {
		// First, check if customer already exists in Stripe
		let customer: Stripe.Customer | Stripe.DeletedCustomer | null = null;

		if (stripeCustomerId) {
			try {
				customer = await stripe.customers.retrieve(stripeCustomerId);
				if (!customer.deleted) {
					return customer as Stripe.Customer;
				}
			} catch (error: any) {
				if (error.code === 'resource_missing') {
					console.warn(`Customer ${stripeCustomerId} not found in Stripe, creating new one.`);
				} else {
					console.error("Error retrieving customer:", error);
					throw error;
				}
			}
		}

		// Create new customer if doesn't exist
		return await stripe.customers.create({
			metadata: { accountId }
		});
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
	async listPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
		const paymentMethods = await stripe.paymentMethods.list({
			customer: customerId,
			type: 'card',
		});
		return paymentMethods.data;
	}

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
		const paymentMethods = await this.listPaymentMethods(customerId);

		for (const paymentMethod of paymentMethods) {
			await stripe.paymentMethods.detach(paymentMethod.id);
		}
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
		);

		try {
			return await stripe.paymentIntents.create(
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
						original_pm_id: data.paymentMethod
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
					statement_descriptor_suffix: formatSuffix(data.projectName ?? 'DONAZIONE'),
				},
				{
					stripeAccount: data.destination, // Eseguito sul conto del venditore
					// Idempotenza: Se ri-esegui questa funzione con lo stesso fundingId, Stripe non addebiterà due volte
					idempotencyKey: data.fundingId ? `fund_${data.fundingId}` : undefined
				}
			);
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
	async accountCreate(data: CreateAccountParams): Promise<Stripe.Account> {
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
				product_description: 'Sviluppo di funzionalità software open source su richiesta',
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
				platform: "FeatureFortune"
			}
		})

		return account
	}

	/**
	 * Create a express account link for AUTHOR
	 */
	async accountUrl(stripeAccountId: string): Promise<string> {
		try {
			const accountLink = await stripe.accountLinks.create({
				account: stripeAccountId,
				refresh_url: process.env.STRIPE_REFESH_URL,
				return_url: process.env.STRIPE_RETURN_URL,
				type: "account_onboarding",
			});
			return accountLink.url
		} catch (error) {
			console.error("Error creating account link:", error);
			throw error;
		}
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