import React from 'react';
import './Navbar.css';

export function Navbar() {
    return (
        <nav className="flex bg-navbar sticky top-0">
            <h1 class="nav_logo"> FEIN </h1>
            <div className="flex  px-4 py-6 w-full justify-end">
                    <div class="navbar_element">Home</div>
                    <div class="navbar_element">About</div>
                    <div class="navbar_element">Contact</div>
            </div>
        </nav>
    );
}

