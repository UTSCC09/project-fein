'use client'

import React from 'react';
import './StockPage.css';

import { Navbar } from "../../../Components/Navbar/Navbar.js";
import Dashboard from '../../../Components/StockComponents/Dashboard.js';
import { useStockContext } from '../../../Context/StockContext.js';
import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function StockPage() {

    const params = useParams();
    const { stockSymbol, setStockSymbol } = useStockContext();

    // useEffect(() => {
    //     async function updateStock() {
    //         await setStockSymbol(params.symbol);
    //     }
    //     updateStock();
    // }, [stockSymbol]);

    return(
        <div>
            <Navbar />
            <Dashboard symbol={params.symbol} />
        </div>
    );
}