'use client'

import "./SignUpPage.css"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { addUser } from '../../api/api.mjs'


// Component imports

import { SignUpForm } from "../Components/SignUpForm/SignUpForm";


export default function SignUpPage() {
    const [message, setMessage] = useState({});
    const toastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
    };
    useEffect(() => {
        if ("err" in message && message.err) {
            toast.error(message.message, toastOptions)
        } else if ("err" in message && !message.err) {
            toast.success(message.message, toastOptions)
        }
    }, [message])

    return (
        <div className="bg-fein">
            <h1 className="fein_logo"> <Link href="/"> FEIN </Link> </h1>
            <div className="basic_background">
                <SignUpForm addUser={(username, password) => addUser(username, password)} setMessage={setMessage} />
            </div>
            {Object.keys.length != 0 ? (
                <ToastContainer />
            ) : (
                <p></p>
            )}
        </div>

    );
} 
