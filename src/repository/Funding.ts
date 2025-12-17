import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountAsset } from './AccountAsset.js';
import { FeatureRepo } from './Feature.js';
import { getTimestampType } from '../startup/dbConfig.js';



const dateTimeType = getTimestampType()

/**
 * Stati del FUNDING
 */
export enum FUNDING_STATUS {
	/** 
	 * viene controllato per le verifiche 
	 * next: CANCELLED | PAYABLE
	 * */
	PENDING = "pending",
	/**
	 * il pagamento è stato annullato 
	 * next: (nessuno)
	 */
	CANCELLED = "cancelled",
	/**
	 * è dichiarato "pagabile" dal proprietario o dal sistema
	 * next: PAIED | ERROR
	 */
	PAYABLE = "payable",
	/**
	 * in attesa di conferma pagamanto da STRIPE
	 */
	WAITING = "waiting",
	/**
	 * è stato pagato
	 * next: (nessuno)
	 */
	PAIED = "paied",
	/** 
	 * si è verificato un errore nel pagamento
	 * next: PAYABLE | CANCELLED
	 */
	ERROR = "error",
}


@Entity('fundings')
export class FundingRepo extends AccountAsset {

	@PrimaryGeneratedColumn("uuid")
	id?: string;


	/** currency code ISO 4217, per esempio "eur" o "usd" */
	@Column({ type: 'varchar', length: 3, default: 'eur' })
	currency: string;
	/** in centesimi. Per esempio 2000 = 2 euro */
	@Column({ type: 'int' })
	amount: number;

	@Column({ type: 'varchar', default: FUNDING_STATUS.PENDING })
	status?: FUNDING_STATUS

	@Column({ type: 'text', nullable: true })
	message?: string;

	@Column({ type: dateTimeType, default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: Date;

	@Column({ type: dateTimeType, nullable: true })
	expiresAt?: Date;

	/**
	 * When the fundig is paied
	 */
	@Column({ type: dateTimeType, nullable: true })
	paidAt?: Date;

	/**
	 * il PaymentIntent.id di Stripe
	 */
	@Column({ type: 'varchar', nullable: true })
	transactionId?: string;



	//#region RELATIONSHIPS


	/** La feature che si vuole finanziare */
	@ManyToOne(() => FeatureRepo, feature => feature.fundings)
	@JoinColumn({ name: 'featureId' })
	feature?: Relation<FeatureRepo>;
	/** La feature che si vuole finanziare (id)*/
	@Column({ type: 'varchar' })
	featureId: string;


	//#endregion

}

