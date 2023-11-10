import React, {useState, useEffect} from "react";
import './ProfilePage.css';

import { Navbar } from "../../Components/Navbar/Navbar.js";
import { Footer } from "../../Components/Footer/Footer.js";
import { YourInvestments } from "./YourInvestments.js";
import banner from "../../Assets/banner.jpeg";

const MockStocks = [
    {
        id: 1, 
        name: "Apple Inc.",
        ticker: "AAPL",
        quantity: 10,
        price: 130.21,
        change: 0.12,
        changePercent: 0.09,
        volume: 100000,
        avgVolume: 100000,
        marketCap: 1000000000000,
        peRatio: 100,
        week52High: 100,
        week52Low: 100,
        ytdChange: 100,
        website: "https://www.apple.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1720px-Apple_logo_black.svg.png"
    }, 
    {
        id: 2, 
        name: "Tesla Inc.",
        ticker: "TSLA",
        quantity: 10,
        price: 130.21,
        change: 0.12,
        changePercent: 0.09,
        volume: 100000,
        avgVolume: 100000,
        marketCap: 1000000000000,
        peRatio: 100,
        week52High: 100,
        week52Low: 100,
        ytdChange: 100,
        website: "https://www.tesla.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png"
    },
    {
        id: 3,
        name: "Microsoft Corporation",
        ticker: "MSFT",
        quantity: 10,
        price: 130.21,
        change: 0.12,
        changePercent: 0.09,
        volume: 100000,
        avgVolume: 100000,
        marketCap: 1000000000000,
        peRatio: 100,
        week52High: 100,
        week52Low: 100,
        ytdChange: 100,
        website: "https://www.microsoft.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png"
    },
    {
        id: 4,
        name: "Facebook Inc.",
        ticker: "FB",
        quantity: 10,
        price: 130.21,
        change: 0.12,
        changePercent: 0.09,
        volume: 100000,
        avgVolume: 100000,
        marketCap: 1000000000000,
        peRatio: 100,
        week52High: 100,
        week52Low: 100,
        ytdChange: 100,
        website: "https://www.facebook.com/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png"
    }
];

export function ProfilePage() {
    return (
        <div className="flex flex-col">
            <Navbar />
            <img class="banner_image" src={banner} alt="Your Banner"></img>
            <div className="flex-grow">
                <div className="flex flex-col">
                    <h1 className="username_title"> Username </h1>
                    <h1 className="username_description"> Description </h1>
                </div>
                <div class="trade_information">
                    <YourInvestments stocks={MockStocks}/>
                </div>
                
            </div>
        </div>
    );
}