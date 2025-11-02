import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MessageRepo } from './Message.js';
import { AccountAsset } from './AccountAsset.js';



@Entity('messages-content')
export class MessageContentRepo extends AccountAsset {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'text' })
	text: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: Date;

	
	//#region RELATIONSHIPS

	@OneToMany(() => MessageRepo, message => message.account)
	statuses?: MessageRepo[];

	//#endregion
}
