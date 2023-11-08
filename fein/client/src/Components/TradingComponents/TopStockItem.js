import React, {useState, useEffect} from "react";
import './TopStockItem.css';


export function TopStockItem(stock) {
    return (

        <div className="">
            
            <div class="top_stock_item">
                <img className="max-w-8 h-8" src={stock.logo} alt=""/>
                <div>{stock.name}</div>
                <div>{stock.ticker}</div>
                <div>{stock.price}</div>
            </div>
        </div>
    );
}