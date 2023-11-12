'use client'

import React, {useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { HomeIcon, MagnifyingGlassIcon, UserIcon, Cog6ToothIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { BasicMenu } from './BasicMenu';
import SearchBar from '../Common/SearchBar';
import { useThemeContext } from '../../Context/ThemeContext';

import Link from 'next/link';

import FormControlLabel from '@mui/material/FormControlLabel';
import { MaterialUISwitch } from './MaterialUISwitch';


export function Navbar() {

    const [user, setUser] = useState(null);
    const {darkMode, toggleDarkMode} = useThemeContext();


    return (
        <nav className="flex bg-navbar sticky top-0 z-50">
            <Link href="/" class="nav_logo"> FEIN </Link>
            <div className="flex px-4 py-2 w-full justify-start text">
                <SearchBar nav={true}/>
            </div>
            { !user ? (
                <div className="flex px-4 py-2 w-full justify-end">
                    <Link href="/trading" class="navbar_trading"> Trade </Link>
                    <div className="self-center">
                        <FormControlLabel
                            control={<MaterialUISwitch sx={{ m: 1 }} name="darkMode" checked={darkMode} onChange={toggleDarkMode}/>}
                            label=""
                        />
                    </div>
                    <Link href="/" class="navbar_element">
                        <HomeIcon className="navbar_icon" />
                    </Link>
                    <Link href="/profile" class="navbar_element"><UserIcon className="navbar_icon"/></Link>
                    <BasicMenu/>
                </div>
            ) : (
                <div className="flex px-4 py-2 w-full justify-end">
                    <div className="sign"> Signin </div>
                    <div class="sign"> Signup </div>
                </div>
            )}
        </nav>
    );
}

