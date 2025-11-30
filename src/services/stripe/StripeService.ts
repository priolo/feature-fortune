import { ServiceBase } from "@priolo/julian";
import Stripe from "stripe";
import { Actions, PaymentIntentData } from "./types.js";
import { paymentCheck } from "./utils.js";



const stripe = new Stripe(process.env.STRIPE_API_KEY!);

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
			} catch (error) {
				console.warn("Customer not found, creating new one");
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
		if ( !!error ) throw new Error(error)

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

				// Qui definisci SOLO il tuo guadagno netto.
				// Esempio: Se amount è 100€ e tu vuoi 10€, metti 1000.
				// Stripe toglierà a data.destination:
				// 1. I 10€ che vanno a te
				// 2. Le commissioni Stripe (es. 1.4% + 0.25€)
				//application_fee_amount: 500, // La tua commissione

				// Metti il nome del progetto specifico per questa donazione.
				// Deve sempre contenere caratteri latini e max 22 char.
				statement_descriptor: formatDescriptor('NOME PROGETTO'),
			},
			{
				stripeAccount: data.destination, // Eseguito sul conto del venditore
			}
		);
		return await stripe.paymentIntents.create(

			{
				amount: data.amount,
				currency: data.currency,
				customer: data.customer,
				payment_method: data.paymentMethod,
				off_session: true,
				confirm: true,
			},
			{
				// definisce che la transazione viene eseguita per conto di un ACCOUNT CONNECTED
				stripeAccount: data.destination,
			}

		)
		return await stripe.paymentIntents.create(

			{
				amount: data.amount,
				currency: data.currency,
				customer: data.customer,
				payment_method: data.paymentMethod,
				off_session: true,
				confirm: true,
				transfer_data: {
					destination: data.destination,
				},
				// Questo sposta la responsabilità legale e dei chargeback sul venditore,
				// anche se tecnicamente il pagamento passa dalla piattaforma.
				on_behalf_of: data.destination,
			},

		)
	}


	/**
	 * Create a express account for AUTHOR
	 */
	async accountCreate(data: CreateAccountParams): Promise<Stripe.Account> {
		const { name, email, accountId, url } = data
		try {
			const account = await stripe.accounts.create({
				type: "standard",

				email: email,
				business_type: "individual",
				country: 'IT',

				// Precompili i dati del profilo business
				business_profile: {
					name: `${process.env.STRIPE_PLATFORM_NAME}* `,
					url: url, // è il github del profilo
					mcc: '5734', // Codice categoria merceologica (es. software, servizi, etc.) - Stripe non lo chiederà
					product_description: 'Piattaforma di donazioni per progetti open source',

				},

				// Se hai già dati anagrafici, passali qui (Stripe li verificherà ma l'utente non deve riscriverli)
				individual: {
					first_name: name,
					//last_name: 'Rossi',
					email: email,
					//phone: '+393331234567',
					id_number: "",
				},

				capabilities: {
					card_payments: { requested: true },
					transfers: { requested: true },
				},

				metadata: {
					accountId: accountId
				}
			})
			return account
		} catch (error) {
			console.error("Error creating express account:", error);
			throw error;
		}
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
}


// Funzione per formattare correttamente la voce
function formatDescriptor(projectName: string) {
	// Prefisso es: "PUCE "
	const prefix = `${process.env.STRIPE_PLATFORM_NAME}* `;

	// Calcola quanto spazio rimane (22 è il limite imposto da Stripe)
	const remainingChars = 22 - prefix.length;

	// Pulisci il nome del progetto (via caratteri strani) e taglialo
	const cleanProjectName = projectName.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase();
	const truncatedProjectName = cleanProjectName.substring(0, remainingChars);

	return `${prefix}${truncatedProjectName}`;
}