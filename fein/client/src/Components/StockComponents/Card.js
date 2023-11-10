import React, { useContext } from 'react';
import ThemeContext from '../../Context/ThemeContext';

const Card = ({ children }) => {
    const { darkMode } = useContext(ThemeContext);
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