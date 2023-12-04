'use client'

import React, { useState } from "react";
import Link from 'next/link';
import './SellStocksForm.css';
import { useRef } from 'react'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import { sellStock } from '../../../api/api.mjs'

export function SellStocksForm(props) {
    const { user, setShowSellStocksForm } = props;
    const [message, setMessage] = useState({});
    const symbolRef = useRef(null)
    const amountRef = useRef(null);
    const formRef = useRef(null);
    //const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const symbol = (symbolRef.current.value).toUpperCase();
        const amount = amountRef.current.value;
        if (!isNaN(amount)) {
            const data = await sellStock(user, symbol, amount);
            console.log(data);
            if (data instanceof Object) {
                setMessage({ err: false });
                setShowSellStocksForm(false)
            } else {
                setMessage({ err: true, message: data });
            }
        } else {
            setMessage({ err: true, message: "Amount must be a number" });
        }

        formRef.current.reset();
    }

    return (
        <form id='login-form' onSubmit={handleSubmit} ref={formRef}>
            <div className='form-header'>Selling Stocks</div>
            <input
                type="text"
                id="post-username"
                className="form-element"
                name="symbol"
                ref={symbolRef}
                placeholder="Enter symbol"
                required
            />
            <input
                type="text"
                id="post-username"
                className="form-element"
                name="amount"
                ref={amountRef}
                placeholder="Enter amount"
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

