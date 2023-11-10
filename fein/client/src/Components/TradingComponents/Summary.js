import React, {useState, useEffect} from 'react';
import './Summary.css';

import { YourStocks } from './YourStocks';
import { MockStocks } from '../../MockData/MockStocks'

export function Summary() {
    return (
        <div class="summary_container">
            <div className="flex flex-row ">
                <h1 class="summary_header"> Summary </h1>
            </div>
            <div className="flex flex-row">
                <YourStocks stocks={MockStocks.result}/>
                <div className="flex flex-col space-y-32">
                    <div class="your_portfolio"> Highest Profit: </div>
                    <div class="your_portfolio"> Highest Loss: </div>
                    <div class="your_portfolio"> Favorite Stock: </div>
                </div>
            </div>
        </div>
    )


}
