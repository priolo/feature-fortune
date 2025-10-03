import { Bus, RootService, typeorm } from "@priolo/julian"
import PaymentCrono from "../PaymentCrono.js"
import buildNodeConfig from "../../config.js";
import dayjs from "dayjs";
import { seeding } from "../../seeding.js";


describe("test service crono", () => {

	let root: RootService;

	beforeAll(async () => {
		const cnf = buildNodeConfig(true, true);
		root = await RootService.Start(cnf);
		await seeding(root)
	});

	afterAll(async () => {
		await RootService.Stop(root);
	});

	test("check scheduling", async () => {

		const cronoService = root.nodeByPath<PaymentCrono>("/crono-payments")
		expect(cronoService).toBeDefined()

		cronoService?.setState({
			delay: 1000
		})

		const funding = await new Bus(root, "/typeorm/fundings").dispatch({
			type: typeorm.RepoRestActions.SAVE,
			payload: {
				amount: 5000,
				expiresAt: dayjs().add(100, "millisecond").toDate(),
				status: "pending",
				message: "FUNDING TEST",
				featureId: "id-feature-1",
				accountId: "id-user-1",
			},
		})

		await new Promise((r) => setTimeout(r, 3500))

		const fundingUpdate = await new Bus(root, "/typeorm/fundings").dispatch({
			type: typeorm.RepoRestActions.GET_BY_ID,
			payload: funding.id,
		})

		console.log(fundingUpdate)

	}, 100000)

})