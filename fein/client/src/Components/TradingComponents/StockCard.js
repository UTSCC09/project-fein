import React, {useState, useEffect, useContext } from "react";
import './StockCard.css';
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../Context/ThemeContext";

export function StockCard(stock) {
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/trading/stock/${stock.ticker}`);
        
    }

    return (
        <div class="stock_card" onClick={handleClick}>
            <img className="max-w-12 h-12 px-2" src={stock.logo} alt=""/>
            <div className="px-2 mx-8">{stock.name}</div>
            <div className="px-2">{stock.ticker}</div>
            <div className="px-2">{stock.price}</div>
        </div>

    );
}