import { Bus, RootService, typeorm } from "@priolo/julian";
import { AccountRepo, EMAIL_CODE } from "./repository/Account.js";



export async function seeding(root: RootService) {

	const accounts = await new Bus(root, "/typeorm/accounts").dispatch<AccountRepo[]>({
		type: typeorm.RepoStructActions.SEED,
		payload: <AccountRepo[]>[
			{ type: typeorm.RepoStructActions.TRUNCATE },
			{ 
				id: "id-user-1", 
				name: "Ivano Iorio", 
				email: "iorioivano@gmail.com", 
				emailCode: EMAIL_CODE.VERIFIED,
				githubId: 402921,
				githubName: "priolo",
				stripeCustomerId: "cus_TSMpgPvkCIxXNR",
				stripePaymentMethodId: "pm_1SVS683sTEVFLjPv0lakKZAV",
				stripeAccountId: "acct_1SVS6E3p6vh1SYbA",
				stripeAccountStatus: "ready",
			},
		]
	});


}
