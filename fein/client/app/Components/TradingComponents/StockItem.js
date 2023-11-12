'use client'

import React, {useState, useEffect, useContext } from "react";
import './StockItem.css';
import { useThemeContext } from "../../Context/ThemeContext";
import Link from 'next/link';


export function StockItem(stock) {
    const { darkMode, setDarkMode } = useThemeContext(); 

    return (
        <Link class= {darkMode ? "stock_item_dark": "stock_item"} href={`trading/stock/${""}`}>
            <img className="max-w-20 h-16 px-2" src={stock.logo} alt=""/>
            <div className="px-2 mx-8">{stock.name}</div>
            <div className="px-2">{stock.ticker}</div>
            <div className="px-2">{stock.price}</div>
        </Link>
    );
}