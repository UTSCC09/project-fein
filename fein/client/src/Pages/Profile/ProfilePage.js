import React, {useState, useEffect, useContext} from "react";
import './ProfilePage.css';

import { Navbar } from "../../Components/Navbar/Navbar.js";
import { Footer } from "../../Components/Footer/Footer.js";
import { YourInvestments } from "./YourInvestments.js";
import banner from "../../Assets/banner.jpeg";
import ThemeContext from "../../Context/ThemeContext.js";
import { MockStocks } from "../../MockData/MockStocks.js";


export function ProfilePage() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div class={darkMode ? "profile_page_dark" : "profile_page"}>
            <Navbar />
            <img class="banner_image" src={banner} alt="Your Banner"></img>
            <div className="flex-grow">
                <div className="flex flex-col">
                    <h1 className="username_title"> Username </h1>
                    <h1 className="username_description"> Description </h1>
                </div>
                <div class="trade_information">
                    <YourInvestments stocks={MockStocks.result}/>
                </div>
                
            </div>
        </div>
    );
}