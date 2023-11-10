import React, { useState, useEffect } from "react";
import './AllStocks.css';
import { Link } from "react-router-dom";

import { StockItem } from "./StockItem";
import  { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const MockStocks = [
    {
        id: 1, 
        name: "Apple Inc.",
        ticker: "AAPL",
        price: 130.21,
        change: 0.12,
        changePercent: 0.09,
        volume: 100000,
        avgVolume: 100000,
        marketCap: 1000000000000,
        peRatio: 100,
        week52High: 100,
        week52Low: 100,
        ytdChange: 100,
        website: "https://www.apple.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1720px-Apple_logo_black.svg.png"
    }, 
    {
        id: 2, 
        name: "Tesla Inc.",
        ticker: "TSLA",
        price: 130.21,
        change: 0.12,
        changePercent: 0.09,
        volume: 100000,
        avgVolume: 100000,
        marketCap: 1000000000000,
        peRatio: 100,
        week52High: 100,
        week52Low: 100,
        ytdChange: 100,
        website: "https://www.tesla.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png"
    },
    {
        id: 3,
        name: "Microsoft Corporation",
        ticker: "MSFT",
        price: 130.21,
        change: 0.12,
        changePercent: 0.09,
        volume: 100000,
        avgVolume: 100000,
        marketCap: 1000000000000,
        peRatio: 100,
        week52High: 100,
        week52Low: 100,
        ytdChange: 100,
        website: "https://www.microsoft.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png"
    },
    {
        id: 4,
        name: "Facebook Inc.",
        ticker: "FB",
        price: 130.21,
        change: 0.12,
        changePercent: 0.09,
        volume: 100000,
        avgVolume: 100000,
        marketCap: 1000000000000,
        peRatio: 100,
        week52High: 100,
        week52Low: 100,
        ytdChange: 100,
        website: "https://www.facebook.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png"
    }
];

export function AllStocks() {
    const displayStocks = MockStocks.slice(0, 10);
    return (
        <div className="all_stocks">
            <div className="flex flex-row">
                <h1 className="all_stocks_header">All Stocks</h1>
                <div className="flex px-4 py-2 w-full justify-start text">
                <MagnifyingGlassIcon class="search_icon" />
                <input class="search_bar" type="text" placeholder="Search" />
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