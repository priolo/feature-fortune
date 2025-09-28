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
	 * account github
	 */
	@Column({ type: 'bigint', nullable: true })
	githubId: number;

	/** 
	 * STRIPE account per CONTRIBUTOR
	 */
	@Column({ type: 'varchar', nullable: true })
	stripeCustomerId?: string;
	// pagamento predefinito
	@Column({ type: 'varchar', nullable: true })
	stripePaymentMethodId?: string;
	// account EXPRESS per AUTHOR
	@Column({ type: 'varchar', nullable: true })
	stripeAccountId?: string;






	/**
	 * account generato con email
	 */
	@Column({ type: 'varchar', default: '' })
	password?: string;

	@Column({ type: 'varchar', default: '' })
	salt?: string;


	//#region RELATIONSHIPS

	/** I providers di accesso associati a questo user */
	// @OneToMany(() => ProviderRepo, provider => provider.account)
	// providers?: Relation<ProviderRepo[]>

	//#endregion







}
