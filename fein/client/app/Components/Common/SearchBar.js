'use client'

import React, { useState } from 'react';
import './SearchBar.css'
import { MockStocks } from '../../MockData/MockStocks'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SearchResults from './SearchResults';
import { searchStocks } from '../../../api/api.mjs';

const SearchBar = (nav) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const clear = () => {
        setInput('');
        setResults([]);
    };

    const sendSearch = async (e) => {
        updateResults();
    }

    const updateResults = async () => {
        try {
            if(input) {
                console.log("input: " + input);
                const searchResults = await searchStocks(input);
            
                const result = searchResults.result;
                setResults(result);
            }
        } catch(error) {
            setResults([]);
            console.log(error);
        }
    };

    return (
        <>
            <input 
                type="text" value={input} 
                className="search_bar"
                placeholder='Search for a stock...'
                onChange={(event) => {setInput(event.target.value)}}
                onKeyDown={(event) => {
                    if(event.key === 'Enter') {
                        updateResults()}
                    }
                }
            />
            <button
                onClick={updateResults}
            >
                {
                    (nav) ? (
                        <div className="navbar_element"><MagnifyingGlassIcon className="search_icon_nav" /></div>
                    ) : (
                        <div className="navbar_element"><MagnifyingGlassIcon className="search_icon" /></div>
                    )
                }
            </button>
            {input && results && results.length > 0 ?  <SearchResults results={results}/> : null}
        </>
    );
}

export default SearchBar;