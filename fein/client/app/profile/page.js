'use client'

import React, { useState, useEffect, useContext } from "react";
import './ProfilePage.css';
import './YourInvestments.css';

import { Navbar } from "../Components/Navbar/Navbar.js";
import { Footer } from "../Components/Footer/Footer.js";
import { YourInvestments } from "./YourInvestments.js";
import banner from "../../public/Assets/banner.jpeg";
import { useThemeContext } from "../Context/ThemeContext.js";
import { MockStocks } from "../MockData/MockStocks.js";
import { signout, getUsername, getInvestments, getFeinBucks } from '../../api/api.mjs'
import { AddFundForm } from '../Components/AddFundsForm/addFundForm'


import Image from 'next/image';


export default function ProfilePage() {
    const { darkMode } = useThemeContext();
    const [user, setUser] = useState('');
    const [investments, setInvestments] = useState([])
    const [userFeinBucks, setUserFeinBucks] = useState(-2);
    const [netGain, setNetGain] = useState(0)
    const [showAddFundsform, setShowAddFundsForms] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const username = getUsername();
            if (username != '') {
                setUser(username);
                const userAmount = await getFeinBucks(username)
                setUserFeinBucks(userAmount.fein_bucks)
                const result = await getInvestments(username);
                console.log(result);
                setInvestments(result.result)
                let sum = 0;
                result.result.forEach(stock => {
                    sum += parseFloat(stock.current_value) - (stock._doc.totalSpent).toFixed(2)
                });
                setNetGain(sum)
            }
        }
        fetchData();
    }, [])

    const handleClick = () => {
        setShowAddFundsForms(true);
    }

    if (!user) {
        return (
            <div className={`transition-all ease-in-out ${darkMode ? "profile_page_dark" : "profile_page"}`}>
                <Navbar user={user} signout={() => signout().then(setUser(''))} />
                <div className="flex flex-row justify-center">
                    <h1 className={`${darkMode ? "text-black" : "text-black"} font-bold text-xl absolute top-64`}>Please sign in or sign up to view this page.</h1>
                </div>
            </div>
        );
    }

    return (
        <div className={`transition-all ease-in-out ${darkMode ? "profile_page_dark" : "profile_page"}`}>
            {showAddFundsform ? (
                <AddFundForm user={user} setUserFeinBucks={setUserFeinBucks} text={"How much Fein Bucks would you like to add?"} setShowAddFundsForms={setShowAddFundsForms} />
            ) : (
                <div>
                    <Navbar user={user} signout={() => signout().then('')} />
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
                                    <h1 className="trade_information_subtitle"> Fein Bucks </h1>
                                    <h1 className="trade_information_subtitle"> Net Gain </h1>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="trade_information_subtitle"> {userFeinBucks} </h1>
                                    <h1 className="trade_information_subtitle"> {netGain} </h1>
                                </div>
                            </div>
                        </div>

                        <div className="trade_information">
                            <YourInvestments stocks={investments} />
                        </div>
                        <button className="mx-4 border-2 rounded-md w-36 p-2 font-semibold text-black border-gray-300 bg-gray-300 hover:text-white hover:bg-highlight" onClick={handleClick}>Add Funds</button>
                    </div>
                </div>
            )}

        </div>
    );
}