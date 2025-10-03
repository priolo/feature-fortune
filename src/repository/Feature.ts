import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AccountAsset } from './AccountAsset.js';
import { CommentRepo } from './Comment.js';
import { FundingRepo } from './Funding.js';
import { AccountRepo } from './Account.js';



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


	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;



	/**
	 * GITHUB REPO ID
	 */
	@Column({ type: 'bigint', nullable: true })
	githubId: number;
	/**
	 * GITHUB REPO name [II] da eliminare
	 */
	@Column({ type: 'varchar' })
	githubName: string;


	//#region RELATIONSHIPS

	/** 
	 * Account autore del GITHUB. Non è detto che ci sia
	 */
	// @ManyToOne(() => AccountRepo)
	// @JoinColumn({ name: 'authorId' })
	// author?: Relation<AccountRepo>;
	// /** autore del GITHUB. Non è detto che ci sia */
	// @Column({ type: 'varchar', nullable: true })
	// authorId?: string;

	/**
	 * the accounts that funded this feature
	 */
	@OneToMany(() => FundingRepo, funding => funding.feature)
	fundings?: Relation<FundingRepo[]>;

	/**
	 * comments on the feature
	 */
	@OneToMany(() => CommentRepo, comment => comment.feature)
	comments?: Relation<CommentRepo[]>;

	//#endregion
}


