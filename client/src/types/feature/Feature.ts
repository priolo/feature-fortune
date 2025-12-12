
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
	owner: {
		id: number,
		login: string,
		avatar_url: string,
	},
	description?: string;
	html_url?: string;
}


export enum FEATURE_STATUS {
	/**
	 * AUTHOR: la feature è stata proposta	
	 * next: IN_DEVELOPMENT | CANCELLED
	 */
	PROPOSED = "proposed",
	/**
	 * DEV: la feature è stata accettata da un DEV ed è in fase di sviluppo
	 * next: COMPLETED | CANCELLED
	 */
	IN_DEVELOPMENT = "in_development",
	/**
	 * DEV dichiara la FEATURE completata
	 * next: COMPLETED | CANCELLED
	 */
	RELEASED = "released",
	/**
	 * AUTHOR: dichiara che la feature è stata completata
	 * next: PAID
	 */
	COMPLETED = "completed",
	/**
	 * SYSTEM: setta la FEATURE a stata PAGATA
	 * next: (nessuno)
	 */
	PAID = "paid",

	/**
	 * AUTHOR: la feature è stata annullata
	 * next: (nessuno)
	 */
	CANCELLED = "cancelled",
}


export enum FEATURE_ACTIONS {
	/**
	 * Chiamato dal DEV
	 * per accettare lo sviluppo delle FEATURE
	 * PROPOSED -> IN_DEVELOPMENT
	 */
	DEV_ACCEPT = "dev_accept",
	/**
	 * Chiamato dal DEV 
	 * per rinunciare alla FEATURE
	 * elimina se stesso come DEV
	 * PROPOSED -> PROPOSED dev=null
	 */
	DEV_DECLINE = "dev_decline",
	/**
	 * Chiamato dal DEV 
	 * per rinunciare alla FEATURE
	 * elimina se stesso come DEV
	 * PROPOSED -> PROPOSED dev=null
	 * IN_DEVELOPMENT -> PROPOSED dev=null
	 */
	DEV_LEAVE = "dev_leave",
	/**
	 * Chiamato dal DEV
	 * Indica che la FEATURE è stata rilasciata
	 * IN_DEVELOPMENT -> RELEASED
	 */
	DEV_RELEASE = "dev_release",
	/**
	 * Chiamata dall'AUTHOR
	 * Segna la FEATURE come annullata
	 * PROPOSED | IN_DEVELOPMENT | RELEASED -> CANCELLED
	 */
	ATH_CANCEL = "ath_cancel",
	/**
	 * Chiamata dall'AUTHOR
	 * Riporta la FEATURE allo stato di IN_DEVELOPMENT
	 * RELEASED -> IN_DEVELOPMENT
	 */
	ATH_REJECTED = "ath_rejected",
	/**
	 * Chiamata dall'AUTHOR
	 * Segna la FEATURE come completata
	 * RELEASED -> COMPLETED
	 */
	ATH_COMPLETE = "ath_complete",
}


export interface Feature extends AccountAsset {

	id?: string;

	title: string;

	description: string;

	link?: string;

	status: FEATURE_STATUS

	completedAt?: Date;
	
	createdAt?: Date;



	/** il REPO del progetto soggetto della FEATURE */
	githubRepoId?: number

	/**
	 * Metadati del repository GitHub (nome, avatar, ecc.)
	 * mi serve per la lista delle FEATURES per ricvare immediatamente i dati del REPO
	 */
	githubRepoMetadata?: GithubRepoMetadata

	/** l'ACCOUNT GitHub che deve implementare la FEATURE */
	githubDevId?: number

	/** l'ACCOUNT interno che deve implementare la FEATURE */
	accountDevId?: string



	/**
	 * the accounts that funded this feature
	 */
	fundings?: Funding[]

	/**
	 * comments on the feature
	 */
	comments?: Comment[]

}