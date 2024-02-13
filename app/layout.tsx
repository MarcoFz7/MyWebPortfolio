"use client"

import './globals.css'
import { useState } from 'react'
import SideNavBar from './components/sidenavbar/sidenavbar'
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [itemName, setItemName] = useState("Home");
  const [sidebarNotification, setSidebarNotification] = useState(false);

  const handleItemClick = (itemName: string) => {
    setItemName(itemName);
  };

  const handleHtmlClick = (event: any) => {
    const clickedElement = event.target as HTMLElement;
  
    // Function to check if the element belongs to the sidebar
    const hasClassOrAncestor = (element: HTMLElement, className: string): boolean => {
      if (element.classList.contains(className)) {
        return true;
      } else if (element.parentElement) {
        return hasClassOrAncestor(element.parentElement, className);
      }
      return false;
    };
  
    // Call function 
    const isSidebarClick = hasClassOrAncestor(clickedElement, 'sidebar');
  
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

  const [layoutReady, setLayoutReady] = useState(false);
  const handleProvidersReadiness = () => {
    setLayoutReady(true);
  };

  return (
    <html lang="en" onClick={sidebarNotification ? undefined : handleHtmlClick}>
      <body>
        <Providers onProvidersReady={handleProvidersReadiness}>
          {layoutReady ? (
            <div className='main-screen'>
              <div id="main-screen-addorns" className="main-screen-page">
                <div id="main-content">
                  {/* <span id="navigation-marker">{itemName}</span> */} 
                  <SideNavBar onItemClick={handleItemClick} onLayoutNotification={sidebarNotification} onSidebarNotification={handleHtmlClickReset}/>
                  {children}
                </div>
                <div id="top-left-container">
                  <div id="top-left" className="corner"></div>
                  <div id="top-left-rounded-corner"></div>
                  <div id="top-left-right-triangle"></div>
                  <div id="top-left-bottom-triangle"></div>
                </div>
                <div id="bottom-right-container">
                  <div id="bottom-right" className="corner"></div>
                  <div id="bottom-right-rounded-corner"></div>
                  <div id="bottom-right-left-triangle"></div>
                  <div id="bottom-right-top-triangle"></div>
                </div>
              </div>    
            </div>
            ) : (
              <div>Loading...</div>
            )}
        </Providers>
      </body>
    </html>
  )
}
