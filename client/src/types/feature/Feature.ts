
import { AccountAsset } from '../AccountAsset';
import { Funding } from '../Funding';



export interface Feature extends AccountAsset {
	
	id?: string;
    github?: string;
	title: string;
	description: string;
	createdAt: Date;

	// GitHub repository 
	githubName: string
	
	//#region RELATIONSHIPS


	/**
	 * the accounts that funded this feature
	 */
	fundings?: Funding[]

	/**
	 * comments on the feature
	 */
	//comments?: Relation<CommentRepo[]>;

	//#endregion
}
