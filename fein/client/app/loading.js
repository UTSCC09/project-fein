'use client';

import React, { useState, useEffect } from 'react';
import { Spinner } from './Components/Common/Spinner.js';
import { Navbar } from './Components/Navbar/Navbar.js';

import { signout, getUsername } from '../api/api.mjs'


export default function Loading() {

    const [user, setUser] = useState('true');

    useEffect(() => {
        const username = getUsername();
        setUser(username);
    }, [user])

    return (
        <div>
            <Navbar user={user} signout={() => signout().then(setUser)} />
            <div className="flex flex-col h-screen w-screen items-center justify-center">
                <Spinner />
            </div>
        </div>

    );
}