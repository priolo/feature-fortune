import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AccountAsset } from './AccountAsset.js';
import { CommentRepo } from './Comment.js';
import { FundingRepo } from './Funding.js';



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
	githubRepoId: number;
	


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


