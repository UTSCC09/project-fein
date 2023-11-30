'use client'

import React, { useState, useEffect, useContext } from "react";
import './StockItem.css';
import { useThemeContext } from "../../Context/ThemeContext";
import Link from 'next/link';

import { useStockContext } from "../../Context/StockContext";
import { supportedStocks, companyCandle, companyPrice, companyProfile } from '../../../api/api.mjs';

import Image from 'next/image';


export function StockItem(props) {
    const { stock, setMessage } = props;
    const { darkMode, setDarkMode } = useThemeContext();
    const { stockSymbol, setStockSymbol } = useStockContext();
    const [stockDetails, setStockDetails] = useState({});

    useEffect(() => {
        const updateStockDetails = async () => {
            const result = await companyProfile(stock.symbol);
            //console.log(result);
            if (result instanceof Object) {
                setStockDetails(result);
                setMessage({ err: false })
            } else {
                setStockDetails({});
                let output = result.replace(/[{}"]/g, '')
                setMessage({ err: true, message: output })
            }
        };
        updateStockDetails();
    }, []);

    async function handleClick() {
        await setStockSymbol(stock.symbol);
    }

    return (

        <Link className={darkMode ? "stock_item_dark" : "stock_item"} onClick={() => handleClick()} href={`trading/stock/${stock.symbol}`}>
            <Image className="w-12" width={12} height={12} src={stockDetails.logo} alt="Stock Image" />
            <div className="px-2 mx-8">{stock.symbol}</div>
            <div className="px-2">{stock.currency}</div>
        </Link>
    );
}