import React, {useState, useEffect} from "react";
import './YourInvestments.css';



export function YourInvestments({stocks}) {
    if (!stocks) {
        return (
            <div className="flex flex-col">
                <h1 className="investment_title"> Your stocks: </h1>
                <h1 className="investment_no_stocks"> No stocks yet, add some! </h1>
            </div>
        );
    }
    return(
        <div>
            <h1 class="investment_title"> Your Investments </h1>
            <div class="profile_stock_item">
                <h1 className="stock_name_table"> Name </h1>
                <h1 className="stock_quantity_table"> Shares </h1>
                <h1 className="stock_price_table"> Price </h1>
            </div>

            {stocks.map((stock) => (
                <div className="profile_stock_item">
                    <h1 className="stock_name"> {stock.name} </h1>
                    <h1 className="stock_quantity"> {stock.quantity} </h1>
                    <h1 className="stock_price"> {stock.price} </h1>
                </div>
            ))}
        </div>
    );
}