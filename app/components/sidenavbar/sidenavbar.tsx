"use client"

import './sidenavbar.css'
import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import { TbUserStar, TbUserCode, TbUserQuestion } from 'react-icons/tb'
import { PiChatCircleDotsBold } from 'react-icons/pi'

const menuMainItems=[
  {
      path:"/about",
      name:"About Me",
      icon:<TbUserQuestion/>
  },
  {
      path:"/experience",
      name:"Experience",
      icon:<TbUserStar/>
  },
  {
      path:"/projects",
      name:"Projects",
      icon:<TbUserCode/>
  }
]

const menuSecondaryItems=[
  {
      path:"/contacts",
      name:"Contacts",
      icon:<PiChatCircleDotsBold/>
  }
]

export default function SideNavBar() {
    const disclosureBtnRef = useRef(null);

    const [isMenuBtnFocused, setIsMenuBtnFocused] = useState(true);
    const [isDisclosureBtnFocused, setIsDisclosureBtnFocused] = useState(true);


    const handleMenuBtnFocused = () => {
        setIsMenuBtnFocused(!isMenuBtnFocused);
        setIsDisclosureBtnFocused(!isDisclosureBtnFocused);
    }

    return (
        <div>
            <Disclosure as="nav" defaultOpen={true}>
                <Disclosure.Button className ={isMenuBtnFocused ? "disclosureBtnFocused" : "disclosureBtn"} ref={disclosureBtnRef}>
                    <GiHamburgerMenu className={isMenuBtnFocused ? "menuBtnFocused" : "menuBtn"} aria-hidden="true" onClick={handleMenuBtnFocused}/>
                </Disclosure.Button>
                <Transition
                  enter="transform transition-transform ease-in-out duration-20000000"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition-transform ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Disclosure.Panel className='sidebar-panel'>
                    <div className='sidebar'>
                      <div className='container'>
                        <h1 className='header'>
                          Dashboard
                        </h1>
                        <div className='options'>                     
                          {
                              menuMainItems.map((item, index) => (
                                  <Link href={item.path} key={index} className="option group">
                                      <div className="group-hover:text-white icon">{item.icon}</div>                    
                                      <h3 className="group-hover:text-white link-text">{item.name}</h3>
                                  </Link>
                              ))
                          }                      
                        </div>
                        <div className='options'>                     
                          {
                              menuSecondaryItems.map((item, index) => (
                                  <Link href={item.path} key={index} className="option group">
                                      <div className="group-hover:text-white icon" style={{fontSize:'1.5rem'}}>{item.icon}</div>                    
                                      <h3 className="group-hover:text-white link-text" style={{paddingRight:'10px'}}>{item.name}</h3>
                                  </Link>
                              ))
                          }                      
                        </div>                        
                      </div>  
                    </div>
                  </Disclosure.Panel> 
                </Transition>
            </Disclosure>
        </div>
    )
}