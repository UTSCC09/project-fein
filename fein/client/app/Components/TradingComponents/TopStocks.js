'use client'

import React, {useState, useEffect, useContext} from "react";
import './TopStocks.css';


import { TopStockItem } from "./TopStockItem";
import { MockStocks } from "../../MockData/MockStocks";

import { useThemeContext } from "../../Context/ThemeContext";

export function TopStocks(stocks) {
    const displayStocks = MockStocks.result.slice(0, 7);
    const { darkMode, setDarkMode } = useThemeContext();
    return(
        <div className={darkMode ? "top_section_dark" : "top_section"}>
            <h1 className="top_stocks">
                Top Stocks For You
            </h1>
            <div className="top_stocks_container">
                {displayStocks?.map((stock) => (
                    <TopStockItem {...stock} key={stock.ticker} />
                ))}
            </div>

            <button className={darkMode ? "top_stocks_button_dark" : "top_stocks_button"}>
                See More
            </button>

        </div>
    );
}