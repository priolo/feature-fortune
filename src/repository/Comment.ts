import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AccountRepo } from './Account.js';
import { AccountAssets } from './AccountAssets.js';
import { FeatureRepo } from './Feature.js';



@Entity('comments')
export class CommentRepo extends AccountAssets {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'text' })
	text: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;


	
	//#region RELATIONSHIPS

	@ManyToOne(() => AccountRepo)
	@JoinColumn({ name: 'userId' })
	user?: Relation<AccountRepo>;
	@Column({ type: 'varchar' })
	userId: string;

	/**
	 * entity that have this comment
	 */
	@ManyToOne(() => FeatureRepo, feature => feature.comments)
	@JoinColumn({ name: 'entityId' })
	feature?: Relation<FeatureRepo>;
	@Column({ type: 'varchar' })
	entityId: string;

	//#endregion
}

 
  


