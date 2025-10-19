
import { AccountAsset } from '../AccountAsset';
import { Comment } from '../Comment';
import { Funding } from '../Funding';



export enum FEATURE_STATUS {
	/**
	 * la feature è stata proposta	
	 * next: IN_DEVELOPMENT | CANCELLED
	 */
	PROPOSED = "proposed",	
	/**
	 * la feature è stata accettata da un AUTHOR ed è in fase di sviluppo
	 * next: COMPLETED | CANCELLED
	 */
	IN_DEVELOPMENT = "in_development",
	/**
	 * l'AUTHOR dichiara la FEATURE completata
	 * next: COMPLETED | CANCELLED
	 */
	RELEASED = "released",
	/**
	 * la feature è stata completata
	 * next: (nessuno)
	 */
	COMPLETED = "completed",
	/**
	 * la feature è stata annullata
	 * next: (nessuno)
	 */
	CANCELLED = "cancelled",
}


export interface Feature extends AccountAsset {
	
	id?: string;

	title: string;

	description: string;

	status: FEATURE_STATUS

	createdAt?: Date;
	

	githubRepoId?: number	

	githubDevId?: number

	accountDevId?: string

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



