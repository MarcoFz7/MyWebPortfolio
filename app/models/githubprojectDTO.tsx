import { GitHubProjectCommitsDTO } from "./githubprojectscommitsDTO";

// Only needed information from the github projects
export interface GitHubProjectDTO {
    name: string;
    owner: {
        login: string;
    };
    url: string;
    watchers_count: number;
    language: string;
    created_at: string;
    projectCommits?: GitHubProjectCommitsDTO[];
    projectStatus?: string;
}