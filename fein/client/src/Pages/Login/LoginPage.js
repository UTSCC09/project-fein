import "./LoginPage.css"

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import { useNavigate } from "react-router-dom";

// Component imports

import { LoginForm } from "../../Components/LoginForm/LoginForm.js";


export function LoginPage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    }
    return (
        <div>
            <h1 onClick={handleNavigate} class="fein_logo"> FEIN </h1>
            <div className="basic_background">
                <LoginForm />
            </div>
        </div>

    );
} 
