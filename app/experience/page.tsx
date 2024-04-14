"use client"

import React from 'react';
import { FaLinkedinIn } from "react-icons/fa6";
import './page.css';

// progression property options: "New role!"; "New company!";"New company & role!";"" (empty for first item)
/* 
  progression was implemented as an extra propery since checking the company and role of 
  consecutives items is heavier, mainly if one contains many experiences.
*/
const experiences=[
  {
      company: "n4IT",
      role: "D365 CRM Developer",
      stack: [
        "Angular.js ",
        ".Net C# ", 
        "JavaScript ", 
        "MS Dynamics 365"
      ],
      description: "",
      client: "Euronext",
      date: "2023-08",
      progression: "New role!"
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
    description: "",
    client: "Internal",
    date: "2023-02",
    progression: ""
  }
]

const Page = () => {
  const handleLinkedInBtn = () => {
    window.open("https://pt.linkedin.com/in/marco-ferraz-03042025a");
  }

  return (
    <div className="experience-page">
      <span className='page-header'>
        Experience
      </span>
      <div className='page-sub-header'>
        <button type='button' title='LinkedIn' className='linkedIn-btn' onClick={handleLinkedInBtn}>
            <FaLinkedinIn/>
        </button>       
      </div>
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
                { item.progression != "" ?
                  <div className={`timeline-progression${item.progression == "New role!" ? ' role' 
                                                       : item.progression.includes("company") ? ' company' : ''}`}> 
                    <span className='progression-text'>{item.progression}</span>
                  </div>  
                : null}                    
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




