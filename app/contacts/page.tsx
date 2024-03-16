"use client"

import './page.css'
import React, { useState } from 'react';
import { FaLinkedinIn } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { BiLogoGmail } from "react-icons/bi";
import ContactForm from '../components/contactform/contactform';

const Page = () => {
  const [emailBtnClicked, setEmailBtnClicked] = useState(false);

  const handleLinkedInBtn = () => {
    window.open("https://pt.linkedin.com/in/marco-ferraz-03042025a");
  }

  const handleInstagramBtn = () => {
    window.open("https://www.instagram.com/marcofz7");
  }

  const handleEmailBtn = () => {
    setEmailBtnClicked(true);
  }

  const resetEmailBtnClicked = () => {
    setEmailBtnClicked(false);
  };

  return (
    <div className="contacts-page">
      <span className='page-header'>
        Contacts
      </span>
      <div className='page-sub-header'>
        <button type='button' title='LinkedIn' className='linkedIn-btn' onClick={handleLinkedInBtn}>
            <FaLinkedinIn/>
        </button>
        <button type='button' title='Instagram' className='instagram-btn' onClick={handleInstagramBtn}>
            <GrInstagram/>
        </button>
        <button type='button' title='Email' className='email-btn' onClick={handleEmailBtn}>
            <BiLogoGmail/>
        </button>
      </div>
      <div className='page-presentation'>  
        <label className='intro-message'>Reach out to me using <strong>social media</strong>, or...</label>
        <ContactForm emailBtnClicked={emailBtnClicked} onEmailBtnProcessed={resetEmailBtnClicked}/>              
      </div>
    </div>
  );
};
  
export default Page;