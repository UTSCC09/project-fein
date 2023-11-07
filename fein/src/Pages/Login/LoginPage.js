import "./LoginPage.css"

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UilReact from "@iconscout/react-unicons/icons/uil-react";

// Component imports

import { LoginForm } from "../../Components/LoginForm/LoginForm.js";


export function LoginPage() {
    return (
        <div className="basic_background">
            <LoginForm />
        </div>
    );
} 
