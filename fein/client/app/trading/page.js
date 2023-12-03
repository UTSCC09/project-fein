'use client'

import "./Tradingpage.css"

import React, { useEffect, useState, useContext } from "react";
import { Navbar } from "../Components/Navbar/Navbar.js";
import { AllStocks } from "../Components/TradingComponents/AllStocks.js";
import { Footer } from "../Components/Footer/Footer.js";
import { useThemeContext } from "../Context/ThemeContext.js";
import { signout, getUsername } from '../../api/api.mjs'

export default function TradingPage() {
    const { darkMode } = useThemeContext();
    const [message, setMessage] = useState({});
    const [user, setUser] = useState('');


    useEffect(() => {
        const username = getUsername();
        setUser(username);
    }, [user]);

    if(!user) {
        return (
            <div>
                <Navbar user={user} signout={() => signout().then(setUser)} />
                <div className={`${darkMode ? "trading_dark" : "trading"}`}>
                    <div className="flex flex-row self-center absolute top-64">
                        <h1 className={`${darkMode ? "text-white" : "text-black"} font-bold text-xl`}>Please sign in or sign up to view this page.</h1>
                    </div>
                </div>
            </div>

        );
    }

    return (
        <div className={darkMode ? "trading_dark" : "trading"}>
            <Navbar user={user} signout={() => signout().then(setUser)} />
            <AllStocks setMessage={setMessage} />
            {message.err ? (
                <div className={darkMode ? "error_box_dark" : "error_box"}>
                    {message.message}
                </div>
            ) : (<></>)}
        </div>
    );
}