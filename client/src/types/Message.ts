import { Uuid } from "./global.js"
import { Account } from "./Account.js"



export interface Message {

	id: Uuid

	senderId: Uuid
	sender?: Account

	receiverId: Uuid
	receiver?: Account

	text: string

	createdAt?: string
	updatedAt?: string
}
