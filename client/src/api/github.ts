import { GitHubRepository, GitHubRepositoryDetails, GitHubSearchResponse, GitHubUser } from '@/types/GitHub';

class GitHubApiService {
    private baseUrl = 'https://api.github.com';

    /**
     * Search for repositories on GitHub
     * @param query - Search query (repository name, description, etc.)
     * @param per_page - Number of results per page (default: 10, max: 100)
     * @param page - Page number (default: 1)
     */
    async searchRepositories(query: string, per_page = 10, page = 1): Promise<GitHubSearchResponse> {
        const searchParams = new URLSearchParams({
            q: query,
            per_page: per_page.toString(),
            page: page.toString(),
            sort: 'stars',
            order: 'desc'
        });

        const response = await fetch(`${this.baseUrl}/search/repositories?${searchParams}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get detailed information about a specific repository
     * @param owner - Repository owner username
     * @param repo - Repository name
     */
    async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
        const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

     /**
     * 
     */
    async getRepositoryByName(name: string): Promise<GitHubRepository> {
        const response = await fetch(`${this.baseUrl}/repos/${name}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }


    /**
     * Get detailed information about a repository by its ID
     * @param repositoryId - Repository ID (numeric)
     */
    async getRepositoryById(repositoryId: number): Promise<GitHubRepository> {
        const response = await fetch(`${this.baseUrl}/repositories/${repositoryId}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get detailed information about a GitHub user
     * @param username - GitHub username
     */
    async getUser(username: string): Promise<GitHubUser> {
        const response = await fetch(`${this.baseUrl}/users/${username}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get GitHub account data by account ID
     * @param accountId - GitHub user account ID (numeric)
     */
    async getUserById(accountId: number): Promise<GitHubUser> {
        const response = await fetch(`${this.baseUrl}/user/${accountId}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get repository with detailed owner information including email
     * @param owner - Repository owner username
     * @param repo - Repository name
     */
    async getRepositoryWithOwnerDetails(owner: string, repo: string): Promise<GitHubRepositoryDetails> {
        try {
            const [repository, ownerDetails] = await Promise.all([
                this.getRepository(owner, repo),
                this.getUser(owner)
            ]);

            return {
                ...repository,
                owner_details: ownerDetails
            };
        } catch (error) {
            console.error('Error fetching repository with owner details:', error);
            throw error;
        }
    }

    /**
     * Search repositories and get the first result with owner details
     * @param query - Search query
     */
    async searchAndGetFirstRepositoryWithDetails(query: string): Promise<GitHubRepositoryDetails | null> {
        try {
            const searchResults = await this.searchRepositories(query, 1);
            
            if (searchResults.items.length === 0) {
                return null;
            }

            const firstRepo = searchResults.items[0];
            return this.getRepositoryWithOwnerDetails(firstRepo.owner.login, firstRepo.name);
        } catch (error) {
            console.error('Error searching and fetching repository details:', error);
            throw error;
        }
    }

    /**
     * Get all repositories for a GitHub user by their account ID
     * @param accountId - GitHub user account ID (numeric)
     * @param per_page - Number of results per page (default: 100, max: 100)
     * @param page - Page number (default: 1)
     */
    async getRepositoriesByAccountId(accountId: number, per_page = 100, page = 1): Promise<GitHubRepository[]> {
        // First, get the user details to obtain the username
        const userResponse = await fetch(`${this.baseUrl}/user/${accountId}`);
        
        if (!userResponse.ok) {
            throw new Error(`GitHub API Error: ${userResponse.status} ${userResponse.statusText}`);
        }

        const user: GitHubUser = await userResponse.json();
        
        // Then get all repositories for this user
        const reposResponse = await fetch(`${this.baseUrl}/users/${user.login}/repos?per_page=${per_page}&page=${page}&sort=updated&direction=desc`);
        
        if (!reposResponse.ok) {
            throw new Error(`GitHub API Error: ${reposResponse.status} ${reposResponse.statusText}`);
        }

        return reposResponse.json();
    }

    /**
     * Get all repositories for a GitHub user by their username
     * @param username - GitHub username
     * @param per_page - Number of results per page (default: 100, max: 100)
     * @param page - Page number (default: 1)
     */
    async getRepositoriesByUsername(username: string, per_page = 100, page = 1): Promise<GitHubRepository[]> {
        const response = await fetch(`${this.baseUrl}/users/${username}/repos?per_page=${per_page}&page=${page}&sort=updated&direction=desc`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Parse GitHub URL to extract owner and repo name
     * @param githubUrl - GitHub repository URL
     */
    parseGitHubUrl(githubUrl: string): { owner: string; repo: string } | null {
        try {
            const patterns = [
                /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?(?:\/.*)?$/,
                /^([^\/]+)\/([^\/]+)$/
            ];

            for (const pattern of patterns) {
                const match = githubUrl.match(pattern);
                if (match) {
                    return {
                        owner: match[1],
                        repo: match[2].replace('.git', '')
                    };
                }
            }

            return null;
        } catch (error) {
            console.error('Error parsing GitHub URL:', error);
            return null;
        }
    }
}

const gitHubApi = new GitHubApiService();
export default gitHubApi;


