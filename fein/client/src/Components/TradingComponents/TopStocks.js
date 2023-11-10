import React, {useState, useEffect, useContext} from "react";
import './TopStocks.css';


import { TopStockItem } from "./TopStockItem";
import { MockStocks } from "../../MockData/MockStocks";

import ThemeContext from "../../Context/ThemeContext";

export function TopStocks(stocks) {
    const displayStocks = MockStocks.result.slice(0, 7);
    const { darkMode } = useContext(ThemeContext);
    return(
        <div class={darkMode ? "top_section_dark" : "top_section"}>
            <h1 class="top_stocks">
                Top Stocks For You
            </h1>
            <div class="top_stocks_container">
                {displayStocks?.map((stock) => (
                    <TopStockItem {...stock} />
                ))}
            </div>

            <button class={darkMode ? "top_stocks_button_dark" : "top_stocks_button"}>
                See More
            </button>

        </div>
    );
}