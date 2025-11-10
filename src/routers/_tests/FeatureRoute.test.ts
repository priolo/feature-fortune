import { RootService } from "@priolo/julian";
import axios, { AxiosInstance } from "axios";
import buildNodeConfig /*, { PORT }*/ from "../../config.js";
import { FEATURE_STATUS, FeatureRepo } from "../../repository/Feature.js";
import { seeding } from "../../seeding.js";
import { getPort, loginAs } from "./utils.js";



const PORT = getPort()

describe("FEATURE ROUTER", () => {

	let axiosInstance: AxiosInstance;
	let root: RootService;

	beforeAll(async () => {
		axiosInstance = axios.create({
			baseURL: `http://localhost:${PORT}`,
			withCredentials: true,
		});

		const cnf = buildNodeConfig({ noLog: true, port: PORT });
		root = await RootService.Start(cnf);
		await seeding(root);
	});

	afterAll(async () => {
		await RootService.Stop(root);
	});



	test("create a new Feature", async () => {
		const { headers } = await loginAs(axiosInstance, "id-user-1");

		// Create the FEATURE
		const featurePayload = <FeatureRepo>{
			title: "Automated test feature",
			description: "Feature created via automated integration test",
			githubRepoId: 987654321,
			accountDevId: "id-user-2"
		};
		const createRes = await axiosInstance.post(
			"/api/features",
			{ feature: featurePayload },
			{ headers }
		);

		// Verify creation response
		expect(createRes.status).toBe(200);
		expect(createRes.data.id).toBeTruthy();
		expect(createRes.data.title).toBe(featurePayload.title);
		expect(createRes.data.description).toBe(featurePayload.description);
		expect(createRes.data.accountId).toBe("id-user-1");
		expect(createRes.data.status ?? FEATURE_STATUS.PROPOSED).toBe(FEATURE_STATUS.PROPOSED);
		expect(createRes.data.createdAt).toBeTruthy();


		// Fetch the created FEATURE
		const featureId = createRes.data.id;
		const getRes = await axiosInstance.get(`/api/features/${featureId}`, { headers });

		// Verify fetch response
		expect(getRes.status).toBe(200);
		expect(getRes.data.id).toBe(featureId);
		expect(getRes.data.title).toBe(featurePayload.title);
		expect(getRes.data.accountId).toBe("id-user-1");
		
	}, 100000);

	test("modify an existing Feature", async () => {
		const { headers } = await loginAs(axiosInstance, "id-user-1");

		const seededFeatureId = "id-feature-1";
		const seededRes = await axiosInstance.get(`/api/features/${seededFeatureId}`, { headers });
		expect(seededRes.status).toBe(200);

		const updateFeaturePayload = <FeatureRepo>{
			id: seededFeatureId,
			title: `Updated seeded feature ${Date.now()}`,
			description: "Feature updated via automated integration test",
			githubRepoId: 123456789,
			accountDevId: "id-user-2",
			accountId: seededRes.data.accountId,
		};

		const updateRes = await axiosInstance.patch(
			"/api/features",
			{ feature: updateFeaturePayload },
			{ headers }
		);

		expect(updateRes.status).toBe(200);
		const updatedFeature = updateRes.data.feature ?? updateRes.data;
		expect(updatedFeature.id).toBe(seededFeatureId);
		expect(updatedFeature.title).toBe(updateFeaturePayload.title);
		expect(updatedFeature.description).toBe(updateFeaturePayload.description);
		expect(updatedFeature.accountDevId).toBe(updateFeaturePayload.accountDevId);

		const verifyRes = await axiosInstance.get(`/api/features/${seededFeatureId}`, { headers });
		expect(verifyRes.status).toBe(200);
		expect(verifyRes.data.title).toBe(updateFeaturePayload.title);
		expect(verifyRes.data.description).toBe(updateFeaturePayload.description);
		expect(verifyRes.data.accountDevId).toBe(updateFeaturePayload.accountDevId);
	}, 100000);



	test("The selected DEVELOPER accepts a FEATURE engagement", async () => {
		const { headers: creatorHeaders } = await loginAs(axiosInstance, "id-user-1");
		const { headers: developerHeaders } = await loginAs(axiosInstance, "id-user-2");

		const acceptanceFeaturePayload = <FeatureRepo>{
			title: `Automated acceptance feature ${Date.now()}`,
			description: "Feature created to test developer engagement acceptance",
			githubRepoId: 123450001,
			accountDevId: "id-user-2",
		};

		const acceptanceCreateRes = await axiosInstance.post(
			"/api/features",
			{ feature: acceptanceFeaturePayload },
			{ headers: creatorHeaders }
		);

		expect(acceptanceCreateRes.status).toBe(200);
		const acceptanceFeatureId = acceptanceCreateRes.data.id;
		expect(acceptanceFeatureId).toBeTruthy();

		const acceptRes = await axiosInstance.post(
			"/api/features/engagement",
			{ featureId: acceptanceFeatureId, accepted: true },
			{ headers: developerHeaders }
		);

		expect(acceptRes.status).toBe(200);
		expect(acceptRes.data.data).toBe("ok");

		const acceptedFeatureRes = await axiosInstance.get(
			`/api/features/${acceptanceFeatureId}`,
			{ headers: creatorHeaders }
		);

		expect(acceptedFeatureRes.status).toBe(200);
		expect(acceptedFeatureRes.data.status).toBe(FEATURE_STATUS.IN_DEVELOPMENT);

	}, 100000);

	test("The selected DEVELOPER declines a FEATURE engagement", async () => {
		const { headers: creatorHeaders } = await loginAs(axiosInstance, "id-user-1");
		const { headers: developerHeaders } = await loginAs(axiosInstance, "id-user-2");

		const declineFeaturePayload = <FeatureRepo>{
			title: `Automated decline feature ${Date.now()}`,
			description: "Feature created to test developer engagement decline",
			githubRepoId: 123450002,
			accountDevId: "id-user-2",
		};

		const declineCreateRes = await axiosInstance.post(
			"/api/features",
			{ feature: declineFeaturePayload },
			{ headers: creatorHeaders }
		);

		expect(declineCreateRes.status).toBe(200);
		const declineFeatureId = declineCreateRes.data.id;
		expect(declineFeatureId).toBeTruthy();

		const declineRes = await axiosInstance.post(
			"/api/features/engagement",
			{ featureId: declineFeatureId, accepted: false },
			{ headers: developerHeaders }
		);

		expect(declineRes.status).toBe(200);
		expect(declineRes.data.data).toBe("ok");

		const declinedFeatureRes = await axiosInstance.get(
			`/api/features/${declineFeatureId}`,
			{ headers: creatorHeaders }
		);

		expect(declinedFeatureRes.status).toBe(200);
		expect(declinedFeatureRes.status ?? FEATURE_STATUS.PROPOSED).toBe(FEATURE_STATUS.PROPOSED);
	}, 100000);

});