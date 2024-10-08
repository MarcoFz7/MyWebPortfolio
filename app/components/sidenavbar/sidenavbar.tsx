"use client"

import './sidenavbar.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { TbUserStar, TbUserCode, TbUserQuestion } from 'react-icons/tb'
import { PiChatCircleDotsBold } from 'react-icons/pi'
import ThemeSwitcher from '@/app/components/themeSwitcher/themeSwitcher'

/**
 * Menu options related to the website pages
 */
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

/**
 * Menu options related to website settings and/or functionalities
 */
const menuSecondaryItems=[
  {
      path:"/contacts",
      name:"Contacts",
      icon:<PiChatCircleDotsBold/>
  }
]

/**
 * Interface for the SideNavBar
 */
interface SideNavBarProps {
  onItemClick: number;
  onLayoutNotification: boolean;
  onSidebarNotification: () => void;
}

/**
 * 
 * @param onItemClick - indicates the menu option clicked
 * @param onLayoutNotification - indicates the layout sent a notification to the sidebar, for opening/closing porpuses
 * @param onSidebarNotification - sends a notification to the layout
 * 
 * @returns SideNavBar
 */
export default function SideNavBar({ onItemClick, onLayoutNotification, onSidebarNotification }: SideNavBarProps) {
  /**
   * Consts for the SideNavBar
   */
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [clickedMainIndex, setClickedMainIndex] = useState(-1);
    const [clickedSecondaryIndex, setClickedSecondaryIndex] = useState(-1);

    const currentPage = usePathname();

    // Used to set the corresponding navigation item as selected on refresh/start
    useEffect(() => {
      if (clickedMainIndex == -1) {
        switch (currentPage) {
          case "/about":
            setClickedMainIndex(0);
            break;
          case "/experience":
            setClickedMainIndex(1);
            break;
          case "/projects":
            setClickedMainIndex(2);
            break;
        } 
      }
      if (clickedSecondaryIndex == -1) {
        switch (currentPage) {
          case "/contacts":
            setClickedSecondaryIndex(0);
            break;
        } 
      }
    }, []);
    
    useEffect(() => {
       toggleSidebar()
    }, [onItemClick]);

    useEffect(() => {
      if (onLayoutNotification) {
        setIsSidebarOpen(false);
      }
    }, [onLayoutNotification]);

    /**
     * Closes the sidebar on option clicked, when the screen is small
     * 
     * @param index - number of the menu main option clicked
     */
    const handleMainItemClick = (index: number) => {
      setClickedSecondaryIndex(-1);

      // Check if is small screen (width)
      // if is small screen 
      if (window.innerWidth <= 825 && index != clickedMainIndex) {
        toggleSidebar();
        
        resetSidebarLogic();
      }

      setClickedMainIndex(index);
    };

    /**
     * Closes the sidebar on option clicked, when the screen is small
     * 
     * @param index - number of the menu secondary option clicked
     */
    const handleSecondaryItemClick = (index: number) => {
      setClickedMainIndex(-1);

      // Check if is small screen (width)
      // if is small screen 
      if (window.innerWidth <= 825 && index != clickedSecondaryIndex) {
        toggleSidebar();
        
        resetSidebarLogic();
      }

      setClickedSecondaryIndex(index);
    };

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      onSidebarNotification();
    };

    const resetSidebarLogic = () => {
      // Needed since the click is still on the sidebar (generally doesn't close)
      const button = document.querySelector('.openclose-sidebar-btn') as HTMLButtonElement;
      if (button) {
        // reset button
        button.click();
        button.blur();
      }
    }

    return (
        <div className='sidebar-panel'>
          {/* <button type='button' title='Open/Close Sidebar' className={`openclose-sidebar-btn${isSidebarOpen ? '' : '-closed'}`} onClick={toggleSidebar}>
              <GiHamburgerMenu/>
          </button> */}
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
                        <Link href={item.path} key={index} className={`option group ${clickedMainIndex === index ? 'clicked-option' : ''}`} onClick={() => handleMainItemClick(index)}>
                          <div className={`group-hover:text-white icon ${clickedMainIndex === index ? 'clicked-icon' : ''}`}>{item.icon}</div>                    
                          <h3 className={`group-hover:text-white link-text ${clickedMainIndex === index ? 'clicked-text' : ''}`}>{item.name}</h3>
                        </Link>
                    ))
                }                      
              </div>
              <div className='options'>                     
                {
                    menuSecondaryItems.map((item, index) => (                       
                        <Link href={item.path} key={index} className={`option group ${clickedSecondaryIndex === index ? 'clicked-option' : ''}`} onClick={() => handleSecondaryItemClick(index)}>
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