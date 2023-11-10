import "./Tradingpage.css"

import React, { useEffect, useState, useContext } from "react";
import { Navbar } from "../../Components/Navbar/Navbar.js";
import { AllStocks } from "./AllStocks.js";
import { Footer } from "../../Components/Footer/Footer.js";
import ThemeContext from "../../Context/ThemeContext.js";

export function TradingPage() {
    const { darkMode } = useContext(ThemeContext);
    return (
        <div class={darkMode ? "trading_dark" : "trading"}>
            <Navbar />
            <div className="flex-grow">

                <AllStocks />

            </div>
            
        </div>
    );
}