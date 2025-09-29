import { AccountAsset } from "./AccountAsset";
import { Feature } from "./feature/Feature";



export interface Funding extends AccountAsset {

	id?: string;
	amount: number;
	
	status: "created" | "pending" | "completed" | "failed" | "expired";
	message?: string;

	createdAt?: Date;
	expiresAt: Date;


	//#region RELATIONSHIPS

	//feature?: Relation<FeatureRepo>;
	featureId: string
	feature?: Feature

	//#endregion


	stripePi?: string
}





