'use client'

import React, { useState, useEffect} from 'react';
import './VarietySettings.css';
import { useThemeContext } from "../../Context/ThemeContext.js";


export function ProfileSettings() {
    const { darkMode } = useThemeContext();
    return (
        <div className={darkMode ? "container_dark" : "container"}>
            <h1 className={darkMode ? "variety_title_dark" : "variety_title"}>Profile Settings</h1>
            <button className={darkMode ? "variety_button_dark" : "variety_button"}> Edit display name </button>
            <button className={darkMode ? "variety_button_dark" : "variety_button"}> Edit profile banner</button>
            <button className={darkMode ? "variety_button_dark" : "variety_button"}> Edit description </button>
        </div>
    );
}