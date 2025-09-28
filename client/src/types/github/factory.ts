import { GitHubRepository } from "./GitHub";



export function buildNewGithubRepo(): GitHubRepository {
	return {
		id: null,
		name: '',
		full_name: '',
		description: null,
		html_url: '',
		clone_url: '',
		git_url: '',
		ssh_url: '',
	}
}