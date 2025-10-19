import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { AccountRepo } from './Account.js';


/**
 * Rappresenta un entità che appartiene ad un ACCOUNT
 */
export abstract class AccountAsset {

	/** l'ACCOUNT proprietario */
	@ManyToOne(() => AccountRepo, { nullable: true })
	@JoinColumn({ name: 'accountId' })
	account?: AccountRepo

	/** l'ID dell'ACCOUNT proprietario */
	@Column({ type: 'varchar', default: null })
	accountId?: string

}
