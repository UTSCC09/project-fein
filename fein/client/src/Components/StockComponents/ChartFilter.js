import React from 'react';

const ChartFilter = ({ text, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-12 m-2 h-8 border-1 rounded-md flex flex-row items-center justify-center cursor-pointer ${
                active ? 'bg-black border-black-100 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
            {text}
        </button>
    );
}

export default ChartFilter;