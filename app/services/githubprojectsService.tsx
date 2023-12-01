import axios from "axios";
import { GitHubProjectDTO } from '../models/githubprojectDTO';
import { GitHubProjectCommitsDTO } from "../models/githubprojectscommitsDTO";

export class GitHubProjectsService {

    static async getAllProjects(): Promise<GitHubProjectDTO[]> {
        try {
          const response = await axios.get<GitHubProjectDTO[]>('https://api.github.com/users/MarcoFz7/repos');
          const fetchedData = response.data.map((project) => ({
            ...project,
            created_at: new Date(project.created_at).toISOString().split('T')[0],
          }));
    
          return fetchedData;
        } catch (error) {
          console.error(error);
          return [];
        }
    }

    static async getProjectCommits(projectName: string): Promise<GitHubProjectCommitsDTO[]> {
        // Retrieve the commits only from the main branch
        try {
          const response = await axios.get<GitHubProjectCommitsDTO[]>(`https://api.github.com/repos/MarcoFz7/${projectName}/commits?sha=main`);
          const fetchedData = response.data;
    
          return fetchedData;
        } catch (error) {
          console.error(error);
          return [];
        }
    }
}
