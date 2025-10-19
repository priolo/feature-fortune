import { Account } from "./Account.js"
import { AccountAsset } from "./AccountAsset.js"
import { Uuid } from "./global.js"



export interface Message extends AccountAsset {

	id?: Uuid
	text: string
	isRead?: boolean
	createdAt?: string

	receiverId: Uuid
	receiver?: Account

}
