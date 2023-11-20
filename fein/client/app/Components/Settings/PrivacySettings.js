'use client'

import React, { useState, useEffect} from 'react';
import './VarietySettings.css';
import { useThemeContext } from "../../Context/ThemeContext.js";
import { Switch} from '@mui/material';


export function PrivacySettings() {
    const { darkMode } = useThemeContext();
    return (
        <div className={darkMode ? "container_dark" : "container"}>
            <h1 className={darkMode ? "variety_title_dark" : "variety_title"}>Privacy Settings</h1>
            <div className="flex flex-row items-center">
                <div className={darkMode ? "variety_text_dark" : "variety_text"}> <h1 className="self-center">Change your privacy </h1></div>
                <div className="mt-4" ><Switch sx={{ m: 1 }}/></div>
            </div>
        </div>
    );
}