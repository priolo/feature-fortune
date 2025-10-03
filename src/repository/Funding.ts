import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AccountAsset } from './AccountAsset.js';
import { CommentRepo } from './Comment.js';
import { FeatureRepo } from './Feature.js';



export enum FUNDING_STATE {
	CREATED = "created",
	PENDING = "pending",
	PAIED = "paied",
	FAILED = "failed",
} 


@Entity('fundings')
export class FundingRepo extends AccountAsset {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	/**
	 * in centesimi. Per esempio 2000 = 2 euro
	 */
	@Column({ type: 'decimal', precision: 10, scale: 2 })
	amount: number;

	@Column({ type: 'varchar', default: FUNDING_STATE.CREATED })
	status?: FUNDING_STATE

	@Column({ type: 'text', nullable: true })
	message?: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: Date;

	@Column({ type: 'datetime', nullable: true })
	expiresAt?: Date;

	/**
	 * When the fundig is paied
	 */
	@Column({ type: 'datetime', nullable: true })
	paidAt?: Date;

	/**
	 * ID stripe payment
	 */
	@Column({ type: 'varchar', nullable: true })
	transactionId?: string;


	//#region RELATIONSHIPS

	/** La feature che si vuole finanziare */
	@ManyToOne(() => FeatureRepo, feature => feature.fundings)
	@JoinColumn({ name: 'featureId' })
	feature?: Relation<FeatureRepo>;
	/** La feature che si vuole finanziare */
	@Column({ type: 'varchar' })
	featureId: string;

	/**
	 * comments on the feature
	 */
	@OneToMany(() => CommentRepo, comment => comment.funding)
	comments?: Relation<CommentRepo[]>;

	//#endregion

}

