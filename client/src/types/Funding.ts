

export interface Funding {

	id?: string;
	amount: number;
	expiresAt: Date;
	status: "PENDING" | "COMPLETED" | "FAILED" | "EXPIRED";
	message?: string;
	createdAt: Date;


	//#region RELATIONSHIPS

	//feature?: Relation<FeatureRepo>;
	featureId: string;


	//user?: Relation<AccountRepo>;
	userId: string;

	//#endregion


	stripePi?: string
}





