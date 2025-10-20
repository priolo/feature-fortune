
import { AccountAsset } from '../AccountAsset';
import { Comment } from '../Comment';
import { Funding } from '../Funding';


/**
 * Metadati essenziali del repository GitHub
 * memorizzati per evitare chiamate API ripetute
 */
export interface GithubRepoMetadata {
	name: string;
	full_name: string;
	avatar_url: string; // avatar del owner
	description?: string;
	html_url?: string;
}


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

	/**
	 * Metadati del repository GitHub (nome, avatar, ecc.)
	 */
	githubRepoMetadata?: GithubRepoMetadata

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



