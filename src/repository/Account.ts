import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { ProviderRepo } from './Provider.js';



@Entity('accounts')
export class AccountRepo {

	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ type: 'varchar', default: '' })
	email: string;

	@Column({ type: 'varchar', default: '' })
	name: string;

	@Column({ type: 'varchar', default: '' })
	avatarUrl: string;

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





	// [II] probabilmente da mettere nei Providers
	@Column({ type: 'integer', nullable: true })
	githubId?: string;

	// collegamento con un account STRIPE
	@Column({ type: 'varchar', nullable: true })
	stripe_id?: string;

}
