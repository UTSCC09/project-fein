import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results }) => {
    const navigate = useNavigate();
    const handleClick = (ticker) => {
        navigate(`/trading/stock/`);
        // ${stock.ticker}
    }
    return(
        <ul onClick={handleClick} className="absolute border-gray-300 border-2 w-full rounded-md w-1/5 max-h-40 overflow-y-scroll bg-white border-neutral-200 mt-16">
            {results.map((result) => (
                <li key={result.ticker}  className="m-2 flex items-center hover:bg-gray-300 cursor-pointer justify-between text-black">
                    <span>{result.name}</span>
                    <span>{result.ticker}</span>
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;