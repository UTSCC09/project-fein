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
                <div className="flex flex-row justify-center">
                    <h1 class="title"> Welcome to </h1>
                    <h1 class="title_2">Fein</h1>
                </div>
                
            </div>
            <Slider />
            
        </div>
    );
} 
