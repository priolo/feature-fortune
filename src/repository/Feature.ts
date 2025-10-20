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


