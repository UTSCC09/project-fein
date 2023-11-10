import "./Homepage.css"

import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import UilReact from "@iconscout/react-unicons/icons/uil-react";

// Component imports

import { Navbar } from "../../Components/Navbar/Navbar.js";
import { Slider } from "../../Components/Slider/Slider.js";
import { TopStocks } from "../../Components/TradingComponents/TopStocks.js";
import { Summary } from "../../Components/TradingComponents/Summary.js";
import { Hero } from "../../Components/HeroSection/Hero.js";
import { Footer } from "../../Components/Footer/Footer.js";

export function HomePage() {
    return (
        <div className="">
            <Navbar />
            <div className="flex flex-col">
                <div className="flex flex-row self-center">
                    <h1 class="title"> Welcome to </h1>
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
