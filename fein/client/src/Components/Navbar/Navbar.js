import React, {useState, useEffect} from 'react';
import './Navbar.css';
import { HomeIcon, MagnifyingGlassIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { BasicMenu } from './BasicMenu';

export function Navbar() {

    const [user, setUser] = useState(null);

    return (
        <nav className="flex bg-navbar sticky top-0">
            <h1 class="nav_logo"> FEIN </h1>
            <div className="flex px-4 py-2 w-full justify-start text">
                <div class="navbar_element"><MagnifyingGlassIcon class="navbar_icon" /></div>
                <input class="search_bar" type="text" placeholder="Search" />
            </div>    
            { !user ? (
                <div className="flex px-4 py-2 w-full justify-end">
                    <div class="navbar_element"><HomeIcon className="navbar_icon" /></div>
                    <div class="navbar_element"><UserIcon className="navbar_icon"/></div>
                    <div class="navbar_element"><BasicMenu/></div>
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

