"use client"

import React, { useState, useEffect } from 'react';
import './page.css';
import { GitHubProjectDTO } from '../models/githubprojectDTO';
import { GitHubProjectsService } from '../services/githubprojectsService';
import { GitHubProjectCommitsDTO } from '../models/githubprojectscommitsDTO';

const page = () => {
  const [projects, setProjects] = useState<GitHubProjectDTO[]>([]);

  /*useEffect(() => {
    const fetchData = async () => {
      const projects = await GitHubProjectsService.getAllProjects();
      setProjects(projects);
    };

    fetchData();
    setHasFetched(true);
  }, []);

  useEffect(() => {
    const fetchCommits = async () => {
      const projectsWithCommits = await Promise.all(
        projects.map(async (project) => {
          const projectCommits = await GitHubProjectsService.getProjectCommits(project.name);
          return { ...project, projectCommits };
        })
      );
        
      console.log("Passou");
      setProjects(projectsWithCommits);
    };
  
    fetchCommits();
  }, [hasFetched]);*/

  useEffect(() => {
    const fetchDataAndCommits = async () => {
      const projects = await GitHubProjectsService.getAllProjects();
      setProjects(projects);

      const projectsWithCommits = await Promise.all(
        projects.map(async (project) => {
          const projectCommits = await GitHubProjectsService.getProjectCommits(project.name);
          return { ...project, projectCommits };
        })
      );

      setProjects(projectsWithCommits);
    };

    fetchDataAndCommits();
  }, []);

  // Function to determine the label for project status
  // To Start -> Early Dev -> In Progress -> Advanced Dev
  const determineProjectStatus = (projectCommits: GitHubProjectCommitsDTO[] | undefined): string => {
    if (!projectCommits) {
      return "Loading status...";
    }

    let status = "";

    projectCommits.forEach(commit => {  
      switch (true) {
        case commit.commit.message.includes("#earlydevelopment"):
          status = "Early Dev";
          break;
        case commit.commit.message.includes("#inprogress"):
          status = "In Progress";
          break;
        case commit.commit.message.includes("#closingdevelopment"):
          status = "Advanced Dev";
          break;
        case commit.commit.message.includes("#done"):
          status = "Done";
          break;
        default:
          status = "To Start";
      }
    });

    return status;
  };

  return (
    <div className="projects-page">
      <span className='page-header'>
        Projects
      </span>
      <div className="projects-list">
        
        {projects.map((project) => (
          <div className="project-item" key={project.name}>
            <strong>Name:</strong> {project.name}
            <strong>Date:</strong> {project.created_at}
            <strong>Status: {determineProjectStatus(project.projectCommits)}</strong>           
          </div>
        ))}

      </div>
    </div>
  );
};
 
export default page;




