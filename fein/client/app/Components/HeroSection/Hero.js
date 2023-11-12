'use client'

import React, {useState, useEffect, useContext } from 'react';
import './Hero.css';

import { CardItem } from "../Common/CardItem.js";
import { Card } from '@mui/material';
import { useThemeContext } from '../../Context/ThemeContext.js';


const prop1 = {
    title: "Browse through thousands of stocks to start practicing your trading skills.",
    button: "Start trading now!",
    href: "/trading"
}

const prop2 = {
    title: "Investing made easy.",
    button: "Learn More",
    href: "/about"
}

export function Hero() {
    const {darkMode, setDarkMode} = useThemeContext();
    return(
        <div>
            <div className={{darkMode} ? "hero" : "hero_dark"}>
                <div className="hero_text">
                    <h1 className="hero_title">Investing made easy. Investing made free.</h1>
                    <p className="hero_subtitle">Fein is a free, easy-to-use stock trading platform.</p>
                </div>
                <div className="flex flex-row space-x-12 justify-center">
                    <CardItem props={prop1}/>
                    <CardItem props={prop2}/>
                </div>
            </div>
        </div>
    );
}