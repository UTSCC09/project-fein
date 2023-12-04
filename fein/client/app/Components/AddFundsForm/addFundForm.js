'use client'

import React, { useState } from "react";
import Link from 'next/link';
import './addFundForm.css';
import { useRef } from 'react'
import { useRouter } from "next/navigation"
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import { addFunds } from '../../../api/api.mjs'

export function AddFundForm(props) {
    const { user, setUserFeinBucks, text, setShowAddFundsForms } = props;
    const [message, setMessage] = useState({});
    const amountRef = useRef(null);
    const formRef = useRef(null);
    //const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amount = amountRef.current.value;
        if (!isNaN(amount)) {
            const data = await addFunds(user, parseFloat(amount) + 1);
            console.log(data);
            if (data instanceof Object) {
                setMessage({ err: false });
                setUserFeinBucks(data.fein_bucks)
                if ('setShowAddFundsForms' in props) {
                    setShowAddFundsForms(false);
                }
            } else {
                setMessage({ err: true, message: data });
            }
        } else {
            setMessage({ err: true, message: "Enter a number" });
        }

        // const username = userRef.current.value;
        // const password = passRef.current.value;
        // const user = await signin(username, password)
        // if (user instanceof Object) {
        //     setMessage({ err: false });
        //     router.replace("/");
        // } else {
        //     setMessage({ err: true, message: user });
        // }
        formRef.current.reset();
    }

    return (
        <form id='login-form' onSubmit={handleSubmit} ref={formRef}>
            <div className='form-header'>{text}</div>
            <input
                type="text"
                id="post-username"
                className="form-element"
                name="username"
                ref={amountRef}
                required
            />

            <button type="submit" className="btn">Enter</button>
            {message.err ? (
                <div className="error_box">
                    {message.message}
                </div>
            ) : (<></>)}
        </form>
    );
}

