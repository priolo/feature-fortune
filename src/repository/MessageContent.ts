import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MessageRepo } from './Message.js';
import { AccountAsset } from './AccountAsset.js';
import { getTimestampType } from './dbConfig.js';



const dateTimeType = getTimestampType()

/**
 * Il contenuto di un messaggio
 * è opresente in piu' caselle di posta (sender e receiver)
 * non è modificabile
 */
@Entity('messages_content')
export class MessageContentRepo extends AccountAsset {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'text' })
	text: string;

	@Column({ type: dateTimeType, default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: Date;

	
	//#region RELATIONSHIPS

	@OneToMany(() => MessageRepo, message => message.account)
	statuses?: MessageRepo[];

	//#endregion
}
