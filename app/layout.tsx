"use client"

import './globals.css'
import { useState } from 'react'
import SideNavBar from './components/sidenavbar/sidenavbar'
import Providers from './providers'
import { Poppins, Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({weight: '600', style: "normal", subsets: ["latin"]})
const poppins = Poppins({ weight: ['200', '300', '400', '500', '600'], style: "normal", subsets: ["latin"] });


/*
 * Interface used for the figures used in the background animation
 * Specifies their color (shuffled everytime from a limited set of colors), start position in the x and y axis and end position in the x axis
 */
interface Figure {
  color: string;
  startPositionX: string;
  startPositionY: string;
}

// Function to shuffle an array - used for colors
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Array of colors to be used in figures array
const colors: string[] = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5',
  '#F5FF33', '#FF8C33', '#8C33FF', '#33FF8C', '#FF3333',
  '#33FF33', '#3333FF', '#FF33FF', '#33FFA1', '#A133FF',
  '#FFA133', '#FF338C', '#33A1FF', '#A1FF33', '#FF33F5'
];

// Arrays of positions in X to be used 
const startPositions: string[] = [
  "0", "5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", 
  "50%", "55%", "60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%"
];

// Shuffle the colors 
const shuffledColors = shuffleArray(colors);

// Array of the set of colors able to be used in the figures - right now 20 colors for 20 figures
let figures: Figure[] = shuffledColors.map((color, index) => ({
  color: color,
  startPositionX: startPositions[index],
  startPositionY: startPositions[index]
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [itemName, setItemName] = useState("Home");
  const [sidebarNotification, setSidebarNotification] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const handleItemClick = (itemName: string) => {
    setItemName(itemName);
  };

  const handleHtmlClick = (event: any) => {
    const clickedElement = event.target as HTMLElement;
  
    // Function to check if the element belongs to the sidebar
    const hasClassOrAncestor = (element: HTMLElement, className: string, className2: string): boolean => {
      if (element.classList.contains(className) || element.classList.contains(className2)) {
        return true;
      } else if (element.parentElement) {
        return hasClassOrAncestor(element.parentElement, className, className2);
      }
      return false;
    };
  
    // Call function 
    const isSidebarClick = hasClassOrAncestor(clickedElement, 'sidebar', 'sidebar-panel');
  
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

        setIsMoving(true);

       /*  setTimeout(() => {
          setIsMoving(false);
          figures = figures.map((item) => ({
            ...item,
            startPositionX: "0"
          }));
        }, 2500); */

      }, 325);
    }, 325);
  };

  return (
    <html lang="en" className='root-html' onClick={sidebarNotification ? undefined : handleHtmlClick} style={{filter: htmlBlur ? 'blur(1.5px)' : 'blur(0px)'}}>
      <body className={`${poppins.className} nutrition-page`}>
        <Providers onProvidersReady={handleProvidersReadiness}>
          {/* <div className='screen-background-addorns'>
            {
              figures.map((item, index) => (                          
                <div
                  key={`cube-${index}`}
                  className={`cube${isMoving ? ' move' : ''} bg-[${item.color}]`}
                  style={{ left: `${item.startPositionX}`, top: `${item.startPositionY}`}}
                ></div>))
            }   
          </div> */}
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
