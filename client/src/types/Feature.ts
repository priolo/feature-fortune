
import { GitHubRepositoryDetails } from './GitHub';

export interface Feature {
	
	id?: string;
    github?: string;
	title: string;
	description: string;
	createdAt: Date;

	// GitHub repository information
	githubRepo?: GitHubRepositoryDetails;
	
	//#region RELATIONSHIPS

	//user?: Account;
	userId: string;

	/**
	 * the accounts that funded this feature
	 */
	//fundings?: Relation<FundingRepo[]>;

	/**
	 * comments on the feature
	 */
	//comments?: Relation<CommentRepo[]>;

	//#endregion
}
