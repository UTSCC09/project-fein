import React, {useState, useEffect} from "react";
import './TopStockItem.css';

import { useNavigate, useParams } from "react-router-dom";


export function TopStockItem(stock) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/trading/stock`);
        // ${stock.ticker}
    }

    return (
        <div class="top_stock_item" onClick={handleClick}>
            <img className="max-w-8 h-8 px-2" src={stock.logo} alt=""/>
            <div className="px-2">{stock.name}</div>
            <div className="px-2">{stock.ticker}</div>
            <div className="px-2">{stock.price}</div>
        </div>
    );
}