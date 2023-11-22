'use client'

import React, { useState, useEffect } from 'react';
import './StockPage.css';

import { Navbar } from "../../Components/Navbar/Navbar.js";
import { useParams } from 'react-router-dom';
import SearchBar from '../../Components/Common/SearchBar.js';
import Dashboard from '../../Components/StockComponents/Dashboard.js';
import { signout, getUsername } from '../../api/api.mjs'

export default function StockPage() {

    const { id } = useParams();

    const [user, setUser] = useState('');
    useEffect(() => {
        const username = getUsername();
        setUser(username);
    }, [user])

    return(
        <div>
            <Navbar user={user} signout={() => signout().then(setUser)} />
            <Dashboard />
        </div>
    );
}