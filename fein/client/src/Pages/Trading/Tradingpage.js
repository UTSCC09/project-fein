import "./Tradingpage.css"

import React, { useEffect, useState} from "react";
import { Navbar } from "../../Components/Navbar/Navbar.js";
import { AllStocks } from "./AllStocks.js";
import { Footer } from "../../Components/Footer/Footer.js";


export function TradingPage() {
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="flex-grow">

                <AllStocks />

            </div>
            
        </div>
    );
}