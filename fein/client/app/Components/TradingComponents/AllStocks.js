'use client'

import React, { useState, useEffect, useContext } from "react";
import './AllStocks.css';

import { StockItem } from "./StockItem";
import  { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { MockStocks } from '../../MockData/MockStocks'
import SearchBar from "../Common/SearchBar";
import { useThemeContext } from "../../Context/ThemeContext";
import { useStockContext } from "../../Context/StockContext";
import { Suspense } from "react";

import { supportedStocks } from '../../../api/api.mjs';

export function AllStocks() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        const updateResults = async () => {
            try {
                const data = await supportedStocks();
                setResults(data);
    
            } catch(error) {
                setResults([]);
                console.log(error);
            }
        };
        updateResults();
    }, []);

    let displayStocks = [];
    if(results) { 
        displayStocks = results.slice(0, 10);
    }
    
    const { darkMode } = useThemeContext();
    const { stockSymbol, setStockSymbol  } = useStockContext();
    return (
        <div class={darkMode ? "all_stocks_dark" : "all_stocks"}>
            <div className="flex flex-row">
                <h1 class={darkMode ? "all_stocks_header_dark" : "all_stocks_header"}>All Stocks</h1>
                <div className="flex px-4 py-2 w-full justify-start text">
            </div>
            </div>
            <h2 class={darkMode ? "all_stocks_subheader_dark" : "all_stocks_subheader"}>Top 10 Stocks</h2>

            <div>
                    {displayStocks?.map((stock) => (
                        <StockItem {...stock} />
                    ))}
            </div>


            <div className="flex flex-row w-full justify-between">
                <button class={darkMode ? "all_stocks_nav_dark" : "all_stocks_nav"}> Back </button>
                <h1 class={darkMode ? "all_stocks_page_dark" : "all_stocks_page"}> Page 1 of 1 </h1>
                <button class={darkMode ? "all_stocks_nav_dark" : "all_stocks_nav"}> Next </button>
            </div>
        </div>
    );
}