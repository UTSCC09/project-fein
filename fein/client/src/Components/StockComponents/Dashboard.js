import React, { useContext } from 'react';
import Details from './Details';
import Overview from './Overview';
import Chart from './Chart';
import ThemeContext from '../../Context/ThemeContext';

import { MockStocks, mockCompanyDetails } from '../../MockData/MockStocks';


const child = {
    title: 'Stocks',
    subtitle: 'Search for a stock to get started',
}

const Dashboard = () => {
    const { darkMode } = useContext(ThemeContext);
    return (
        <div className={`transition-all ease-in-out h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-8 ${
            darkMode ? "bg-darkMode text-gray-300" : "bg-white text-black"}`}>
            <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex">
                <h1 className="text-5xl self-center">{MockStocks.result[0].name}</h1>
            </div>
            <div className="md:col-span-2 row-span-4">
                <Chart/>
            </div>
            <div>
                <Overview 
                    symbol={MockStocks.result[0].ticker} 
                    price={MockStocks.result[0].price}
                    change={MockStocks.result[0].change}  
                    changePercent={MockStocks.result[0].changePercent}
                    currency={MockStocks.result[0].currency}
                />
            </div>
            <div className="row-span-2 xl:row-span-3">
                <Details details={mockCompanyDetails[0]}/>
            </div>
            <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex">
                <div className="h-1/3 self-center justify-center w-full flex">
                    <p className="self-center justify_self-center mx-4">Amount:</p>
                    
                    <input 
                        type="number" 
                        name="quantity"
                        min="1" 
                        step="1"
                        className="border-2 rounded-md w-1/4 p-2 border-gray-300 w-1/4 text-black"
                    />
                    <button className="mx-4 border-2 rounded-md w-36 p-2 font-semibold text-black border-gray-300 bg-gray-300 hover:text-white hover:bg-highlight">Buy</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;