import { ENV_TYPE, envInit } from "./types/env.js";
envInit();

import { RootService } from "@priolo/julian";
import buildNodeConfig from "./config.js";
import { seeding } from "./seeding.js";





(async () => {

	console.log(`*** BUILD CONFIG ***`)
	const cnf = buildNodeConfig()
	console.log(`********************************************\n`);

	console.log(`*** START ***`)
	const root = await RootService.Start(cnf)
	console.log(`********************************************\n`)

	if (process.env.NODE_ENV == ENV_TYPE.TEST || (process.env.NODE_ENV == ENV_TYPE.DEV && process.env.DB_DEV_RESET == "true")) {
		console.log("*** SEEDING ***")
		await seeding(root)
		console.log(`********************************************\n`)
	}

	// if (process.env.NODE_ENV == ENV_TYPE.PROD) {
	// 	console.log("*** SEEDING PRO DEBUG ***")
	// 	const { seeding: seedingProDebug } = await import("./seeding_pro_debug.js");
	// 	await seedingProDebug(root)
	// 	console.log(`********************************************\n`)
	// }

})()

