'use client'
import React from 'react';
import Link from 'next/link';
import './SignUpForm.css';
import { useRef } from 'react'
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

export function SignUpForm(props) {
    const { addUser, setMessage } = props;
    const userRef = useRef(null);
    const passRef = useRef(null);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = userRef.current.value;
        const password = passRef.current.value;
        const user = await addUser(username, password)
        user instanceof Object ? setMessage({ err: false, message: "Successfully created user" }) : setMessage({ err: true, message: user });
        formRef.current.reset();
    }

    return (
        <form id='login-form' onSubmit={handleSubmit} ref={formRef} >
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

