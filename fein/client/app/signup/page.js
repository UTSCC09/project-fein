'use client'

import "./SignUpPage.css"
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { addUser } from '../../api/api.mjs'


// Component imports

import { SignUpForm } from "../Components/SignUpForm/SignUpForm";


export default function SignUpPage() {
    const [message, setMessage] = useState("");
    return (
        <div className="bg-fein">
            <h1 className="fein_logo"> <Link href="/"> FEIN </Link> </h1>
            <div className="basic_background">
                <SignUpForm addUser={(username, password) => addUser(username, password)} setMessage={setMessage} />
            </div>
            {message ? (
                <p>{message}</p>
            ) : (
                <p></p>
            )}
        </div>

    );
} 
