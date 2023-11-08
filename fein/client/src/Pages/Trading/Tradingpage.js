import "./Tradingpage.css"

import React, { useEffect, useState} from "react";
import { Navbar } from "../../Components/Navbar/Navbar.js";


export function TradingPage() {
    return (
        <div className="basic_background">
            <Navbar />
            <div className="flex-column">
                <div className="flex flex-row">
                    <div class="stock_info"> 
                        <h1 class="mock_stock"> Mock Stock </h1>
                        <h1 class="mock_price"> $45.45 </h1>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            
        </div>
    );
}