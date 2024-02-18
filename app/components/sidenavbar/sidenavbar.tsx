"use client"

import './sidenavbar.css'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import { TbUserStar, TbUserCode, TbUserQuestion } from 'react-icons/tb'
import { PiChatCircleDotsBold } from 'react-icons/pi'
import ThemeSwitcher from '@/app/components/themeSwitcher/themeSwitcher'

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

interface SideNavBarProps {
  onItemClick: (itemName: string) => void;
  onLayoutNotification: boolean;
  onSidebarNotification: () => void;
}

export default function SideNavBar({ onItemClick, onLayoutNotification, onSidebarNotification }: SideNavBarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [clickedMainIndex, setClickedMainIndex] = useState(-1);
    const [clickedSecondaryIndex, setClickedSecondaryIndex] = useState(-1);
    
    useEffect(() => {
      if (onLayoutNotification) {
        setIsSidebarOpen(false);
      }
    }, [onLayoutNotification]);

    const handleMainItemClick = (itemName: string, index: number) => {
      onItemClick(itemName);
      setClickedMainIndex(index);
      setClickedSecondaryIndex(-1);
    };

    const handleSecondaryItemClick = (itemName: string, index: number) => {
      onItemClick(itemName);
      setClickedSecondaryIndex(index);
      setClickedMainIndex(-1);
    };

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      onSidebarNotification();
    };

    return (
        <div className='sidebar-panel'>
          <button type='button' title='Open/Close Sidebar' className={`openclose-sidebar-btn${isSidebarOpen ? '' : '-closed'}`} onClick={toggleSidebar}>
              <GiHamburgerMenu/>
          </button>
          <div className={`sidebar${isSidebarOpen ? '' : '-closed'}`}>
            <div className='container'>
              <div className='header-container'>
                <h1 className='header'>
                  Dashboard
                </h1>           
              </div>
              <div className='options'>                     
                {
                    menuMainItems.map((item, index) => (
                        // <Link href={item.path} key={index} className="option group" onClick={() => handleItemClick(item.name)}>
                        //     <div className="group-hover:text-white icon">{item.icon}</div>                    
                        //     <h3 className="group-hover:text-white link-text">{item.name}</h3>
                        // </Link>
                        <Link href={item.path} key={index} className={`option group ${clickedMainIndex === index ? 'clicked-option' : ''}`} onClick={() => handleMainItemClick(item.name, index)}>
                          <div className={`group-hover:text-white icon ${clickedMainIndex === index ? 'clicked-icon' : ''}`}>{item.icon}</div>                    
                          <h3 className={`group-hover:text-white link-text ${clickedMainIndex === index ? 'clicked-text' : ''}`}>{item.name}</h3>
                        </Link>
                    ))
                }                      
              </div>
              <div className='options'>                     
                {
                    menuSecondaryItems.map((item, index) => (
                        //  <Link href={item.path} key={index} className="option group" onClick={() => handleItemClick(item.name)}>
                        //      <div className="group-hover:text-white icon" style={{fontSize:'1.5rem'}}>{item.icon}</div>                    
                        //      <h3 className="group-hover:text-white link-text" style={{paddingRight:'10px'}}>{item.name}</h3>
                        //  </Link>
                        <Link href={item.path} key={index} className={`option group ${clickedSecondaryIndex === index ? 'clicked-option' : ''}`} onClick={() => handleSecondaryItemClick(item.name,index)}>
                            <div className={`group-hover:text-white icon ${clickedSecondaryIndex === index ? 'clicked-icon' : ''}`}>{item.icon}</div>                    
                            <h3 className={`group-hover:text-white link-text ${clickedSecondaryIndex === index ? 'clicked-text' : ''}`} style={{paddingRight: '20px'}}>{item.name}</h3>
                        </Link>
                    ))
                }                      
              </div>
              <ThemeSwitcher/>
            </div>  
          </div>
        </div>           
    )
}