'use client'
import React from 'react';
import Link from 'next/link';
import './SignUpForm.css';
import { useRef } from 'react'
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

export function SignUpForm(props) {
    const { addUser } = props;
    const userRef = useRef(null);
    const passRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = userRef.current.value;
        const password = passRef.current.value;
        const x = await addUser(username, password)
        console.log(x);
    }

    return (
        <form id='login-form' onSubmit={handleSubmit}>
            <div className='form-header'>Lets Get Investing</div>
            <input
                type="text"
                id="post-username"
                className="form-element"
                placeholder="Username"
                name="username"
                ref={userRef}
                required
            />
            <input
                type="password"
                id="post-password"
                className="form-element"
                placeholder="Password"
                name="password"
                ref={passRef}
                required
            />
            <button type="submit" className="btn">Sign Up</button>
            <div className='form-footer'>Have an account? Log in <Link id='login-link' href='/login'>here</Link></div>
        </form>
    );
}

