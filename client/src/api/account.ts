import ajax, { CallOptions } from "@/plugins/AjaxService";
import { Account } from "../types/Account";



/** INDEX */
function index(filter?: { text?: string }, opt?: CallOptions): Promise<Account[]> {
	const params = new URLSearchParams();
	if (filter?.text) {
		params.append('text', filter.text);
	}
	const queryString = params.toString();
	const url = queryString ? `accounts?${queryString}` : 'accounts';
	return ajax.get(url, opt)
}

/** GET */
async function get(id: string, opt?: CallOptions): Promise<Account> {
	if (!id) return
	const user = await ajax.get(`accounts/${id}`, opt)
	return user
}

async function getByGithubUserId(githubUserId: number, opt?: CallOptions): Promise<{ account: Account }> {
	if (!githubUserId) return
	const user = await ajax.get(`accounts/github/${githubUserId}`, opt)
	return user
}


const accountApi = {
	index,
	get,
	getByGithubUserId,
}

export default accountApi