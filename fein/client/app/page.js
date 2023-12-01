'use client'

import "./Homepage.css"
import React, { useState } from "react";

// Component imports

import { useEffect } from "react";

import { Navbar } from "./Components/Navbar/Navbar.js";
import { TopStocks } from "./Components/TradingComponents/TopStocks.js";
import { Summary } from "./Components/TradingComponents/Summary.js";
import { Hero } from "./Components/HeroSection/Hero.js";
import { Footer } from "./Components/Footer/Footer.js";
import { AddFundForm } from "./Components/AddFundsForm/addFundForm.js"

import { signout, getUsername, getFeinBucks, addFunds } from '../api/api.mjs'

import { useThemeContext } from "./Context/ThemeContext.js";

export default function HomePage() {
    const { darkMode } = useThemeContext();
    const [user, setUser] = useState('');
    const [userFeinBucks, setUserFeinBucks] = useState(-2);

    useEffect(() => {
        const username = getUsername();
        setUser(username);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            console.log(user);
            //console.log("made it")
            if (user !== '') {
                const userAmount = await getFeinBucks(user)
                console.log(userAmount.fein_bucks)
                setUserFeinBucks(userAmount.fein_bucks)
                //console.log(userFeinBucks)
            }
        }
        fetchData();
    }, [user])

    return (
        <main className={`transition-all ease-in-out ${darkMode ? "bg-darkMode text-white" : "bg-white text-black"}`}>
            <Navbar user={user} signout={() => signout().then(setUser(''))} />
            {userFeinBucks === -1 && user !== '' ? (
                <div className='add_fund_form'>
                    <AddFundForm user={user} setUserFeinBucks={setUserFeinBucks} addFunds={addFunds} />
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex flex-row self-center">
                        <h1 className={darkMode ? "title_dark" : "title"}> Welcome to </h1>
                        <h1 className="title_2">FEIN</h1>
                    </div>
                    <Hero />
                    <div className="flex flex-row mt-12">
                        <TopStocks />
                        <Summary />
                    </div>
                    <Footer />
                </div>
            )}

        </main>
    );
} 
