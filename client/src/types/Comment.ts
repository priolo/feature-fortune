import { AccountAsset } from "./AccountAsset";



export interface Comment extends AccountAsset {

	id?: string;
	text: string;
	createdAt?: Date;
	
	//#region RELATIONSHIPS

    entityType?: 'feature' | 'funding';

    /**
     * ID of the entity this comment belongs to
     */
    entityId?: string;

	//#endregion
}
