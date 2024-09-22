"use client"

import React, {RefObject, useState, useEffect, useRef} from 'react';
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
        "Microsoft Power Platform"
      ],
      stackExtra: [
        "Power Apps",
        "Power Automate",
        "Microsoft Azure",
        "React.js"
      ],
      description: [
        "Professional Service at Euronext",
        "Develop and customize the business applications within Microsoft Power Platform, Power Apps & Power Automate, through its diferent modules: Sales, Customer Service, Marketing..., using Angular.js, .Net (C#), JavaScript and more technologies like Azure.",
        "Daily communication with clients and functional team, with English being the most used language."
      ],
      client: "Euronext",
      date: "2023/08",
      progression: "New role!"
  },
  {
    company: "n4IT",
    role: "Software Engineer Intern",
    stack: [
      "React.js ",
      "ASP.NET Core",
      "TypeScript ",
      "Power Automate ",
      "Power Apps "
    ],
    stackExtra: [
      "Microsoft Azure",
      "SharePoint"
    ],
    description: [
      "Built a new back office solution using Power Automate and Power Apps.",
      "Updated and transformed an internal web app (ASP.NET Core and React) into a Microsoft Teams App, connected with the back office solution, using Microsoft Azure cloud services."
    ],
    client: "Internal",
    date: "2023/02",
    progression: ""
  }
]

// Custom hook to get the width of the largest (in 99% of cases) element in experiences list
function useElementWidth(elementRef: React.RefObject<HTMLDivElement>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
      }
    }
    // Call initially to get the width
    updateWidth(); 
    // Add resize event listener
    window.addEventListener("resize", updateWidth); 

    return () => {
      // Cleanup event listener
      window.removeEventListener("resize", updateWidth); 
    };
  }, [elementRef]);

  return width;
}

const Page = () => {
  const stackListRef: RefObject<HTMLDivElement> = useRef(null);
  const [showIndex, setShowIndex] = useState<number[]>([]);

  var width = useElementWidth(stackListRef);

  const handleLinkedInBtn = () => {
    window.open("https://pt.linkedin.com/in/marco-ferraz-03042025a");
  }

  const handleShowMore = (index: number) => {
    setShowIndex(prevState => [...prevState, index]);

    setTimeout(() => {
      focusOnShowLess(index);
    }, 250);
  }

  const handleShowLess = (index: number) => {
    setShowIndex(prevState => prevState.filter(item => item !== index));
  }

  const focusOnShowLess = (index: number) => {
    const showLess = document.querySelectorAll('.timeline-description')[index];
    const biggestIndex = experiences.length - 1;
 
    // Scroll the element into view
    if (index == biggestIndex) {
      showLess.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="experience-page">
      <div className='page-header-wrapper'>
        <span className='page-header'>
          Experience<br></br>
        </span>
      </div>
      <div className='page-sub-header'>
        <button type='button' title='LinkedIn' className='linkedIn-btn' onClick={handleLinkedInBtn}>
            <FaLinkedinIn/>
        </button>       
      </div>
      <div className="experiences-list-timeline"> 
        <ul className="timeline">
          {
          experiences.map((item, index) => (                       
            <li className="timeline-item" key={item.role + item.company}> 
              <div className='timeline-item-content'>
                <div className="timeline-item-header">              
                  <span className="timeline-item-role">{item.role}</span>
                  <span className='timeline-item-date'>{item.date}</span>
                </div>
                <div className='timeline-item-details'>
                  <span className="timeline-item-company">{item.company}</span>
                  <span>&bull;</span>
                  <span className="timeline-item-client">{item.client}</span>
                </div>
                <div className='timeline-item-stack-list' ref={stackListRef}>
                  {item.stack.map((tech) => (
                    <span className='timeline-item-stack-tech' key={tech}>{tech}</span>
                  ))}
                </div>           
                <div className='timeline-extra-info' style={{maxWidth: (width + 30), display: showIndex.includes(index) ? 'initial' : 'none'}}>
                  <div className='timeline-item-stack-list'>
                    {item.stackExtra.map((tech) => (
                      <span className='timeline-item-stack-tech' key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className='timeline-description'>
                    {item.description.map((tech) => (
                      <span className='timeline-description-point' key={tech}>{tech}</span>
                    ))}
                  </div>
                </div> 
                { showIndex.includes(index) ?
                  <span className="timeline-show-extrainfo" onClick={() => handleShowLess(index)}>...show less</span>
                : <span className="timeline-show-extrainfo" onClick={() => handleShowMore(index)}>...show more</span>}  
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