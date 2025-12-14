import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AccountAsset } from './AccountAsset.js';
import { MessageContentRepo } from './MessageContent.js';
import type { Relation } from 'typeorm';
import { getTimestampType } from '../startup/dbConfig.js';



const dateTimeType = getTimestampType()

export enum MESSAGE_ROLE {
	SENDER = 1,
	RECEIVER = 2,
}

/**
 * Messaggio nella casella di posta di un account.
 */
@Entity('messages')
export class MessageRepo extends AccountAsset {

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	/** MESSAGE a cui fa riferimento lo stato */
	@Column({ type: 'uuid' })
	contentId: string;
	@ManyToOne(() => MessageContentRepo, message => message.statuses, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'contentId' })
	content?: Relation<MessageContentRepo>


	/** Ruolo dell'ACCOUNT rispetto al MESSAGE **/
	@Column({ type: 'int' })
	role: MESSAGE_ROLE;


	@Column({ type: 'boolean', default: false })
	isRead: boolean;

	// @Column({ type: 'boolean', default: false })
	// isArchived: boolean;

	@CreateDateColumn({ type: dateTimeType })
	createdAt?: Date;

	@UpdateDateColumn({ type: dateTimeType })
	updatedAt?: Date;
}
