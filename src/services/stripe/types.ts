
export enum Actions {
	/** 
	 * execute a memorized payment  
	 * payload: PaymentIntentData
	 **/
	PAYMENT_EXECUTE = "stripe:payment:execute",

	/** get o create new if not exist */
	CUSTOMER_GET_CREATE = "stripe:customer:get-create",

	/** create a setup intent where in future save cards data */
	INTENT_SETUP = "stripe:intent:setup",

	/** all payment methods for a stripe customer */
	PAYMENT_METHOD_LIST = "stripe:payment:list",
	/** fetch a payment method with its id*/
	PAYMENT_METHOD_GET = "stripe:payment:get",
	/** remove all payment method for a CUTOMER */
	PAYMENT_METHOD_REMOVE_ALL = "stripe:payment:remove-all",
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



