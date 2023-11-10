import React, {useState, useEffect} from 'react';
import './StockPage.css';

import { Navbar } from "../../Components/Navbar/Navbar.js";
import { useParams } from 'react-router-dom';


export function StockPage() {

    const { id } = useParams();

    return(
        <div className="flex flex-col">
            <Navbar />
        </div>
    );
}