import "./SignUpPage.css"

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import { useNavigate } from "react-router-dom";

// Component imports

import { SignUpForm } from "../../Components/SignUpForm/SignUpForm";


export function SignUpPage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    }
    return (
        <div>
            <h1 onClick={handleNavigate} className="fein_logo"> FEIN </h1>
            <div className="basic_background">
                <SignUpForm />
            </div>
        </div>

    );
} 
