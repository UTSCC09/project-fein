import "./SignUpPage.css"

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UilReact from "@iconscout/react-unicons/icons/uil-react";

// Component imports

import { SignUpForm } from "../../Components/SignUpForm/SignUpForm";


export function SignUpPage() {
    return (
        <div className="basic_background">
            <SignUpForm />
        </div>
    );
} 
