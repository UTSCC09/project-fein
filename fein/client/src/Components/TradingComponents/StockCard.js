import React, {useState, useEffect} from "react";
import './StockCard.css';

export function StockCard(stock) {
    return (
        <div className="">
            <div class="stock_card">
                <img className="max-w-12 h-12 px-2" src={stock.logo} alt=""/>
                <div className="px-2 mx-8">{stock.name}</div>
                <div className="px-2">{stock.ticker}</div>
                <div className="px-2">{stock.price}</div>
            </div>
        </div>
    );
}