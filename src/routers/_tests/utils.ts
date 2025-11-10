import axios, { AxiosInstance } from "axios";



export async function loginAs(axiosInstance: AxiosInstance, userId: string): Promise<{ headers: Record<string, string> }> {
	const loginRes = await axiosInstance.post("/api/auth/autologin", { userId });
	const cookieHeader = loginRes.headers["set-cookie"];
	return {
		headers: { Cookie: cookieHeader?.join("; ") ?? "" },
	};
}

export function getPort(): number {
	return 3001;
}