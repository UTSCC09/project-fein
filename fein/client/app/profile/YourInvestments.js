import React, { useState, useEffect } from "react";
import './YourInvestments.css';
import { companyPrice } from "../../api/api.mjs"



export function YourInvestments({ stocks }) {
    if (stocks.length == 0) {
        return (
            <div className="flex flex-col">
                <h1 className="investment_title"> Your stocks: </h1>
                <h1 className="investment_no_stocks"> No stocks yet, add some! </h1>
            </div>
        );
    }
    return (
        <div>
            <h1 className="investment_title"> Your Investments </h1>
            <div className="profile_stock_item">
                <h1 className="stock_name_table"> Symbol </h1>
                <h1 className="stock_quantity_table"> Shares </h1>
                <h1 className="stock_price_table"> Total Spent </h1>
                <h1 className="stock_price_table"> Current Value </h1>
                <h1 className="stock_price_table"> Net Gain </h1>
            </div>

            {stocks.map(async (stock) => (
                <div className="profile_stock_item" key={stock.symbol}>
                    <h1 className="stock_name"> {stock.symbol} </h1>
                    <h1 className="stock_quantity"> {stock.numShares} </h1>
                    <h1 className="stock_price"> {(stock.totalSpent).toFixed(2)} </h1>
                    <h1 className="stock_price"> {(stock.totalSpent).toFixed(2)} </h1>
                    <h1 className="stock_price"> 0 </h1>
                </div>
            ))}
        </div>
    );
}