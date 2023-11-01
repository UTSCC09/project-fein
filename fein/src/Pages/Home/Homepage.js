import "./Homepage.css"

import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import UilReact from "@iconscout/react-unicons/icons/uil-react";

// Component imports

import { Navbar } from "../../Components/Navbar/Navbar.js";
import { Slider } from "../../Components/Navbar/Slider/Slider.js";


export function HomePage() {
    return (
        <div className="basic_background">
            <Navbar />
            <div className="flex-column">
                <h1 class="title"> Welcome to FEIN </h1>
            </div>
            <Slider />
            
        </div>
    );
} 
