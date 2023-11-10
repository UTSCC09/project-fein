import React, {useState, useEffect} from 'react';
import './YourStocks.css';

import { StockCard } from "./StockCard";

export function YourStocks({stocks}) {
    if (!stocks) {
        return (
            <div className="flex flex-row">
                <h1 className="your_stocks_title"> Your stocks: </h1>
                <h1 className="your_stocks_title"> Loading... </h1>
            </div>
        );
    }
    const displayStocks = stocks.slice(0, 3);
    return (
        <div className="flex flex-row">
            <div className="flex flex-col">
                <h1 className="your_stocks_title"> Your investments: </h1>
                <div className="flex flex-col">
                    {displayStocks?.map((stock) => (
                        <StockCard {...stock} />
                    ))}
                </div>
            </div>

        </div>
    )
}