import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { ProviderRepo } from './Provider.js';



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

	@Column({ type: 'bigint', nullable: true })
	githubId: string;

	/**
	 * visibile agli LLMs
	 */
	@Column({ type: 'varchar', default: '' })
	description?: string;

	@Column({ type: 'varchar', default: '' })
	password?: string;

	@Column({ type: 'varchar', default: '' })
	salt?: string;


	//#region RELATIONSHIPS

	/** I providers di accesso associati a questo user */
	@OneToMany(() => ProviderRepo, provider => provider.account)
	providers?: Relation<ProviderRepo[]>

	//#endregion






	// collegamento con un account STRIPE
	@Column({ type: 'varchar', nullable: true })
	stripe_id?: string;

}
