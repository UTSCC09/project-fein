import './Slider.css';
import React, {useState, useEffect} from 'react';


export function Slider() {
    return (
        <div className="flex flex-column">
            <div className="flex flex-row">
                <div class="slider">
                    <h1 className="text-center text-2xl py-4">TRADE</h1>
                </div>
                <div class="slider">
                    <h1 className="text-center text-2xl py-4">LEARN</h1>
                </div>
            </div>
        </div>
        
    );
}