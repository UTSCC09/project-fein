'use client'

import React, { useState, useEffect } from 'react';
import './StockPage.css';

import { Navbar } from "../../../Components/Navbar/Navbar.js";
import Dashboard from '../../../Components/StockComponents/Dashboard.js';
import { useStockContext } from '../../../Context/StockContext.js';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import { signout, getUsername } from '../../../../api/api.mjs'

export default function StockPage() {

    const params = useParams();
    const { stockSymbol, setStockSymbol } = useStockContext();

    const [user, setUser] = useState('');
    useEffect(() => {
        const username = getUsername();
        setUser(username);
    }, [user])

    // useEffect(() => {
    //     async function updateStock() {
    //         await setStockSymbol(params.symbol);
    //     }
    //     updateStock();
    // }, [stockSymbol]);

    return(
        <div>
            <Navbar user={user} signout={() => signout().then(setUser)} />
            <Dashboard symbol={params.symbol} />
        </div>
    );
}