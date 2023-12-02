'use client'

import React, {useState, useEffect, useContext} from "react";
import './ProfilePage.css';
import './YourInvestments.css';

import { Navbar } from "../Components/Navbar/Navbar.js";
import { Footer } from "../Components/Footer/Footer.js";
import { YourInvestments } from "./YourInvestments.js";
import banner from "../../public/Assets/banner.jpeg";
import { useThemeContext } from "../Context/ThemeContext.js";
import { MockStocks } from "../MockData/MockStocks.js";
import { signout, getUsername } from '../../api/api.mjs'


import Image from 'next/image';


export default function ProfilePage() {
    const { darkMode } = useThemeContext();
    const [user, setUser] = useState('');
    useEffect(() => {
        const username = getUsername();
        setUser(username);
    }, [user])

    if(!user) {
        return (
            <div className={`transition-all ease-in-out ${darkMode ? "profile_page_dark" : "profile_page"}`}>
                <Navbar user={user} signout={() => signout().then(setUser)} />
                <div className="flex flex-row justify-center">
                    <h1 className={`${darkMode ? "text-black" : "text-black"} font-bold text-xl absolute top-64`}>Please sign in or sign up to view this page.</h1>
                </div>
            </div>
        );
    }

    return (
        <div className={`transition-all ease-in-out ${darkMode ? "profile_page_dark" : "profile_page"}`}>
            <Navbar user={user} signout={() => signout().then(setUser)} />
            <Image className="banner_image" src={banner} alt="Your Banner"></Image>
            <div className="flex-grow">
                <div className="flex flex-col">
                    <h1 className="username_title"> {user} </h1>
                    <h1 className="username_description"> Description </h1>
                </div>

                <div className="trade_information">
                    <h1 className="investment_title"> Summary </h1>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <h1 className="trade_information_subtitle"> Total Trades </h1>
                            <h1 className="trade_information_subtitle"> Total Profit </h1>
                            <h1 className="trade_information_subtitle"> Total Loss </h1>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="trade_information_subtitle"> 100 </h1>
                            <h1 className="trade_information_subtitle"> $1000 </h1>
                            <h1 className="trade_information_subtitle"> $500 </h1>
                        </div>
                    </div>
                </div>

                <div className="trade_information">
                    <YourInvestments stocks={MockStocks.result}/>
                </div>
            </div>
        </div>
    );
}