'use client'

import React from 'react';
import './Spinner.css';
import { useThemeContext } from '../../Context/ThemeContext.js';

export function Spinner() {
    const { darkMode } = useThemeContext();
    return(
        <div className={`flex w-screen h-screen self-center justify-center ${darkMode ? "bg-darkMode" : "bg-fein"
            }`}>
            <div className="spinner">
                <div className="spinner_text">
                </div>
            </div>
        </div>
    );
}