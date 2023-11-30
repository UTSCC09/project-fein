'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';

export default function Chat(props) {
    const params = useParams();

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const socket = io();

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => { 
        socket.emit('message', currentMessage);
        setCurrentMessage('');
    }

    return (
        <div className="mr-20 w-1/5 h-screen flex">
            <div className="justify-self-center self-center rounded-3xl px-4 py-6 bg-navbar max-h-2/3 w-full flex flex-col">
                <h1 className="py-4 px-8 text-white justify-self-center self-center">{params.symbol + " "}Chat</h1>
                <div className="">
                    <div className=" bg-gray-300 text-black flex flex-col h-80 max-h-96 overflow-y-scroll">
                        <div className="flex">
                            {messages.map((message, index) => (
                                <p key={index}>{message}</p>
                            ))}
                        </div>
                    </div>
                    <div className="flex">
                        <input 
                            className="bg-gray-300 text-black w-full p-2" 
                            type="text" 
                            placeholder="Enter message..." 
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <button className="p-2 bg-gray-300 text-black" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}