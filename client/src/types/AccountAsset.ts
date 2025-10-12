import { Account } from "./Account"

/**
 * Rappresenta un entità che appartiene ad un ACCOUNT
 */
export interface AccountAsset {
	/** l'account a cui appartiene questa entità */
	account?: Account
	/** l'ID account a cui appartiene questa entità */
	accountId?: string
}