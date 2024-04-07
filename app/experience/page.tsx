"use client"

import React, { useState, useEffect } from 'react';
import './page.css';

const experiences=[
  {
    company: "test 1",
    role: "test 1",
    stack: [
      "Angular.js ",
      ".Net C# ", 
      "JavaScript ", 
      "D365 CRM "
    ],
    client: "test 1",
    date: "test 1"
  },
  {
      company: "n4IT",
      role: "D365 CRM Developer",
      stack: [
        "Angular.js ",
        ".Net C# ", 
        "JavaScript ", 
        "D365 CRM "
      ],
      client: "Euronext",
      date: "2023-08"
  },
  {
    company: "n4IT",
    role: "Software Engineer Intern",
    stack: [
      "React.js ",
      ".Net C# ",
      "TypeScript ",
      "Power Automate ",
      "Power Apps "
    ],
    client: "Internal",
    date: "2023-02"
  },
  {
    company: "test 2",
    role: "test 2",
    stack: [
      "Angular.js ",
      ".Net C# ", 
      "JavaScript ", 
      "D365 CRM "
    ],
    client: "test 2",
    date: "test 2"
  }
]

const Page = () => {

  const handleGithubClick = (projectName: string) => {
    window.open("https://github.com/MarcoFz7/" + projectName);
  }

  return (
    <div className="experience-page">
      <span className='page-header'>
        Experience
      </span>
      <div className="experiences-list-timeline"> 
        <ul className="timeline">
          {
          experiences.map((item) => (                       
            <li className="timeline-item" key={item.role + item.company}>
              <div className='timeline-item-content'>
                <div className="timeline-item-header">
                  <span className="timeline-item-role">{item.role}</span>
                  <span className="timeline-item-date">{item.date}</span>
                </div>
                <div className='timeline-item-details'>
                  <span className="timeline-item-company">{item.company}</span>
                  <span>&bull;</span>
                  <span className="timeline-item-client">{item.client}</span>
                </div>
                <div className='timeline-item-stack-list'>
                  {item.stack.map((tech) => (
                    <span className='timeline-item-stack-tech' key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  );
};
 
export default Page;




