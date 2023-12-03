'use client'

import React, {useState, useEffect, useContext, use } from 'react';
import './Hero.css';

import { CardItem } from "../Common/CardItem.js";
import { Card } from '@mui/material';
import { useThemeContext } from '../../Context/ThemeContext.js';
import { getUsername } from '../../../api/api.mjs';

const prop1 = {
    title: "Browse through thousands of stocks to start practicing your trading skills.",
    button: "Start trading now!",
    href: "/trading"
}

const prop3 = {
    title: "Browse through thousands of stocks to start practicing your trading skills.",
    button: "Create an account!",
    href: "/signup"
}

const prop2 = {
    title: "Investing made easy.",
    button: "Learn More",
    href: "/about"
}

export function Hero(props) {
    const { user } = props;

    const {darkMode, setDarkMode} = useThemeContext();
    return(
        <div>
            <div className={{darkMode} ? "hero" : "hero_dark"}>
                <div className="hero_text">
                    <h1 className="hero_title">Investing made easy. Investing made free.</h1>
                    <p className="hero_subtitle">Fein is a free, easy-to-use stock trading platform.</p>
                </div>
                <div className="flex flex-row space-x-12 justify-center">
                    {user ? <CardItem props={prop1}/> : <CardItem props={prop3}></CardItem>}
                    <CardItem props={prop2}/>
                </div>
            </div>
        </div>
    );
}