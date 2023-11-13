'use client'

import React, { createContext, useContext, useState } from 'react';

export const StockContext = createContext();

export default function StockContextProvider({children}) {

    const [stockSymbol, setStockSymbol] = useState('AAPL');

    return (
        <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
            {children}
        </StockContext.Provider>
    )
}

export function useStockContext() {
    const context = useContext(StockContext);
    if (!context) {
        throw new Error('useStockContext must be used within a StockContextProvider');
    }
    return context;
}

