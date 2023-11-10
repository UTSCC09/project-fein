import React from 'react';
import Card from './Card';
import ThemeContext from '../../Context/ThemeContext';
import { useContext } from 'react';

const Overview = ({ symbol, price, change, changePercent, currency }) => {
    const { darkMode } = useContext(ThemeContext);
    return (
        <Card>
            <span className={`absolute left-4 top-4 text-lg xl:text-xl 2xl:text-2xl text-black ${darkMode ? "text-gray-300" : "text-black"}`}>{symbol}</span>
            <div className={`flex items-center justify-around w-full h-full ${darkMode ? "text-gray-300" : "text-black"}`}>
                <span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
                    {price}
                    <span className="text-lg xl:text-xl 2xl:text-2xl m-2">{currency}</span>
                </span>
                <span className={`text-lg xl:text-xl 2xl:text-2xl ${
                    change > 0 ? "text-lime-500" : "text-red-500"} ${
                        darkMode ? "text-lime-400" : "text-lime-500"}`}>
                    {change}
                    <span>({changePercent}%)</span> 
                </span>
            </div>
        </Card>
    );
}

export default Overview;