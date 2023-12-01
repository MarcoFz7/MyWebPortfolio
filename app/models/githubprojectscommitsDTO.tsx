// Only needed information from the github projects commits
export interface GitHubProjectCommitsDTO {
    repoName: string;
    commit: {
        message: string;
    };
}