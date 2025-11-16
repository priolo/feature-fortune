import { AccountAsset } from "./AccountAsset";
import { Feature } from "./feature/Feature";



export enum FUNDING_STATUS {
	/** 
	 * viene controllato per le verifiche 
	 * next: CANCELLED | PAYABLE
	 * */
	PENDING = "pending",
	/**
	 * il pagamento è stato annullato 
	 * next: (nessuno)
	 */
	CANCELLED = "cancelled",
	/**
	 * è dichiarato "pagabile" dal proprietario o dal sistema
	 * next: PAIED | ERROR
	 */
	PAYABLE = "payable",
	/**
	 * è stato pagato
	 * next: (nessuno)
	 */
	PAIED = "paied",
	/** 
	 * si è verificato un errore nel pagamento
	 * next: PAYABLE | CANCELLED
	 */
	ERROR = "error",
}

export interface Funding extends AccountAsset {

	id?: string;

	currency: string;
	amount: number;

	status: FUNDING_STATUS

	message?: string;

	

	createdAt?: Date;


	paidAt?: Date;

	transactionId?: string;

	//#region RELATIONSHIPS

	feature?: Feature
	featureId: string

	comments?: Comment[]

	//#endregion

}
