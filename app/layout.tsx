"use client"

import './globals.css'
import { useState } from 'react'
import SideNavBar from './components/sidenavbar/sidenavbar'
import Providers from './providers'
import { Poppins, Dancing_Script } from 'next/font/google'

import { GiHamburgerMenu } from 'react-icons/gi'

const dancingScript = Dancing_Script({weight: '600', style: "normal", subsets: ["latin"]})
const poppins = Poppins({ weight: ['200', '300', '400', '500', '600'], style: "normal", subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarNotification, setSidebarNotification] = useState(false);

  const handleHtmlClick = (event: any) => {
    const clickedElement = event.target as HTMLElement;
  
    // Function to check if the element belongs to the sidebar
    const hasClassOrAncestor = (element: HTMLElement, className: string, className2: string, className3: string): boolean => {
      if (element.classList.contains(className) || element.classList.contains(className2) || element.classList.contains(className3)) {
        return true;
      } else if (element.parentElement) {
        return hasClassOrAncestor(element.parentElement, className, className2, className3);
      }
      return false;
    };
  
    // Call function 
    const isSidebarClick = hasClassOrAncestor(clickedElement, 'sidebar', 'sidebar-panel', 'openclose-sidebar-btn-layout');
  
    if (!sidebarNotification) {
      if (!isSidebarClick) {  
        setSidebarNotification(true);
      }
    }
  };

  // Reset to allow the sidebar to close again if opened and the user clicks outside the sidebar, and so on
  const handleHtmlClickReset = () => {
    setSidebarNotification(false);
  };

  // Sidebar
  const [sidebarClicked, setSidebarClicked] = useState(0);

  const handleSidebarLayoutBtnClick = () => {
    setSidebarClicked(prev => prev + 1);
  }

  // Theme related
  const [layoutReady, setLayoutReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [htmlBlur, setHtmlBlur] = useState(false);
  const [ready, setReady] = useState(false);

  const handleProvidersReadiness = () => {
    setLayoutReady(true);
    setHtmlBlur(true);

    setTimeout(() => {
      setLoaded(true);
      
      setTimeout(() => {
        setHtmlBlur(false);
        setReady(true);
      }, 325);
    }, 325);
  };

  return (
    <html lang="en" className='root-html' onClick={sidebarNotification ? undefined : handleHtmlClick} style={{filter: htmlBlur ? 'blur(1.5px)' : 'blur(0px)'}}>
      <body className={`${poppins.className} nutrition-page`}>
        <Providers onProvidersReady={handleProvidersReadiness}>      
          <div className='main-screen'>
            <div id="main-screen-addorns" className="main-screen-page">
              <div id="main-content">
                <SideNavBar onItemClick={sidebarClicked} onLayoutNotification={sidebarNotification} onSidebarNotification={handleHtmlClickReset}/>
                {children}
              </div>
              <div id="top-left-container">
                <div id="top-left" className="corner"></div>
                <div id="top-left-rounded-corner"></div>
                <div id="top-left-right-triangle"></div>
                <div id="top-left-bottom-triangle"></div>
              </div>
              <div id="top-right-container">
                <div id="top-right-btn">
                  <button type='button' title='Open/Close Sidebar' className={`openclose-sidebar-btn-layout`} onClick={handleSidebarLayoutBtnClick}>
                    <GiHamburgerMenu/>
                  </button>
                </div>
              </div>
              <div id="bottom-right-container">
                <div id="bottom-right" className="corner"></div>
                <div id="bottom-right-rounded-corner"></div>
                <div id="bottom-right-left-triangle"></div>
                <div id="bottom-right-top-triangle"></div>
              </div>
            </div>    
          </div>
          <div className='slider' style={{ opacity: layoutReady && loaded ? '0' : '1', zIndex: layoutReady && loaded ? '-1' : '8'}}>
            <div className='slider-content'>
              <span className={`${dancingScript.className} content-name`}>Marco</span>
              <div className='my-logo-div'>
                {/* <img src='' className='my-logo'></img>   */}
              </div>
              <span className={`${dancingScript.className} content-name`}>Ferraz</span>
            </div>
          </div>      
        </Providers>
      </body>
    </html>
  )
}
