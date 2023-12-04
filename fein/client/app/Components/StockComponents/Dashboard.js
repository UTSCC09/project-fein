'use client'

import React, { useEffect, useState } from 'react';
import Details from './Details';
import Overview from './Overview';
import Chart from './Chart';
import Chat from './Chat';
import { useThemeContext } from '../../Context/ThemeContext';
import { useRef } from 'react'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { supportedStocks, companyCandle, companyPrice, companyProfile, getUsername, getFeinBucks, buyStock } from '../../../api/api.mjs';

import { MockStocks, mockCompanyDetails } from '../../MockData/MockStocks';

import { useStockContext } from '../../Context/StockContext';

const child = {
    title: 'Stocks',
    subtitle: 'Search for a stock to get started',
}

function Dashboard(props) {
    const { symbol, setMessage } = props;
    const { darkMode } = useThemeContext();
    const amountRef = useRef(null);
    const [user, setUser] = useState('');
    const [userFeinBucks, setUserFeinBucks] = useState(-2);
    const [amount, setAmount] = useState(0);
    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = useState({});

    const toastOptions = {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
    };

    useEffect(() => {
        const fetchData = async () => {
            const username = getUsername();
            if (username != '') {
                setUser(username);
                const userAmount = await getFeinBucks(username)
                setUserFeinBucks(userAmount.fein_bucks)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const updateStockDetails = async () => {
            const result = await companyProfile(symbol);
            if (result instanceof Object) {
                setStockDetails(result);
                setMessage({ err: false })
            } else {
                setStockDetails({});
                let output = result.replace(/[{}"]/g, '')
                setMessage({ err: true, message: output })
            }
        };
        const updateStockOverview = async () => {
            const result = await companyPrice(symbol);
            if (result instanceof Object) {
                setQuote(result);
                setMessage({ err: false })
            } else {
                setQuote({});
                let output = result.replace(/[{}"]/g, '')
                setMessage({ err: true, message: output })
            }
        };
        updateStockDetails();
        updateStockOverview();
    }, [symbol]);

    const handleInputChange = (event) => {
        const inputValue = parseInt(event.target.value);
        if (!isNaN(inputValue)) {
            setAmount(inputValue);
            setMessage({ err: false });
        } else {
            setAmount(0);
            setMessage({ err: true, message: "Enter a number" })
        }
    }

    const handleClick = async () => {
        if (amount != 0) {
            const result = await buyStock(user, symbol, amount);
            console.log(result);
            if (!(result instanceof Object)) {
                setMessage({ err: true, message: result })
            } else {
                setMessage({ err: false });
                setUserFeinBucks(result.fein_bucks.toFixed(2));
                toast.success("Successfully Bought Stock", toastOptions)
            }
        } else {
            setMessage({ err: true, message: "Bad input" })
        }
    };


    return (
        <div className={`min-h-screen ${darkMode ? "bg-darkMode text-gray-300" : "bg-white text-black"}`}>
            <div className={`pl-20 pr-20 pb-20 pt-5  font-fein transition-all ease-in-out h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 ${darkMode ? "bg-darkMode text-gray-300" : "bg-white text-black"}`}>
                <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex">
                    <h1 className="text-5xl self-center">{stockDetails.name}</h1>
                </div>
                <div className="md:col-span-2 row-span-4">
                    <Chart setMessage={setMessage} stockSymbol={symbol} />
                </div>
                <div>
                    <Overview
                        symbol={symbol.symbol}
                        price={quote.pc}
                        change={quote.d}
                        changePercent={quote.dp}
                        currency={stockDetails.currency}
                    />
                </div>
                <div className="row-span-2 xl:row-span-3">
                    <Details details={stockDetails} />
                </div>
                <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex">
                    <div className="h-1/3 self-center justify-center w-full flex">
                        <p className="self-center justify_self-center mx-4">Amount:</p>

                        <input
                            type="number"
                            onChange={handleInputChange}
                            name="quantity"
                            min="1"
                            step="1"
                            className="border-2 rounded-md w-1/4 p-2 border-gray-300 w-1/4 text-black"
                            ref={amountRef}
                        />
                        <button className="mx-4 border-2 rounded-md w-36 p-2 font-semibold text-black border-gray-300 bg-gray-300 hover:text-white hover:bg-highlight" onClick={handleClick}>Buy</button>
                        <p className="self-center justify_self-center mx-4">Current Fein Bucks: {userFeinBucks} </p>
                        <p className="self-center justify_self-center mx-4">Cost: {(amount * quote.pc).toFixed(2)} </p>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;