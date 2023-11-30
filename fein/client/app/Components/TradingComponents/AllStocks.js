'use client'

import React, { useState, useEffect, useContext } from "react";
import './AllStocks.css';

import { StockItem } from "./StockItem";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { MockStocks } from '../../MockData/MockStocks'
import SearchBar from "../Common/SearchBar";
import { useThemeContext } from "../../Context/ThemeContext";
import { useStockContext } from "../../Context/StockContext";
import { Suspense } from "react";

import { supportedStocks } from '../../../api/api.mjs';

export function AllStocks(props) {
    const { setMessage } = props;
    const [results, setResults] = useState([]);

    useEffect(() => {
        const updateResults = async () => {
            const data = await supportedStocks();
            //console.log(data);
            if (Array.isArray(data)) {
                setResults(data);
                setMessage({ err: false })
            } else {
                setResults([]);
                setMessage({ err: true, message: data })
            }
        };
        updateResults();
    }, []);

    let displayStocks = [];
    if (results) {
        displayStocks = results.slice(0, 10);
    }

    const { darkMode } = useThemeContext();
    return (
        <div className={darkMode ? "all_stocks_dark" : "all_stocks"}>
            <div className="flex flex-row">
                <h1 className={darkMode ? "all_stocks_header_dark" : "all_stocks_header"}>All Stocks</h1>
                <div className="flex px-4 py-2 w-full justify-start text">
                </div>
            </div>
            <h2 className={darkMode ? "all_stocks_subheader_dark" : "all_stocks_subheader"}>Top 10 Stocks</h2>

            <div>
                {displayStocks?.map((stock) => (
                    <StockItem stock={stock} key={stock.symbol} setMessage={setMessage} />
                ))}
            </div>


            <div className="flex flex-row w-full justify-between">
                <button className={darkMode ? "all_stocks_nav_dark" : "all_stocks_nav"}> Back </button>
                <h1 className={darkMode ? "all_stocks_page_dark" : "all_stocks_page"}> Page 1 of 1 </h1>
                <button className={darkMode ? "all_stocks_nav_dark" : "all_stocks_nav"}> Next </button>
            </div>
        </div>
    );
}