import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountAsset } from './AccountAsset.js';
import { CommentRepo } from './Comment.js';
import { FundingRepo } from './Funding.js';


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
	 * Segna la FEATURE come completata
	 * RELEASED -> COMPLETED
	 */
	ATH_COMPLETE = "ath_complete",
}

@Entity('features')
export class FeatureRepo extends AccountAsset {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	/**
	 * title of the feature
	 */
	@Column({ type: 'varchar' })
	title: string;

	/**
	 * description of the feature
	 */
	@Column({ type: 'text' })
	description: string;

	/**
	 * current status of the feature
	 */
	@Column({ type: 'varchar', default: FEATURE_STATUS.PROPOSED })
	status?: FEATURE_STATUS


	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;



	/**
	 * GITHUB REPO ID collegato a questa FEATURE
	 */
	@Column({ type: 'bigint', nullable: true })
	githubRepoId?: number;

	/**
	 * Metadati del repository GitHub (nome, avatar, ecc.)
	 * Viene popolato quando si seleziona un repository
	 */
	@Column({ type: 'json', nullable: true })
	githubRepoMetadata?: GithubRepoMetadata;

	/**
	 * GITHUB USER ID del DEV a cui è assegnata questa feature
	 */
	@Column({ type: 'bigint', nullable: true })
	githubDevId?: number;

	/**
	 * ACCOUNT ID APP del DEV a cui è assegnata questa feature
	 */
	@Column({ type: 'bigint', nullable: true })
	accountDevId?: string;


	//#region RELATIONSHIPS

	/**
	 * the accounts that funded this feature
	 */
	@OneToMany(() => FundingRepo, funding => funding.feature)
	fundings?: Relation<FundingRepo[]>;

	/**
	 * comments on the feature
	 */
	comments?: CommentRepo[]

	//#endregion
}


