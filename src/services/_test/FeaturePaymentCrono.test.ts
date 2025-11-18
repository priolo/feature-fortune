//import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { Bus, RootService, typeorm } from "@priolo/julian";
import buildNodeConfig /*, { PORT }*/ from "../../config.js";
import { FEATURE_STATUS, FeatureRepo } from "../../repository/Feature.js";
import { FUNDING_STATUS, FundingRepo } from "../../repository/Funding.js";
import { seeding } from "../../seeding.js";
import FeaturePaymentCrono from "../crono/FeaturePaymentCrono.js";




const FEATURE_ID = "id-feature-1"
const AUTHOR_ID = "id-user-1"
const DEV_ID = "id-user-2"

describe("FEATURE CRONO", () => {

	let root: RootService;

	beforeAll(async () => {
		const cnf = buildNodeConfig({ noLog: true, noHttp: true });
		root = await RootService.Start(cnf);
		await seeding(root);
	});

	afterAll(async () => {
		await RootService.Stop(root);
	});

	beforeEach(async () => {
		await seeding(root);
	});


	test("Create a FEATURE/FUNDING and check if CRONO call the payment", async () => {

		// Create the FEATURE
		const featureNew: FeatureRepo = await new Bus(root, "/typeorm/features").dispatch({
			type: typeorm.Actions.SAVE,
			payload: <FeatureRepo>{
				title: "Feature to be paid by CRONO",
				description: "This feature is created to test the CRONO payment flow",
				accountDevId: DEV_ID,
				accountId: AUTHOR_ID,
				status: FEATURE_STATUS.COMPLETED,
				completedAt: new Date(),
			}
		})

		const node = root.nodeByPath<FeaturePaymentCrono>("/typeorm/features")

		console.log( node)

		// Create the FUNDINGS
		const funding1 = await new Bus(root, "/typeorm/fundings").dispatch<FeatureRepo>({
			type: typeorm.Actions.SAVE,
			payload: <FundingRepo>{
				featureId: featureNew.id!,
				accountId: DEV_ID,
				currency: "EUR",
				amount: 5000, // 50.00 EUR
				status: FUNDING_STATUS.CANCELLED,
			}
		})
		const funding2 = await new Bus(root, "/typeorm/fundings").dispatch<FeatureRepo>({
			type: typeorm.Actions.SAVE,
			payload: <FundingRepo>{
				featureId: featureNew.id!,
				accountId: DEV_ID,
				currency: "EUR",
				amount: 1000, // 50.00 EUR
				status: FUNDING_STATUS.PENDING,
			}
		})

		// get FEATURE CRONO SERVICE
		const paymentCronoService = root.nodeByPath<FeaturePaymentCrono>("/payments-crono")!
		paymentCronoService.setState({ 
			delay: 1000, 			// contollo
			delayComplete: 1200, 	// tempo dopo COMPLATE per cui bisogna PAID
		})


		await new Promise((resolve) => setTimeout(resolve, 3000));

		

		// check id FEATURE is change in PAID
		const featureUpdated = await new Bus(root, "/typeorm/features").dispatch<FeatureRepo>({
			type: typeorm.Actions.GET_BY_ID,
			payload: featureNew.id!,
		})
		expect(featureUpdated.status).toBe(FEATURE_STATUS.PAID);

		// check if FUNDING1 is still CANCELLED
		const funding1Updated = await new Bus(root, "/typeorm/fundings").dispatch<FundingRepo>({
			type: typeorm.Actions.GET_BY_ID,
			payload: funding1.id!,
		})
		expect(funding1Updated.status).toBe(FUNDING_STATUS.CANCELLED);
		// check if FUNDING2 is PAYABLE
		const funding2Updated = await new Bus(root, "/typeorm/fundings").dispatch<FundingRepo>({
			type: typeorm.Actions.GET_BY_ID,
			payload: funding2.id!,
		})
		expect(funding2Updated.status).toBe(FUNDING_STATUS.PAIED);

	}, 10000);

});