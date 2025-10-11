import { ServiceBase } from "@priolo/julian";
import Stripe from "stripe";
import { Actions, PaymentIntentData } from "./types.js";



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

			[Actions.GET_OR_CREATE_CUSTOMER]: (data: { stripeCustomerId: string | null, accountId: string }) => this.getOrCreateCustomer(data.stripeCustomerId, data.accountId),

			[Actions.CREATE_SETUP_INTENT]: (customerId: string) => this.createSetupIntent(customerId),

			[Actions.LIST_PAYMENT_METHODS]: (customerId: string) => this.listPaymentMethods(customerId),
			[Actions.GET_PAYMENT_METHOD]: (paymentMethodId: string) => this.getPaymentMethod(paymentMethodId),
			[Actions.REMOVE_ALL_PAYMENT_METHODS]: (customerId: string) => this.removeAllPaymentMethods(customerId),

			[Actions.EXECUTE_PAYMENT]: (data: PaymentIntentData) => this.executePayment(data),

			[Actions.EXPRESS_ACCOUNT_CREATE]: (data: { email: string, accountId: string }) => this.expressAccountCreate(data),
			[Actions.EXPRESS_ACCOUNT_URL]: (stripeAccountId: string) => this.expressAccountUrl(stripeAccountId),
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
		return await stripe.paymentIntents.create({
			amount: data.amount,
			currency: data.currency,
			customer: data.customer,
			payment_method: data.paymentMethod,
			off_session: true,
			confirm: true,
			transfer_data: {
				destination: data.destination,
			},
		});
	}


	/**
	 * Create a express account for AUTHOR
	 */
	async expressAccountCreate(data: { email: string, accountId: string }): Promise<Stripe.Account> {
		const { email, accountId } = data
		const account = await stripe.accounts.create({
			type: "express",
			country: "IT",
			email: email,
			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},
			metadata: { accountId: accountId }
		})
		return account
	}

	/**
	 * Create a express account link for AUTHOR
	 */
	async expressAccountUrl(stripeAccountId: string): Promise<string> {
		const accountLink = await stripe.accountLinks.create({
			account: stripeAccountId,
			refresh_url: process.env.STRIPE_REFESH_URL,
			return_url: process.env.STRIPE_RETURN_URL,
			type: "account_onboarding",
		});

		return accountLink.url
	}

}


export default StripeService


