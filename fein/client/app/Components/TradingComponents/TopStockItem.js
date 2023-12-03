'use client'

import React, {useState, useEffect, useContext } from "react";
import './TopStockItem.css';

import { useThemeContext } from "../../Context/ThemeContext";


export function TopStockItem(stock) {
    const { darkMode, setDarkMode } = useThemeContext();

    return (
        <div className={darkMode ? "top_stock_item_dark" : "top_stock_item"} href={`/trading/stock/${""}`}>
            <img className="max-w-8 h-8 px-2" src={stock.logo} alt=""/>
            <div className="px-2">{stock.name}</div>
            <div className="px-2">{stock.ticker}</div>
            <div className="px-2">{stock.price}</div>
        </div>
    );
}