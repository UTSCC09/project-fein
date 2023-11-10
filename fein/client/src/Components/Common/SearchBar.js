import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css'
import { MockStocks } from '../../MockData/MockStocks'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchResults from './SearchResults';

const SearchBar = (nav) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState(MockStocks.result);
    const [showResults, setShowResults] = useState(false)
    const inputRef = useRef(null);

    const clear = () => {
        setInput('');
        setResults([]);
    };
    const updateResults = () => {
        setResults(MockStocks.result)
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            clear();
            setShowResults(false);
        }
      };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
    
        <>
            <input 
                type="text" value={input} 
                class="search_bar"
                placeholder='Search for a stock...'
                onChange={(event) => setInput(event.target.value)}
            />
            <button
                onClick={updateResults}
            >
                {
                    (nav) ? (
                        <div class="navbar_element"><MagnifyingGlassIcon class="search_icon_nav" /></div>
                    ) : (
                        <div class="navbar_element"><MagnifyingGlassIcon class="search_icon" /></div>
                    )
                }
            </button>
            {input && results.length > 0 ? <SearchResults results={results}/> : null}

            
        </>


    );
}

export default SearchBar;