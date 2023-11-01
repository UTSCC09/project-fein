import React from 'react';
import './Navbar.css';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
 
export function Navbar() {
    return (
        <nav className="flex bg-navbar sticky top-0">
            <h1 class="nav_logo"> FEIN </h1>
            <div className="flex px-4 py-6 w-full justify-start">
                <div class="navbar_element"><MagnifyingGlassIcon class="h-6 w-6 text-white" /></div>
                <input class="search_bar" type="text" placeholder="Search" />
            </div>
            <div className="flex px-4 py-6 w-full justify-end">
                <div class="navbar_element"><HomeIcon class="h-6 w-6 text-white" /></div>
                <div class="navbar_element">About</div>
                <div class="navbar_element">Contact</div>
            </div>
        </nav>
    );
}

