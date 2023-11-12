'use client'

import React, {useState, useEffect, useContext } from "react";
import './StockCard.css';
import { useThemeContext } from "../../Context/ThemeContext";
import Link from 'next/link';

export function StockCard(stock) {
    const { darkMode, setDarkMode } = useThemeContext();


    return (
        <Link class="stock_card" href={`/trading/stock/${""}`}>
            <img className="max-w-12 h-12 px-2" src={stock.logo} alt=""/>
            <div className="px-2 mx-8">{stock.name}</div>
            <div className="px-2">{stock.ticker}</div>
            <div className="px-2">{stock.price}</div>
        </Link>

    );
}