import { Bus, RootService, typeorm } from "@priolo/julian";
import { AccountRepo } from "./repository/Account.js";
import { FeatureRepo } from "./repository/Feature.js";
import { FundingRepo } from "./repository/Funding.js";
import { envInit } from "./types/env.js";



envInit();

export async function seeding(root: RootService) {

	const accounts = await new Bus(root, "/typeorm/accounts").dispatch<AccountRepo[]>({
		type: typeorm.RepoStructActions.SEED,
		payload: <AccountRepo[]>[
			{ type: typeorm.RepoStructActions.TRUNCATE },
			{ id: "id-user-1", name: "Giuseppe Verdi", email: "giuseppe.verdi@gmail.com", password: "test" },
			{ id: "id-user-2", name: "Mario Rossi", email: "mario.rossi@gmail.com", password: "test" },
			{ id: "id-user-3", name: "Luigi Bianchi", email: "luigi.bianchi@gmail.com", password: "test" },
		]
	});

	const features = await new Bus(root, "/typeorm/features").dispatch<FeatureRepo[]>({
		type: typeorm.RepoStructActions.SEED,
		payload: <FeatureRepo[]>[
			{ type: typeorm.RepoStructActions.TRUNCATE },
			{
				github: "priolo/jack", 
				title: "Vorrei una funzionalità X", 
				description: "La funzionalità X mi permetterebbe di fare Y e Z, migliorando il mio flusso di lavoro in questo modo...", 
				userId: accounts[0].id!,
			},
			{
				github: "priolo/jess", 
				title: "Vorrei una funzionalità Y",
				description: "La funzionalità Y sarebbe fantastica perché mi aiuterebbe a risolvere il problema di A e B, rendendo tutto più efficiente...",
				userId: accounts[0].id!,
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
				status: "PENDING",
				message: "Spero che questa funzionalità venga implementata presto!",
				featureId: features[0].id!,
				userId: accounts[1].id!,	
			}
		]
	});

}
