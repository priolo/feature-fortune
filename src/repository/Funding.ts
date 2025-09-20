import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AccountRepo } from './Account.js';
import { AccountAssets } from './AccountAssets.js';
import { FeatureRepo } from './Feature.js';



@Entity('fundings')
export class FundingRepo extends AccountAssets {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	amount: number;

	@Column({ type: 'datetime' })
	expiresAt: Date;

	@Column({ type: 'varchar', default: 'created' })
	status: "created" | "pending" | "completed" | "failed" | "expired";

	@Column({ type: 'text', nullable: true })
	message?: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;



	//#region RELATIONSHIPS

	/** La feature che si vuole finanziare */
	@ManyToOne(() => FeatureRepo, feature => feature.fundings)
	@JoinColumn({ name: 'featureId' })
	feature?: Relation<FeatureRepo>;
	/** La feature che si vuole finanziare */
	@Column({ type: 'varchar' })
	featureId: string;

	/** Chi ci ha messi i soldi! */
	@ManyToOne(() => AccountRepo)
	@JoinColumn({ name: 'userId' })
	user?: Relation<AccountRepo>;
	/** Chi ci ha messi i soldi! */
	@Column({ type: 'varchar' })
	userId: string;

	//#endregion


	/** 
	 * ID del PaymentIntent di Stripe associato a questo funding
	 */
	@Column({ type: 'varchar', nullable: true })
	stripePi: string;

}





