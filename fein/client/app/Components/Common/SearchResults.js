'use client'

import React from 'react';
import Link from 'next/link';

const SearchResults = ({ results }) => {
    return(
        <Link href={`/trading/stock/`}>
            <ul className="absolute top-0.5 left-32 border-gray-300 border-2 w-full rounded-md w-1/5 max-h-40 overflow-y-scroll bg-white border-neutral-200 mt-16">
                {results.map((result) => (
                    <li key={result.ticker}  className="m-2 flex items-center hover:bg-gray-300 cursor-pointer justify-between text-black">
                        <span>{result.name}</span>
                        <span>{result.ticker}</span>
                    </li>
                ))}
            </ul>
        </Link>
    );
};

export default SearchResults;