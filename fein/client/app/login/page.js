'use client'

import "./LoginPage.css"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { signin } from '../../api/api.mjs'
// Component imports

import { LoginForm } from "../Components/LoginForm/LoginForm.js";

export default function LoginPage() {
    const [message, setMessage] = useState({});
    const toastOptions = {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
    };
    useEffect(() => {
        toast.error(message.message, toastOptions)
    }, [message])

    return (
        <div className="bg-fein">
            <Link href="/" className="fein_logo"> FEIN </Link>
            <div className="basic_background">
                <LoginForm signin={(username, password) => signin(username, password)} setMessage={setMessage} />
            </div>
            {message.err ? (
                <ToastContainer />
            ) : (<></>)}
        </div>

    );
} 
