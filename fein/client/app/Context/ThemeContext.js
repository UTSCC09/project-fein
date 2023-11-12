'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export default function ThemeContextProvider({children}) {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true' ? true : false
    );

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
}

