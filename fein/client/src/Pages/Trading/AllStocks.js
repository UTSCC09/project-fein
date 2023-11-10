import React, { useState, useEffect } from "react";
import './AllStocks.css';
import { Link } from "react-router-dom";

import { StockItem } from "./StockItem";
import  { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { MockStocks } from '../../MockData/MockStocks'
import SearchBar from "../../Components/Common/SearchBar";

export function AllStocks() {
    const displayStocks = MockStocks.result.slice(0, 10);
    return (
        <div className="all_stocks">
            <div className="flex flex-row">
                <h1 className="all_stocks_header">All Stocks</h1>
                <div className="flex px-4 py-2 w-full justify-start text">
                <SearchBar nav={false}/>
            </div>
            </div>
            <h2 className="all_stocks_subheader">Top 10 Stocks</h2>
            {displayStocks?.map((stock) => (
                <StockItem {...stock} />
            ))}
            <div className="flex flex-row w-full justify-between">
                <button class="all_stocks_nav"> Back </button>
                <h1 className="all_stocks_page"> Page 1 of 1 </h1>
                <button class="all_stocks_nav"> Next </button>
            </div>
        </div>
    );
}