'use client'

import React, {useState, useEffect, useContext} from 'react';
import './Summary.css';

import { YourStocks } from './YourStocks';
import { MockStocks } from '../../MockData/MockStocks'

import { useThemeContext } from '../../Context/ThemeContext';

export function Summary() {
    const { darkMode, setDarkMode } = useThemeContext();

    return (
        <div className={darkMode ? "summary_container_dark" : "summary_container"}>
            <div className="flex flex-row ">
                <h1 className="summary_header"> Summary </h1>
            </div>
            <div className="flex flex-row">
                <YourStocks stocks={MockStocks.result}/>
                <div className="flex flex-col space-y-32">
                    <div className="your_portfolio"> Highest Profit: </div>
                    <div className="your_portfolio"> Highest Loss: </div>
                    <div className="your_portfolio"> Favorite Stock: </div>
                </div>
            </div>
        </div>
    )


}
