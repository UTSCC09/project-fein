import React from 'react';
import { Spinner } from './Components/Common/Spinner.js';
import { Navbar } from './Components/Navbar/Navbar.js';


export default function Loading() {

    return (
        <div>
            <Navbar />
            <div className="flex flex-col h-screen w-screen items-center justify-center">
                <Spinner />
            </div>
        </div>

    );
}