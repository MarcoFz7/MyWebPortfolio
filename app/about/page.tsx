"use client"

import './page.css'
import React, { useState, useEffect } from 'react';
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Page = () => {
  /**
   * Consts for the about page
   */
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  /**
   * UseEffect to detect if its a small screen or not
   * This const is used on the whole page
   */
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 300);
    };

    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth <= 300);

      window.addEventListener('resize', handleResize);
    }

    return () => {
      // Remove event listener on component unmount
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const handleLinkedInBtn = () => {
    window.open("https://pt.linkedin.com/in/marco-ferraz-03042025a");
  }

  const handleGithubBtn = () => {
    window.open("https://github.com/MarcoFz7");
  }

  return (
    <div className="about-me-page">
      <div className='page-header-wrapper'>
        <span className='page-header'>
          {isSmallScreen ? "Marco Fz." : "Marco Ferraz"}
        </span>
      </div>
      <div className='page-sub-header'>
        <button type='button' title='LinkedIn' className='linkedIn-btn' onClick={handleLinkedInBtn}>
            <FaLinkedinIn/>
        </button>
        <button type='button' title='GitHub' className='gitHub-btn' onClick={handleGithubBtn}>
            <FaGithub/>
        </button>
      </div>
      <div className='page-presentation'>        
        <span className='presentation-message'>
          <strong>Hello</strong> Reader! <br></br> Born in 2002, in a small portuguese town,&nbsp;
          <a href='https://www.google.com/search?q=marco%20de%20canaveses' target="_blank" rel="noopener noreferrer">Marco de Canaveses</a>,
          I&apos;m a software developer who loves learning new technologies and areas of the IT&nbsp; 
          <strong>world</strong>.<br></br>
          From the freedom that comes with personal web development, a newfound passion emerged:
          learning how to build simple, intuitive and harmonious web applications.<br></br>
          To know more about my <strong>interests</strong> and <strong>experiences</strong> feel free to navigate through to my projects and 
          experiences pages, and if needed, to contact me!
        </span>      
      </div>
    </div>
  );
};
  
export default Page;