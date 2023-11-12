'use client'

import React from 'react';
import Link from 'next/link';
import './LoginForm.css';
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

export function LoginForm() {
    return (
        <form id='login-form'>
            <div className='form-header'>Hello Again</div>
            <input
                type="text"
                id="post-username"
                className="form-element"
                placeholder="Username"
                name="username"
                required
            />
            <input
                type="text"
                id="post-password"
                className="form-element"
                placeholder="Password"
                name="password"
                required
            />
            <button type="submit" className="btn">Login</button>
            <div className='form-footer'>No account? Make one <Link id='signup-link' href='/signup'>here</Link> </div>
        </form>

    );
}

