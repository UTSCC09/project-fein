'use client'

import React from 'react';
import Link from 'next/link';
import './LoginForm.css';
import { useRef } from 'react'
import { useRouter } from "next/navigation"
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

export function LoginForm(props) {
    const { signin, setMessage } = props;
    const userRef = useRef(null);
    const passRef = useRef(null);
    const formRef = useRef(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = userRef.current.value;
        const password = passRef.current.value;
        const user = await signin(username, password)
        if (user instanceof Object) {
            setMessage({ err: false });
            router.replace("/");
        } else {
            setMessage({ err: true, message: user });
        }
        formRef.current.reset();
    }

    return (
        <form id='login-form' onSubmit={handleSubmit} ref={formRef}>
            <div className='form-header'>Hello Again</div>
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
            <button type="submit" className="btn">Login</button>
            <div className='form-footer'>No account? Make one <Link id='signup-link' href='/signup'>here</Link> </div>
        </form>

    );
}

