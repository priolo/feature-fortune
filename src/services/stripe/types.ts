
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
	/** somma da trasferire in centesimi: 1030 "eur"= 10.30 euro */
	amount: number;
	/** valuta: */
	currency: string;
	/** id dell'CUSTOMER-STRIPE che paga */
	customer: string;
	/** id del PaymentMethod che verra' clonato */
	paymentMethod: string;
	/** id dell'ACCOUNT-STRIPE collegato alla piattaforma che riceve il direct payment */
	destination: string;
	/** permette di effettuare il pagamento una sola volta */
	fundingId?: string;
	/** email del CUSTOMER in maniera che Stripe lo avverta quando c'e' una transazione */
	receiptEmail?: string;
	/** Nome del progetto finanziato che appare come descrizione nell'addebito */
	projectName?: string;
}



