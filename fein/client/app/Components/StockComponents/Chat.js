'use client'

import React from 'react';
import { useParams } from 'next/navigation';

export default function Chat(props) {
    const params = useParams();
    return (
        <div className="mr-20 w-1/5 h-screen flex">
            <div className="justify-self-center self-center rounded-3xl px-4 py-6 bg-navbar max-h-2/3 w-full flex flex-col">
                <h1 className="py-4 px-8 text-white justify-self-center self-center">{params.symbol + " "}Chat</h1>
                <div className="">
                    <div className=" bg-gray-300 text-black flex flex-col h-80 max-h-96 overflow-y-scroll">
                        
                        <div className="flex">
                            <p className="self-center p-2">User</p>
                            <p className="p-3">Test Test Test TestTest Test Test Test Test TestTest Test </p>
                        </div>

                    </div>
                    <input className="bg-gray-300 text-black w-full p-2" type="text" placeholder="Enter message..."></input>
                </div>
            </div>

        </div>
    );
}