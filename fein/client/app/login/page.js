'use client'

import "./LoginPage.css"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UilReact from "@iconscout/react-unicons/icons/uil-react";

// Component imports

import { LoginForm } from "../Components/LoginForm/LoginForm.js";

export default function LoginPage() {

    return (
        <div className="bg-fein">
            <Link href="/" class="fein_logo"> FEIN </Link>
            <div className="basic_background">
                <LoginForm />
            </div>
        </div>

    );
} 
