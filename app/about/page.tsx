"use client"

import './page.css'
import React, { useState, useEffect } from 'react';

const page = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  const handleTownClick = (event: any) => {
    if (event?.target.innerText == "Marco de Canaveses") {
      window.open("https://www.google.com/search?q=marco%20de%20canaveses");
    }
  }

  return (
    <div className="about-me-page">
      <span className='page-header'>
        {isSmallScreen ? "Marco Fz." : "Marco Ferraz"}
      </span>
        <div className='page-presentation'>        
          <span className='presentation-message' onClick={handleTownClick}>
            <strong>Hello</strong> Reader! <br></br> Born in 2002, in a small portuguese town,&nbsp;
            <u>Marco de Canaveses</u>,
            I'm a software developer who loves learning new technologies and areas of the IT&nbsp; 
            <strong>world</strong>.<br></br>
            From the freedom that comes with personal web development, a newfound passion emerged:
            learning how to build simple, intuitive and harmonious web applications.
          </span>      
        </div>
    </div>
  );
};
  
export default page;