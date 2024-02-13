"use client"

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import './themeSwitcher.css'
import { GoMoon, GoSun } from "react-icons/go";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isToggled, setIsToggled] = useState(theme == 'dark');

    useEffect(() => {
        setMounted(true);
    }, [theme, setTheme]);  

    if(!mounted) {
        return null;
    }

    const handleToggle = () => {
        setIsToggled(!isToggled);

        if(!isToggled) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    return (
        <div>
            <div className="toggle">
                <input title="Light/dark mode" type="checkbox" id="switch" onChange={handleToggle}/>
                <label htmlFor="switch">
                {isToggled ? (
                    <GoMoon style={{ marginLeft: 'auto', color: 'rgb(0,0,0)'}}/>
                    ) : (
                    <GoSun style={{ color: 'rgb(52,60,96)' }}/>
                    )}       
                </label>
            </div>
        </div>    
    )
}
