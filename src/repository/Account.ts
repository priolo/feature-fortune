import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



@Entity('accounts')
export class AccountRepo {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'varchar', unique: true })
	email: string;

	@Column({ type: 'varchar', nullable: true })
	name: string;

	@Column({ type: 'varchar', nullable: true })
	avatarUrl: string;



	/**
	 * account google
	 */
	@Column({ type: 'varchar', nullable: true })
	googleEmail: string;


	/**
	 * ACCOUNT GITHUB that are the owner
	 */
	@Column({ type: 'bigint', nullable: true })
	githubId: number;

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
	 * account generato con email
	 */
	@Column({ type: 'varchar', default: '' })
	password?: string;

	@Column({ type: 'varchar', nullable: true })
	salt?: string;

}
