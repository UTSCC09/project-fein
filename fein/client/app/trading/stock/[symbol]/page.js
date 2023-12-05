'use client'

import React, { useState, useEffect } from 'react';
import './StockPage.css';

import { Navbar } from "../../../Components/Navbar/Navbar.js";
import Dashboard from '../../../Components/StockComponents/Dashboard.js';
import { useStockContext } from '../../../Context/StockContext.js';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import { signout, getUsername } from '../../../../api/api.mjs'
import { useThemeContext } from '../../../Context/ThemeContext.js';
import { useRouter } from "next/navigation"

import Chat from '../../../Components/StockComponents/Chat.js';

export default function StockPage() {
    const [message, setMessage] = useState({});
    const params = useParams();
    const { stockSymbol, setStockSymbol } = useStockContext();
    const { darkMode } = useThemeContext();
    const router = useRouter();

    const [user, setUser] = useState('');
    useEffect(() => {
        const username = getUsername();
        if (username != '') {
            setUser(username);
        } else {
            router.push('/');
        }
    }, [user])

    // useEffect(() => {
    //     async function updateStock() {
    //         await setStockSymbol(params.symbol);
    //     }
    //     updateStock();
    // }, [stockSymbol]);

    return (
        <div className={darkMode ? "stock_dark" : "stock"}>
            <Navbar user={user} signout={() => signout().then(setUser)} />
            {!user ? (
                <div className="flex flex-row justify-center">
                    <h1 className={`${darkMode ? "text-white" : "text-black"} font-bold text-xl absolute top-64`}>Please sign in or sign up to view this page.</h1>
                </div>
            ) : (<div>
                <div className="flex">
                    <Dashboard symbol={params.symbol} setMessage={setMessage} />
                    <Chat />
                </div>
                {message.err ? (
                    <div className={darkMode ? "error_box_dark" : "error_box"}>
                        {message.message}
                    </div>
                ) : (<></>)}
            </div>
            )}

        </div>
    );
}