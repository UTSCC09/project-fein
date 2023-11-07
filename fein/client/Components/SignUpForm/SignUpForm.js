import React from 'react';
import { Link, Route } from 'react-router-dom'
import './SignUpForm.css';
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

export function SignUpForm() {
    return (
        <form id='login-form'>
            <div className='form-header'>Lets Get Investing</div>
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
            <button type="submit" className="btn">Sign Up</button>
            <div className='form-footer'>Have an account? Log in <Link id='login-link' to='/login'>here</Link></div>
        </form>
    );
}

