'use client'

import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { HomeIcon, MagnifyingGlassIcon, UserIcon, Cog6ToothIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { BasicMenu } from './BasicMenu';
import SearchBar from '../Common/SearchBar';
import { useThemeContext } from '../../Context/ThemeContext';

import Link from 'next/link';

import FormControlLabel from '@mui/material/FormControlLabel';
import { MaterialUISwitch } from './MaterialUISwitch';
import { getUsername } from '../../../api/api.mjs'

export function Navbar(props) {

    const { user, signout } = props;

    //const [user, setUser] = useState(null);
    const { darkMode, toggleDarkMode } = useThemeContext();

    // useEffect(() => {
    //     const userName = getUsername();
    //     setUser(userName);
    // }, []);

    return (
        <nav className="flex bg-navbar sticky top-0 z-50">
            <Link href="/" className="nav_logo"> FEIN </Link>

            {user ? (
                <>
                    <div className="flex px-4 py-2 w-full justify-start text">
                        <SearchBar nav={true} />
                    </div>
                    <div className="flex px-4 py-2 w-full justify-end">
                        <Link href="/trading" className="navbar_trading"> Trade Now </Link>
                        <div className="self-center">
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }} name="darkMode" checked={darkMode} onChange={toggleDarkMode} />}
                                label=""
                            />
                        </div>
                        <Link href="/" className="navbar_element">
                            <HomeIcon className="navbar_icon" />
                        </Link>
                        <Link href="/profile" className="navbar_element"><UserIcon className="navbar_icon" /></Link>
                        <BasicMenu signout={signout} />
                    </div>
                </>

            ) : (
                <div className="flex px-4 py-2 w-full justify-end">
                    <Link href="/login" className="sign"> Signin </Link>
                    <Link href="/signup" className="sign"> Signup </Link>
                </div>
            )}
        </nav>
    );
}

