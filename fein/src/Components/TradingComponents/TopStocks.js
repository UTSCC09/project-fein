import React, {useState, useEffect} from "react";
import './TopStocks.css';


import { TopStockItem } from "./TopStockItem";

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
        logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png"
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
    }
];


export function TopStocks(stocks) {
    const displayStocks = MockStocks.slice(0, 5);
    return(
        <div class="top_section">
            <h1 class="top_stocks">
                Current Top Stocks For You
            </h1>
            <div class="top_stocks_container">
                {displayStocks?.map((stock) => (
                    <TopStockItem {...stock} />
                ))}
            </div>

            <button class="top_stocks_button">
                See More
            </button>

        </div>
    );
}