import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



export enum EMAIL_CODE {
	VERIFIED = "verified",
	UNVERIFIED = null,
}

@Entity('accounts')
export class AccountRepo {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'varchar', nullable: true })
	email?: string;
	@Column({ type: 'varchar', default: EMAIL_CODE.UNVERIFIED, nullable: true })
	emailCode?: string;

	@Column({ type: 'varchar', nullable: true })
	name?: string;

	@Column({ type: 'varchar', nullable: true })
	avatarUrl?: string;



	/**
	 * account google
	 */
	@Column({ type: 'varchar', nullable: true })
	googleEmail?: string;


	
	/**
	 * ACCOUNT GITHUB that are the owner
	 */
	@Column({ type: 'bigint', nullable: true })
	githubId?: number;



	//#region STRIPE

	/** 
	 * STRIPE for CONTRIBUTOR
	 * who put the moneys
	 */
	@Column({ type: 'varchar', nullable: true })
	stripeCustomerId?: string;
	/** 
	 * STRIPE payment method 
	 */
	@Column({ type: 'varchar', nullable: true })
	stripePaymentMethodId?: string;
	/** 
	 * STRIPE for AUTHOR
	 * who receive the moneys
	 */
	@Column({ type: 'varchar', nullable: true })
	stripeAccountId?: string;
	/** 
	 */
	@Column({ type: 'varchar', nullable: true })
	stripeAccountStatus?: "pending" | "ready";

	//#endregion STRIPE
	

}

export type JWTPayload = {
	id: string;
	email: string;
	name: string;
}

export function accountSendable(account: AccountRepo) {
	if ( !account ) return null
	const { id, email, name, avatarUrl, googleEmail, githubId, stripeAccountStatus, stripeAccountId } = account
	return {
		id, email, name, avatarUrl, googleEmail, githubId, stripeAccountId, stripeAccountStatus,

		stripeHaveCard: !!account.stripePaymentMethodId,
		
		// se c'e' emailCode allora non e' verificata
		emailVerified: account.emailCode == EMAIL_CODE.VERIFIED,
	}
}


