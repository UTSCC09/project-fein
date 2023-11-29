'use client'

import React, { useState, useEffect } from 'react';
import './StockPage.css';

import { Navbar } from "../../Components/Navbar/Navbar.js";
import { useParams } from 'react-router-dom';
import SearchBar from '../../Components/Common/SearchBar.js';
import Dashboard from '../../Components/StockComponents/Dashboard.js';
import { signout, getUsername } from '../../api/api.mjs'
import { useThemeContext } from '../../Context/ThemeContext.js';

export default function StockPage() {

    const { id } = useParams();

    const { darkMode } = useThemeContext();

    const [user, setUser] = useState('');
    useEffect(() => {
        const username = getUsername();
        setUser(username);
    }, [user])

    return(
        <div className={darkMode ? "stock_dark" : "stock"}>
            <Navbar user={user} signout={() => signout().then(setUser)} />
            <Dashboard />
        </div>
    );
}