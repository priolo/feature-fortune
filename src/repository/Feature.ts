import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AccountRepo } from './Account.js';
import { AccountAssets } from './AccountAssets.js';
import { CommentRepo } from './Comment.js';
import { FundingRepo } from './Funding.js';



@Entity('features')
export class FeatureRepo extends AccountAssets {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'varchar', nullable: true })
    github?: string;

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


	
	//#region RELATIONSHIPS

	@ManyToOne(() => AccountRepo)
	@JoinColumn({ name: 'userId' })
	user?: Relation<AccountRepo>;

	@Column({ type: 'varchar' })
	userId: string;

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


