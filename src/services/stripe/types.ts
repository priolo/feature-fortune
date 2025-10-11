
export enum Actions {
	/** execute a memorized payment  */
	EXECUTE_PAYMENT = "stripe:executePayment",

	/** get o create new if not exist */
	GET_OR_CREATE_CUSTOMER = "stripe:getOrCreateCustomer",

	/** create a setup intent where in future save cards data */
	CREATE_SETUP_INTENT = "stripe:createSetupIntent",

	/** all payment methods for a stripe customer */
	LIST_PAYMENT_METHODS = "stripe:listPaymentMethods",
	/** fetch a payment method with its id*/
	GET_PAYMENT_METHOD = "stripe:getPaymentMethod",
	/** remove all payment method for a CUTOMER */
	REMOVE_ALL_PAYMENT_METHODS = "stripe:removeAllPaymentMethods",
	/**
	 * Create a express account URL
	 * for register in STRIPE web-app for AUTHOR
	 * this for receive moneys
	 * Registration completion is notified in the WEBHOOK
	 */
	EXPRESS_ACCOUNT_CREATE = "stripe:express:create",
	EXPRESS_ACCOUNT_URL = "stripe:express:url",
}

/**
 * Data needed for execute a payment
 */
export interface PaymentIntentData {
	amount: number;
	currency: string;
	customer: string;
	paymentMethod: string;
	destination: string;
}

/**
 * Data needed for create a express account
 */
export interface ExpressAccountData {
	email: string;
	/** id dell'ACCOUNT */
	accountId: string;
	stripeAccountId?: string;
	refreshUrl: string;
	returnUrl: string;
}

