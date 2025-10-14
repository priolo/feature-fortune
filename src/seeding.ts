import { Bus, RootService, typeorm } from "@priolo/julian";
import { AccountRepo, EMAIL_CODE } from "./repository/Account.js";
import { FeatureRepo } from "./repository/Feature.js";
import { FundingRepo } from "./repository/Funding.js";
import { envInit } from "./types/env.js";



envInit();

export async function seeding(root: RootService) {

	const accounts = await new Bus(root, "/typeorm/accounts").dispatch<AccountRepo[]>({
		type: typeorm.RepoStructActions.SEED,
		payload: <AccountRepo[]>[
			{ type: typeorm.RepoStructActions.TRUNCATE },
			{ 
				id: "id-user-1", 
				name: "Giuseppe Verdi", 
				email: "giuseppe.verdi@gmail.com", 
				emailCode: EMAIL_CODE.VERIFIED,
			},
			{ id: "id-user-2", name: "Mario Rossi", email: "mario.rossi@gmail.com", },
			{ id: "id-user-3", name: "Luigi Bianchi", email: "luigi.bianchi@gmail.com", },
		]
	});

	const features = await new Bus(root, "/typeorm/features").dispatch<FeatureRepo[]>({
		type: typeorm.RepoStructActions.SEED,
		payload: <FeatureRepo[]>[
			{ type: typeorm.RepoStructActions.TRUNCATE },
			{
				id: "id-feature-1",
				githubRepoId: 334893295, //"priolo/jon", 
				title: "Vorrei una funzionalità X", 
				description: "La funzionalità X mi permetterebbe di fare Y e Z, migliorando il mio flusso di lavoro in questo modo...", 
				accountId: accounts[0].id!,
			},
			{
				id: "id-feature-2",
				githubRepoId: 875133378, //"priolo/jess", 
				title: "Vorrei una funzionalità Y",
				description: "La funzionalità Y sarebbe fantastica perché mi aiuterebbe a risolvere il problema di A e B, rendendo tutto più efficiente...",
				accountId: accounts[0].id!,
			},
		]
	});

	const funding = await new Bus(root, "/typeorm/fundings").dispatch<FeatureRepo[]>({
		type: typeorm.RepoStructActions.SEED,
		payload: <FundingRepo[]>[
			{ type: typeorm.RepoStructActions.TRUNCATE },
			{
				amount: 50.00,
				expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
				status: "pending",
				message: "Spero che questa funzionalità venga implementata presto!",
				featureId: features[0].id!,
				accountId: accounts[1].id!,	
			},
			{
				amount: 75.00,
				expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 2)),
				status: "pending",
				message: "Questa feature risolverebbe molti dei miei problemi quotidiani!",
				featureId: features[0].id!,
				accountId: accounts[2].id!,	
			},
			{
				amount: 25.00,
				expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
				status: "pending",
				message: "Contribuisco volentieri per vedere questa funzionalità realizzata.",
				featureId: features[0].id!,
				accountId: accounts[0].id!,	
			},
			{
				amount: 100.00,
				expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
				status: "pending",
				message: "Investimento importante per una feature che cambierà tutto!",
				featureId: features[0].id!,
				accountId: accounts[1].id!,	
			}
		]
	});

}
