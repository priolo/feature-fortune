import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AccountAsset } from './AccountAsset.js';
import { CommentRepo } from './Comment.js';
import { FeatureRepo } from './Feature.js';



@Entity('fundings')
export class FundingRepo extends AccountAsset {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	amount: number;

	@Column({ type: 'varchar', default: 'created' })
	status: "created" | "pending" | "completed" | "failed" | "expired";

	@Column({ type: 'text', nullable: true })
	message?: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'datetime' })
	expiresAt: Date;


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


	/** 
	 * ID del PaymentIntent di Stripe associato a questo funding
	 */
	@Column({ type: 'varchar', nullable: true })
	stripePi: string;

}





