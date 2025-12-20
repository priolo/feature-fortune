import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



export enum EMAIL_CODE {
	VERIFIED = "verified",
	UNVERIFIED = null,
}

export enum ROLE {
	USER = 1,
	ADMIN = 0,
}

@Entity('accounts')
export class AccountRepo {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'varchar', nullable: true })
	name?: string;

	/** ruolo dell'account */
	@Column({ type: "varchar", length: 32, default: ROLE.USER })
	role?: ROLE;

	/** lingua preferita dell'utente */
	@Column({ type: 'varchar', nullable: true, default: 'en' })
	language?: string;

	/** Abilita le notifiche per email */
	@Column({ type: 'boolean', nullable: false, default: true })
	notificationsEnabled?: boolean;

	/** currency code ISO 4217, per esempio "eur" o "usd" */
	@Column({ type: 'varchar', length: 3, default: 'eur' })
	preferredCurrency?: string;



	/** valorizzata alla registrazione oppure da accesso google */
	@Column({ type: 'varchar', nullable: true })
	email?: string;
	/** il codice di verifica dell'email */
	@Column({ type: 'varchar', default: EMAIL_CODE.UNVERIFIED, nullable: true })
	emailCode?: string;


	/** immagine dell'avatar */
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
	@Column({ type: 'int', nullable: true })
	githubId?: number;
	/**
	 * nome utente GITHUB collegato a questo ACCOUNT
	 */
	@Column({ type: 'varchar', nullable: true })
	githubName?: string



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

/**
 * Payload memorizzato nel JWT token
 */
export type JWTPayload = {
	id: string;
	email: string;
	name: string;
}

/** 
 * restituisce una versione "sendable" dell'ACCOUNT, senza campi sensibili 
 */
export function accountSendable(account: AccountRepo) {
	if (!account) return null
	const {
		id, name, language, notificationsEnabled, preferredCurrency,
		email, avatarUrl, googleEmail, githubId, githubName,
		stripeAccountId, stripeAccountStatus
	} = account
	return {
		id, name, language, notificationsEnabled, preferredCurrency,
		email, avatarUrl, googleEmail, githubId, githubName,
		stripeAccountId, stripeAccountStatus,
		stripeHaveCard: !!account.stripePaymentMethodId,
		// se c'e' emailCode allora non e' verificata
		emailVerified: account.emailCode == EMAIL_CODE.VERIFIED,
	}
}
/**
 * Restituisce una lista di ACCOUNT in versione "sendable"
 */
export function accountSendableList(accounts: AccountRepo[]) {
	return accounts.map(account => accountSendable(account))
}

/**
 * Metadati essenziali del repository GitHub
 * memorizzati per evitare chiamate API ripetute
 */
export interface GithubAccountMetadata {
	name: string;
	full_name: string;
	avatar_url: string; // avatar del owner
	description?: string;
	html_url?: string;
}
