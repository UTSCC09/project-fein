import React, {useState, useEffect} from 'react';
import './Hero.css';

export function Hero() {
    return(
        <div>
            <div className="hero">
                <div className="hero_text">
                    <h1 className="hero_title">Investing made easy.</h1>
                    <p className="hero_subtitle">Fein is a free, easy-to-use stock trading platform.</p>
                </div>
            </div>
        </div>
    );
}