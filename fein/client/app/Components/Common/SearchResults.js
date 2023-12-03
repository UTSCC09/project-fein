
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SearchResults = ({ results }) => {
    const router = useRouter();
    
    return(

        <ul className="absolute top-0.5 left-32 border-gray-300 border-2 rounded-md w-1/5 max-h-40 overflow-y-scroll bg-white border-neutral-200 mt-16">
            {results.map((result) => (
                <li key={result.symbol} onClick={() => router.push(`/trading/stock/${result.symbol}`) } className="m-2 flex items-center hover:bg-gray-300 cursor-pointer justify-between text-black">
                    <span>{result.description}</span>
                    <span>{result.symbol}</span>
                </li>
            ))}
        </ul>

    );
};

export default SearchResults;