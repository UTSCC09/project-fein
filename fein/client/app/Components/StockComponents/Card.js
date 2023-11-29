import React from 'react';
import  { useThemeContext } from '../../Context/ThemeContext';

function Card ({ children }) {
    const { darkMode } = useThemeContext();
    return (
        <div className={`w-full h-full rounded-md relative p-8 border-2 bg-gray-300 ${darkMode ? 
            "text-gray-300 border-gray-300 bg-darkModeCard"
            : "text-black border-black-100"
        }`}>
            {children}
        </div>
    )
}

export default Card;