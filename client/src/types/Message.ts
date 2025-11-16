import { Account } from "./Account.js";
import { AccountAsset } from "./AccountAsset.js";
import { Uuid } from "./global.js"


export enum MESSAGE_ROLE {
	SENDER = 1,
	RECEIVER = 2,
}

export interface MessageContent extends AccountAsset {
	id?: Uuid
	text: string

	createdAt?: string
}

export interface Message {
	id?: Uuid;


	/** MESSAGE a cui fa riferimento lo stato */
	contentId?: string;
	content?: MessageContent;


	/** ACCOUNT che ha il ROLE sul MESSAGE **/
	accountId?: string;
	account?: Account;
	/** Ruolo dell'ACCOUNT rispetto al MESSAGE **/
	role: MESSAGE_ROLE;


	isRead: boolean;
	isArchived: boolean;


	createdAt?: Date;
	updatedAt?: Date;
}