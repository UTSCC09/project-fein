import React from 'react';
import './Navbar.css';
import { HomeIcon, MagnifyingGlassIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export function Navbar() {
    return (
        <nav className="flex bg-navbar sticky top-0">
            <h1 class="nav_logo"> FEIN </h1>
            <div className="flex px-4 py-2 w-full justify-start text">
                <div class="navbar_element"><MagnifyingGlassIcon class="navbar_icon" /></div>
                <input class="search_bar" type="text" placeholder="Search" />
            </div>
            <div className="flex px-4 py-2 w-full justify-end">
                <div class="navbar_element"><HomeIcon className="navbar_icon" /></div>
                <div class="navbar_element"><UserIcon className="navbar_icon"/></div>
                <div class="navbar_element"><Cog6ToothIcon className="navbar_icon"/></div>
            </div>
        </nav>
    );
}

