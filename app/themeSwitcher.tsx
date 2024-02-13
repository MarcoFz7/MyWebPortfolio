"use client"

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) {
        return null;
    }

    return (
        <div>
            The current theme is: {theme}
            <button type='button' title='Light Mode' onClick={() => setTheme("light")}>Light</button>
            <button type='button' title='Dark Mode' onClick={() => setTheme("dark")}>Dark</button>
        </div>
    )
}
