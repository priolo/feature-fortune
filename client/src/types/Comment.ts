


export interface Comment {

	id?: string;
	text: string;
	createdAt: Date;


	
	//#region RELATIONSHIPS

	//user?: Relation<AccountRepo>;
	userId: string;

	/**
	 * entity that have this comment
	 */
	//feature?: Relation<FeatureRepo>;
	entityId: string;

	//#endregion
}

 
  


