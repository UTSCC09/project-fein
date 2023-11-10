import "./Homepage.css"

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UilReact from "@iconscout/react-unicons/icons/uil-react";

// Component imports

import { Navbar } from "../../Components/Navbar/Navbar.js";
import { Slider } from "../../Components/Slider/Slider.js";
import { TopStocks } from "../../Components/TradingComponents/TopStocks.js";
import { Summary } from "../../Components/TradingComponents/Summary.js";
import { Hero } from "../../Components/HeroSection/Hero.js";
import { Footer } from "../../Components/Footer/Footer.js";

import ThemeContext from "../../Context/ThemeContext.js";

export function HomePage() {
    const { darkMode } = useContext(ThemeContext);
    return (
        <div className={`${darkMode ? "bg-darkMode text-white" : "bg-white text-black"}`}>
            <Navbar />
            <div className="flex flex-col">
                <div className="flex flex-row self-center">
                    <h1 class={darkMode ? "title_dark" : "title"}> Welcome to </h1>
                    <h1 class="title_2">FEIN</h1>
                </div>
                <Hero />
                <div className="flex flex-row mt-12">
                    <TopStocks />
                    <Summary />
                    {/* <button class="trade_button"> Start Trading Now!</button> */}
                </div>
                <Footer />
            </div>
        </div>
    );
} 
