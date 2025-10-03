import { Feature } from "./feature/Feature";
import { Funding } from "./Funding";



export interface Comment {

	id?: string;
	text: string;
	createdAt?: Date;

	
	//#region RELATIONSHIPS

    entityType?: 'feature' | 'funding';

    /**
     * ID of the entity this comment belongs to
     */
    entityId?: string;

    /**
     * Feature entity (only populated when entityType is 'feature')
     */
    feature?: Feature;

    /**
     * Funding entity (only populated when entityType is 'funding')
     */
    funding?: Funding;

	//#endregion
}

 
  


