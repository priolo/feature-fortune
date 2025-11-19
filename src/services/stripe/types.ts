
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
	 * Create a STANDARD account URL
	 * for register in STRIPE web-app for AUTHOR
	 * this for receive moneys
	 * Registration completion is notified in the WEBHOOK
	 */
	ACCOUNT_CREATE = "stripe:account:create",
	ACCOUNT_URL = "stripe:account:url",
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



