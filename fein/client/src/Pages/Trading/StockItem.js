import React, {useState, useEffect} from "react";
import './StockItem.css';


export function StockItem(stock) {
    return (

        <div className="">
            <div class="stock_item">
                <img className="max-w-20 h-16 px-2" src={stock.logo} alt=""/>
                <div className="px-2 mx-8">{stock.name}</div>
                <div className="px-2">{stock.ticker}</div>
                <div className="px-2">{stock.price}</div>
            </div>
        </div>
    );
}