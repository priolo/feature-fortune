export interface GitHubUser {
    id: number;
    login: string;
    name: string | null;
    email: string | null;
    avatar_url: string;
    html_url: string;
    bio: string | null;
    company: string | null;
    location: string | null;
    blog: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    clone_url: string;
    git_url: string;
    ssh_url: string;
    language: string | null;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    size: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    default_branch: string;
    topics: string[];
    owner: {
        id: number;
        login: string;
        avatar_url: string;
        html_url: string;
        type: string;
    };
    license: {
        key: string;
        name: string;
        spdx_id: string;
    } | null;
    open_issues_count: number;
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
}

export interface GitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubRepository[];
}

export interface GitHubRepositoryDetails extends GitHubRepository {
    owner_details?: GitHubUser;
}