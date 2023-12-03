'use client'

import React, { useState, useEffect} from 'react';
import './VarietySettings.css';
import { useThemeContext } from "../../Context/ThemeContext.js";


export function StockSettings() {
    const { darkMode } = useThemeContext();
    return (
        <div className={darkMode ? "container_dark" : "container"}>
            <h1 className={darkMode ? "variety_title_dark" : "variety_title"}>Stock Settings</h1>
        </div>
    );
}