'use client'

import React from 'react';

export default function Chat(props) {
    return (
        <div className="mr-20 w-1/5 h-screen flex">
            <div className="justify-self-center self-center rounded-3xl px-4 py-6 bg-navbar max-h-2/3 w-full flex flex-col">
                <h1 className="py-4 px-8 text-white justify-self-center self-center">Chat</h1>
                <div className="rounded-sm bg-gray-300 text-black flex flex-col h-80 max-h-96 overflow-y-scroll">
                    <p className="p-3">Test</p>
                    <p className="p-3">Test</p>
                    <p className="p-3">Test</p>
                    <p className="p-3">Test</p>

                </div>
                <div>
                    <input className="rounded-sm bg-gray-200 text-black w-full" type="text" placeholder="Enter message..."></input>
                </div>
            </div>

        </div>
    );
}