'use client'

import React, {useState, useEffect, useContext} from "react";
import './ProfilePage.css';

import { Navbar } from "../Components/Navbar/Navbar.js";
import { Footer } from "../Components/Footer/Footer.js";
import { YourInvestments } from "./YourInvestments.js";
import banner from "../../public/Assets/banner.jpeg";
import { useThemeContext } from "../Context/ThemeContext.js";
import { MockStocks } from "../MockData/MockStocks.js";

import Image from 'next/image';


export default function ProfilePage() {
    const { darkMode } = useThemeContext();

    return (
        <div class={`transition-all ease-in-out ${darkMode ? "profile_page_dark" : "profile_page"}`}>
            <Navbar />
            <Image class="banner_image" src={banner} alt="Your Banner"></Image>
            <div className="flex-grow">
                <div className="flex flex-col">
                    <h1 className="username_title"> John Doe </h1>
                    <h1 className="username_description"> Description </h1>
                </div>
                <div class="trade_information">
                    <YourInvestments stocks={MockStocks.result}/>
                </div>
                
            </div>
        </div>
    );
}