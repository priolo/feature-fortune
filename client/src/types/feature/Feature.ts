
import { AccountAsset } from '../AccountAsset';
import { Comment } from '../Comment';
import { Funding } from '../Funding';



export interface Feature extends AccountAsset {
	
	id?: string;

	title: string;

	description: string;

	createdAt: Date;

	githubRepoId?: number	

	//#region RELATIONSHIPS

	/**
	 * the accounts that funded this feature
	 */
	fundings?: Funding[]

	/**
	 * comments on the feature
	 */
	comments?: Comment[]

	//#endregion
}
