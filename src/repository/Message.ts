import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountRepo } from './Account.js';
import { AccountAsset } from './AccountAsset.js';



@Entity('messages')
export class MessageRepo extends AccountAsset {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'text' })
	text: string;

	@Column({ type: 'boolean', default: false })
	isRead: boolean;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: Date;

	
	//#region RELATIONSHIPS
	
	/** The receiver Account */
	@ManyToOne(() => AccountRepo, { nullable: false })
	@JoinColumn({ name: 'receiverId' })
	receiver?: AccountRepo
	@Column({ type: 'varchar' })
	receiverId: string

	//#endregion
}
