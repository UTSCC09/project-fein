import React, {useState, useEffect} from "react";
import './TopStockItem.css';


export function TopStockItem(stock) {
    return (

        <div className="">
            <div class="top_stock_item">
                <img className="max-w-8 h-8 px-2" src={stock.logo} alt=""/>
                <div className="px-2">{stock.name}</div>
                <div className="px-2">{stock.ticker}</div>
                <div className="px-2">{stock.price}</div>
            </div>
        </div>
    );
}