'use client'

import React, { useState, useEffect} from 'react';
import './VarietySettings.css';
import { useThemeContext } from "../../Context/ThemeContext.js";



export function AccountSettings() {
    const { darkMode } = useThemeContext();
    return (
        <div className={darkMode ? "container_dark" : "container"}>
            <h1 className={darkMode ? "variety_title_dark" : "variety_title"}>Account Settings</h1>

            
            <button className={darkMode ? "variety_button_dark" : "variety_button"}> Change your username </button>
            <button className={darkMode ? "variety_button_dark" : "variety_button"}> Change your password </button>
        </div>
    );
}