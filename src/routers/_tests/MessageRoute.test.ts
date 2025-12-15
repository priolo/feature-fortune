import { RootService } from "@priolo/julian";
import axios, { AxiosInstance } from "axios";
import buildNodeConfig/*, { PORT }*/ from "../../config.js";
import { MESSAGE_ROLE } from "../../repository/Message.js";
import { seeding } from "../../seeding.js";
import { getPort, loginAs } from "./utils.js";



const PORT = getPort()

describe("MESSAGES ROUTER", () => {

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


	test("fetch inbox messages", async () => {
		const { headers } = await loginAs(axiosInstance, "id-user-1");

		// Fetch inbox MESSAGES
		const res = await axiosInstance.get("/api/messages", { headers });

		// Verify fetch response
		expect(res.status).toBe(200);
		expect(Array.isArray(res.data.messages)).toBe(true);
		expect(res.data.messages.length).toBe(3);

		for (const msg of res.data.messages) {
			expect(msg.role).toBe(MESSAGE_ROLE.RECEIVER);
			expect(msg.accountId).toBe("id-user-1");
			expect(msg.content).toBeTruthy();
		}

		const texts = res.data.messages.map((msg: any) => msg.content.text);
		expect(texts).toEqual(
			expect.arrayContaining([
				"Ciao Giuseppe, grazie per il messaggio! Possiamo discuterne questa settimana?",
				"Buongiorno Giuseppe, ho una domanda sul flusso di approvazione della feature Y.",
				"SYSTEM MESSAGE",
			])
		);
		
	}, 100000);

	test("fetch sent messages", async () => {
		const { headers } = await loginAs(axiosInstance, "id-user-1");

		const res = await axiosInstance.get("/api/messages?role=sender", { headers });

		expect(res.status).toBe(200);
		expect(Array.isArray(res.data.messages)).toBe(true);
		expect(res.data.messages.length).toBe(1);

		const message = res.data.messages[0];
		expect(message.role).toBe(MESSAGE_ROLE.SENDER);
		expect(message.accountId).toBe("id-user-1");
		expect(message.isRead).toBe(true);
		expect(message.content.text).toBe("Ciao Mario, ho pensato ad alcune idee per migliorare la funzionalità X. Che ne pensi?");
	}, 100000);

	test("write and send a message", async () => {
		const { headers } = await loginAs(axiosInstance, "id-user-1");

		const res = await axiosInstance.post("/api/messages",
			{
				text: "Hello, this is a test message!",
				toAccountId: "id-user-2",
			},
			{ headers }
		);

		// il messaggio è stato mandato correttamente
		expect(res.status).toBe(200);
		expect(res.data.content.text).toBe("Hello, this is a test message!");

	}, 100000);

});