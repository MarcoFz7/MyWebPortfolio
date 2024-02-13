"use client"

import { ThemeProvider } from 'next-themes'
import { useState, useEffect} from 'react'

interface ProvidersProps {
  onProvidersReady: () => void;
}

export default function Providers({children, onProvidersReady}: {children: React.ReactNode} & ProvidersProps) {
    const [mounted, setMounted] = useState(false); 

    useEffect(() => {
        setMounted(true);
        onProvidersReady();
    }, []);

    if(!mounted) {
        return <>{children}</>
    }
    return <ThemeProvider>{children}</ThemeProvider>
}
