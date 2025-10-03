import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AccountRepo } from './Account.js';
import { AccountAsset } from './AccountAsset.js';
import { FeatureRepo } from './Feature.js';
import { FundingRepo } from './Funding.js';



@Entity('comments')
export class CommentRepo extends AccountAsset {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'text' })
	text: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: Date;


	
	//#region RELATIONSHIPS
	
	 /**
     * Type of entity this comment belongs to
     */
    @Column({ type: 'varchar' })
    entityType?: 'feature' | 'funding';

    /**
     * ID of the entity this comment belongs to
     */
    @Column({ type: 'varchar' })
    entityId: string;

    /**
     * Feature entity (only populated when entityType is 'feature')
     */
    // @ManyToOne(() => FeatureRepo, feature => feature.comments)
    // @JoinColumn({ name: 'entityId' })
    // feature?: Relation<FeatureRepo>;

    /**
     * Funding entity (only populated when entityType is 'funding')
     */
    // @ManyToOne(() => FundingRepo, funding => funding.comments)
    // @JoinColumn({ name: 'entityId' })
    // funding?: Relation<FundingRepo>;

	//#endregion
}

 
  


