'use client'

import React, {useState, useEffect, useContext } from "react";
import './StockItem.css';
import { useThemeContext } from "../../Context/ThemeContext";
import Link from 'next/link';

import { useStockContext } from "../../Context/StockContext";


export function StockItem(stock) {
    const { darkMode, setDarkMode } = useThemeContext(); 
    const { setStockSymbol } = useStockContext();

    async function handleClick() {
        await setStockSymbol(stock.symbol);
    }

    console.log(stock.symbol);
    return (
        
        <Link className={darkMode ? "stock_item_dark": "stock_item"} onClick={() => handleClick()} href={`trading/stock/`}>
            <div className="px-2 mx-8">{stock.symbol}</div>
            <div className="px-2">{stock.currency}</div>
        </Link>
    );
}