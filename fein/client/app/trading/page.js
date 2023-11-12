'use client'

import "./Tradingpage.css"

import React, { useEffect, useState, useContext } from "react";
import { Navbar } from "../Components/Navbar/Navbar.js";
import { AllStocks } from "../Components/TradingComponents/AllStocks.js";
import { Footer } from "../Components/Footer/Footer.js";
import { useThemeContext } from "../Context/ThemeContext.js";

export default function TradingPage() {
    const { darkMode } = useThemeContext();
    return (
        <div class={darkMode ? "trading_dark" : "trading"}>
            <Navbar />
            <div className="flex-grow">

                <AllStocks />

            </div>
            
        </div>
    );
}