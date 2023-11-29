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

    const [user, setUser] = useState('');
    useEffect(() => {
        const username = getUsername();
        setUser(username);
    }, [user])

    return (
        <div className={darkMode ? "trading_dark" : "trading"}>
            <Navbar user={user} signout={() => signout().then(setUser)} />
            <AllStocks />
        </div>
    );
}