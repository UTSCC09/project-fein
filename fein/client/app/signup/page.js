'use client'

import "./SignUpPage.css"
import Link from "next/link";
import React, { useEffect, useState } from "react";


// Component imports

import { SignUpForm } from "../Components/SignUpForm/SignUpForm";


export default function SignUpPage() {
    return (
        <div className="bg-fein">
            <h1 className="fein_logo"> <Link href="/"> FEIN </Link> </h1>
            <div className="basic_background">
                <SignUpForm />
            </div>
        </div>

    );
} 
