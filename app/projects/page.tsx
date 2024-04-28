"use client"

import React, { useState, useEffect } from 'react';
import './page.css';
import { FaGithub } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GitHubProjectDTO } from '../models/githubprojectDTO';
import { GitHubProjectsService } from '../services/githubprojectsService';
import { GitHubProjectCommitsDTO } from '../models/githubprojectscommitsDTO';
import ProjectImgViewer from '../components/projectimgviewer/projectimgviewer';
import Popup from '../components/popup/popup';

const Page = () => {
  const [projects, setProjects] = useState<GitHubProjectDTO[]>([]);

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
  // Through project commits (Pre-determined schema)
  // To Start -> Early Dev -> In Progress -> Advanced Dev -> Done
  const determineProjectStatus = (projectCommits: GitHubProjectCommitsDTO[] | undefined): string => {
    if (!projectCommits) {
      return "To Start!";
    }

    let status = "To Start!";

    // Needed so the last commit for status is the one whom determines it
    const reversedCommits = [...projectCommits].reverse();

    reversedCommits.forEach(commit => {  
      switch (true) {
        case commit.commit.message.includes("#earlydevelopment"):
          status = "Early Dev!";
          break;
        case commit.commit.message.includes("#inprogress"):
          status = "In Progress!";
          break;
        case commit.commit.message.includes("#closingdevelopment"):
          status = "Advanced Dev!";
          break;
        case commit.commit.message.includes("#done"):
          status = "Done!";
          break;
      }
    });

    return status;
  };

  // Function to determine the label for project main technology
  // Through project commits (Pre-determined schema)
  // #comment #setMainTechnology *mainTechnology*
  const determineProjectTechnology = (projectCommits: GitHubProjectCommitsDTO[] | undefined): string => {
    if (!projectCommits) {
      return "Not specified!";
    }

    let tech = "Not specified!";

    projectCommits.forEach(commit => {
      if (commit.commit.message.includes("#setMainTechnology")) {
      
        // Use a simple regular expression to match the technology name
        const match = commit.commit.message.match(/\*(.*?)\*/);

        tech = match ? match[1].trim() : "Not found!";
      }
    });

    return tech;
  };

  const handleGithubClick = (projectName: string) => {
    window.open("https://github.com/MarcoFz7/" + projectName);
  }

  // Handlers for project image viewer and aditional information
  const [projectImageClicked, setProjectImageClicked] = useState("none");
  const [projectWithNoImagesClicked, setProjectWithNoImagesClicked] = useState("none");
  const [projectWithNoImageMessage, setProjectWithNoImageMessage] = useState<React.ReactNode>("");
  const [clickedPhotoRelatedImages, setClickedPhotoRelatedImages] = useState<string[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectSource, setProjectSource] = useState("");
  
  const handleProjectImageClick = (projectName: string) => {  
    let numberOfImages = 0;

    switch (projectName) {
      case "MyLifestylePal":
        setClickedPhotoRelatedImages([]);
        numberOfImages = 0;
        setProjectName("MyLifestylePal");
        setProjectSource("");
        break;     
    }

    if (numberOfImages == 0) {
      setProjectWithNoImagesClicked("flex");

      setProjectWithNoImageMessage(
      <>
        <strong>{projectName}</strong> has no showcase images!
      </>
      )
    } else {
      setProjectImageClicked("flex");
    }
  };

  const handleProjectItemMainImage = (projectName: string): string => {
    switch (projectName) {
      case "MyLifestylePal":
        return "/next.svg";
      default:
        return "/next.svg";     
    }
  }

  const resetProjectImageClicked = () => {
    setProjectImageClicked("none");

    // Reset images to make sure they don't apear for a small time on the wronge image set
    setClickedPhotoRelatedImages([]);
  };

  const resetPopup = () => {
    setProjectWithNoImagesClicked("none");
  }

  return (
    <div className="projects-page">
      <ProjectImgViewer imagesToShow={clickedPhotoRelatedImages} projectName={projectName} projectSource={projectSource} projectImageClicked={projectImageClicked} resetProjectImageClicked={resetProjectImageClicked}></ProjectImgViewer>
      <Popup popupDisplay={projectWithNoImagesClicked} popupType='info' popupMessage={projectWithNoImageMessage} resetPopup={resetPopup}></Popup>
      <span className='page-header'>
        Projects
      </span>
      <div className="projects-list">

        {projects.map((project) => (
          <div className="project-item" key={project.name}>
            { project.name != "MyWebPortfolio" ?
            <div className="project-item-image">
              <img src={handleProjectItemMainImage(project.name)} alt={`${project.name} image loading!`} className='project-item-image-frame' onClick={() => handleProjectImageClick(project.name)}></img>             
            </div>
            : null}    
            <div className="project-item-info">
              <span className='project-item-info-name'> 
              { project.name == "MyWebPortfolio" ?
                <div className="project-item-self-icon" onClick={() => handleGithubClick(project.name)}>
                  <FaLocationDot/>
                </div>
                : null}    
                {project.name} 
              </span>
              <div className='project-item-info-state'>
                <span className='project-item-info-date'> {project.created_at} </span>
                <span className='project-item-info-separator'>|</span>
                <span className='project-item-info-status'> {determineProjectStatus(project.projectCommits)} </span>
              </div> 
              <div className='project-item-info-techs'>
                <span className='project-item-info-tech'> {determineProjectTechnology(project.projectCommits)} </span> 
                <div className="project-item-info-techs-icon" onClick={() => handleGithubClick(project.name)}>
                  <FaGithub/>
                </div>
              </div>           
            </div>            
          </div>
        ))}

      </div>
    </div>
  );
};
 
export default Page;




