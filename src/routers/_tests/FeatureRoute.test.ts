import { RootService } from "@priolo/julian";
import axios, { AxiosInstance } from "axios";
import buildNodeConfig /*, { PORT }*/ from "../../config.js";
import { FEATURE_ACTIONS, FEATURE_STATUS, FeatureRepo } from "../../repository/Feature.js";
import { seeding } from "../../seeding.js";
import { getPort, loginAs } from "./utils.js";



const PORT = getPort()
const FEATURE_ID = "id-feature-1"
const AUTHOR_ID = "id-user-1"
const DEV_ID = "id-user-2"

describe("FEATURE ROUTER", () => {

	let axiosInstance: AxiosInstance;
	let root: RootService;

	beforeAll(async () => {
		axiosInstance = axios.create({
			baseURL: `http://localhost:${PORT}`,
			withCredentials: true,
			timeout: 0, // no timeout while debugging
		});

		const cnf = buildNodeConfig({ port: PORT });
		root = await RootService.Start(cnf);
		await seeding(root);
	});

	afterAll(async () => {
		await RootService.Stop(root);
	});

	beforeEach(async () => {
		await seeding(root);
	});

	async function assignDeveloper(
		featureId: string,
		authorHeaders: Record<string, string>,
		developerId: string,
	) {
		const featureRes = await axiosInstance.get(`/api/features/${featureId}`, { headers: authorHeaders });
		expect(featureRes.status).toBe(200);
		const currentFeature = featureRes.data as FeatureRepo;

		const updatePayload: Partial<FeatureRepo> = {
			id: featureId,
			title: currentFeature.title,
			description: currentFeature.description,
			githubRepoId: currentFeature.githubRepoId,
			accountId: currentFeature.accountId,
			accountDevId: developerId,
		};

		const updateRes = await axiosInstance.patch(
			"/api/features",
			{ feature: updatePayload },
			{ headers: authorHeaders }
		);
		expect(updateRes.status).toBe(200);
		return updateRes.data.feature ?? updateRes.data;
	}



	test("create a new Feature", async () => {
		const { headers } = await loginAs(axiosInstance, AUTHOR_ID);

		// Create the FEATURE
		const featurePayload = <FeatureRepo>{
			title: "Automated test feature",
			description: "Feature created via automated integration test",
			githubRepoId: 987654321,
			accountDevId: DEV_ID
		};
		const createRes = await axiosInstance.post(
			"/api/features",
			{ feature: featurePayload },
			{ headers }
		);

		// Verify creation response
		expect(createRes.status).toBe(200);
		const createdFeature = createRes.data.feature ?? createRes.data;
		expect(createdFeature.id).toBeTruthy();
		expect(createdFeature.title).toBe(featurePayload.title);
		expect(createdFeature.description).toBe(featurePayload.description);
		expect(createdFeature.accountId).toBe(AUTHOR_ID);
		expect(createdFeature.status ?? FEATURE_STATUS.PROPOSED).toBe(FEATURE_STATUS.PROPOSED);
		expect(createdFeature.createdAt).toBeTruthy();


		// Fetch the created FEATURE
		const featureId = createdFeature.id;
		const getRes = await axiosInstance.get(`/api/features/${featureId}`, { headers });

		// Verify fetch response
		expect(getRes.status).toBe(200);
		expect(getRes.data.id).toBe(featureId);
		expect(getRes.data.title).toBe(featurePayload.title);
		expect(getRes.data.accountId).toBe(AUTHOR_ID);
		
	}, 100000);

	test("modify an existing Feature", async () => {
		const { headers } = await loginAs(axiosInstance, AUTHOR_ID);

		const seededFeatureId = FEATURE_ID;
		const seededRes = await axiosInstance.get(`/api/features/${seededFeatureId}`, { headers });
		expect(seededRes.status).toBe(200);

		const updateFeaturePayload = <FeatureRepo>{
			id: seededFeatureId,
			title: `Updated seeded feature ${Date.now()}`,
			description: "Feature updated via automated integration test",
			githubRepoId: 123456789,
			accountDevId: DEV_ID,
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

	test("developer can accept a proposed feature", async () => {
		const { headers: authorHeaders } = await loginAs(axiosInstance, AUTHOR_ID);
		await assignDeveloper(FEATURE_ID, authorHeaders, DEV_ID);

		const { headers: devHeaders } = await loginAs(axiosInstance, DEV_ID);
		const acceptRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.DEV_ACCEPT },
			{ headers: devHeaders }
		);

		expect(acceptRes.status).toBe(200);
		const acceptedFeature = acceptRes.data.feature ?? acceptRes.data;
		expect(acceptedFeature.status).toBe(FEATURE_STATUS.IN_DEVELOPMENT);

		const refreshed = await axiosInstance.get(`/api/features/${FEATURE_ID}`, { headers: authorHeaders });
		expect(refreshed.status).toBe(200);
		expect(refreshed.data.status).toBe(FEATURE_STATUS.IN_DEVELOPMENT);
	}, 100000);

	test("developer can decline a feature before starting", async () => {
		const { headers: authorHeaders } = await loginAs(axiosInstance, AUTHOR_ID);
		await assignDeveloper(FEATURE_ID, authorHeaders, DEV_ID);

		const { headers: devHeaders } = await loginAs(axiosInstance, DEV_ID);
		const declineRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.DEV_DECLINE },
			{ headers: devHeaders }
		);

		expect(declineRes.status).toBe(200);
		const declinedFeature = declineRes.data.feature ?? declineRes.data;
		expect(declinedFeature.accountDevId ?? null).toBeNull();

		const refreshed = await axiosInstance.get(`/api/features/${FEATURE_ID}`, { headers: authorHeaders });
		expect(refreshed.status).toBe(200);
		expect(refreshed.data.status).toBe(FEATURE_STATUS.PROPOSED);
		expect(refreshed.data.accountDevId ?? null).toBeNull();
	}, 100000);

	test("developer can leave an in-development feature", async () => {
		const { headers: authorHeaders } = await loginAs(axiosInstance, AUTHOR_ID);
		await assignDeveloper(FEATURE_ID, authorHeaders, DEV_ID);

		const { headers: devHeaders } = await loginAs(axiosInstance, DEV_ID);
		const acceptRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.DEV_ACCEPT },
			{ headers: devHeaders }
		);
		expect(acceptRes.status).toBe(200);

		const leaveRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.DEV_LEAVE },
			{ headers: devHeaders }
		);

		expect(leaveRes.status).toBe(200);
		const leftFeature = leaveRes.data.feature ?? leaveRes.data;
		expect(leftFeature.status).toBe(FEATURE_STATUS.PROPOSED);
		expect(leftFeature.accountDevId ?? null).toBeNull();

		const refreshed = await axiosInstance.get(`/api/features/${FEATURE_ID}`, { headers: authorHeaders });
		expect(refreshed.status).toBe(200);
		expect(refreshed.data.status).toBe(FEATURE_STATUS.PROPOSED);
		expect(refreshed.data.accountDevId ?? null).toBeNull();
	}, 100000);

	test("developer can release an in-development feature", async () => {
		const { headers: authorHeaders } = await loginAs(axiosInstance, AUTHOR_ID);
		await assignDeveloper(FEATURE_ID, authorHeaders, DEV_ID);

		const { headers: devHeaders } = await loginAs(axiosInstance, DEV_ID);
		const acceptRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.DEV_ACCEPT },
			{ headers: devHeaders }
		);
		expect(acceptRes.status).toBe(200);

		const releaseRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.DEV_RELEASE },
			{ headers: devHeaders }
		);

		expect(releaseRes.status).toBe(200);
		const releasedFeature = releaseRes.data.feature ?? releaseRes.data;
		expect(releasedFeature.status).toBe(FEATURE_STATUS.RELEASED);

		const refreshed = await axiosInstance.get(`/api/features/${FEATURE_ID}`, { headers: authorHeaders });
		expect(refreshed.status).toBe(200);
		expect(refreshed.data.status).toBe(FEATURE_STATUS.RELEASED);
	}, 100000);

	test("author can cancel a feature", async () => {
		const { headers: authorHeaders } = await loginAs(axiosInstance, AUTHOR_ID);

		const cancelRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.ATH_CANCEL },
			{ headers: authorHeaders }
		);

		expect(cancelRes.status).toBe(200);
		const cancelledFeature = cancelRes.data.feature ?? cancelRes.data;
		expect(cancelledFeature.status).toBe(FEATURE_STATUS.CANCELLED);

		const refreshed = await axiosInstance.get(`/api/features/${FEATURE_ID}`, { headers: authorHeaders });
		expect(refreshed.status).toBe(200);
		expect(refreshed.data.status).toBe(FEATURE_STATUS.CANCELLED);
	}, 100000);

	test("author can mark a released feature as completed", async () => {
		const { headers: authorHeaders } = await loginAs(axiosInstance, AUTHOR_ID);
		await assignDeveloper(FEATURE_ID, authorHeaders, DEV_ID);

		const { headers: devHeaders } = await loginAs(axiosInstance, DEV_ID);
		const acceptRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.DEV_ACCEPT },
			{ headers: devHeaders }
		);
		expect(acceptRes.status).toBe(200);

		const releaseRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.DEV_RELEASE },
			{ headers: devHeaders }
		);
		expect(releaseRes.status).toBe(200);

		const completeRes = await axiosInstance.post(
			`/api/features/${FEATURE_ID}/action`,
			{ action: FEATURE_ACTIONS.ATH_COMPLETE },
			{ headers: authorHeaders }
		);

		expect(completeRes.status).toBe(200);
		const completedFeature = completeRes.data.feature ?? completeRes.data;
		expect(completedFeature.status).toBe(FEATURE_STATUS.CANCELLED);

		const refreshed = await axiosInstance.get(`/api/features/${FEATURE_ID}`, { headers: authorHeaders });
		expect(refreshed.status).toBe(200);
		expect(refreshed.data.status).toBe(FEATURE_STATUS.CANCELLED);
	}, 100000);

	
});