import React, {useState, useEffect, useContext } from "react";
import './StockItem.css';
import ThemeContext from "../../Context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";


export function StockItem(stock) {
    const { darkMode } = useContext(ThemeContext); 
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/trading/stock`);
        // ${stock.ticker}
    }

    return (
        <div class= {darkMode ? "stock_item_dark": "stock_item"} onClick={handleClick}>
            <img className="max-w-20 h-16 px-2" src={stock.logo} alt=""/>
            <div className="px-2 mx-8">{stock.name}</div>
            <div className="px-2">{stock.ticker}</div>
            <div className="px-2">{stock.price}</div>
        </div>
    );
}