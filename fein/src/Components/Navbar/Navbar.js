import React from 'react';
import './Navbar.css';
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
 
export function Navbar() {
    return (
        <nav className="flex bg-navbar sticky top-0">
            <h1 class="nav_logo"> FEIN </h1>
            <div className="flex px-4 py-2 w-full justify-start text">
                <div class="navbar_element"><MagnifyingGlassIcon class="h-6 w-6 text-white" /></div>
                <input class="search_bar" type="text" placeholder="Search" />
            </div>
            <div className="flex px-4 py-2 w-full justify-end">
                <div class="navbar_element"><HomeIcon className="h-7 w-7 text-white" /></div>
                <div class="navbar_element"><UserIcon className="h-7 w-7 text-white"/></div>

            </div>
        </nav>
    );
}

