import "./Homepage.css"

import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

// Component imports

import { Navbar } from "../../Components/Navbar/Navbar.js";


export function HomePage() {
    return (
        <div className="basic_background">
            <Navbar />
            <div className="flex-column">
                <h1 class="w-full text-3xl font-bold text-white text-center mt-8"> Welcome to FEIN </h1>
            </div>
            


            
        </div>
    );
} 
