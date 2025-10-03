import { AccountAsset } from "./AccountAsset";
import { Feature } from "./feature/Feature";



export interface Funding extends AccountAsset {

	id?: string;

	amount: number;
	
	status: "created" | "pending" | "completed" | "failed" | "expired";

	message?: string;

	createdAt?: Date;

	expiresAt: Date;

	paidAt?: Date;

	transactionId?: string;

	//#region RELATIONSHIPS

	feature?: Feature
	featureId: string
	
	comments?: Comment[]

	//#endregion

}





