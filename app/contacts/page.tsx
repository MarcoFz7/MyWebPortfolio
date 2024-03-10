"use client"

import './page.css'
import React, { } from 'react';
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import ContactForm from '../components/contactform/contactform';

const Page = () => {
  const handleLinkedInBtn = () => {
    window.open("https://pt.linkedin.com/in/marco-ferraz-03042025a");
  }

  const handleGithubBtn = () => {
    window.open("https://github.com/MarcoFz7");
  }

  return (
    <div className="contacts-page">
      <span className='page-header'>
        Contacts
      </span>
      <div className='page-sub-header'>
        <button type='button' title='LinkedIn' className='linkedIn-btn' onClick={handleLinkedInBtn}>
            <FaLinkedinIn/>
        </button>
        <button type='button' title='GitHub' className='gitHub-btn' onClick={handleGithubBtn}>
            <FaGithub/>
        </button>
        <button type='button' title='Email' className='email-btn'>
            <BiLogoGmail/>
        </button>
      </div>
      <div className='page-presentation'>        
        <ContactForm/>              
      </div>
    </div>
  );
};
  
export default Page;