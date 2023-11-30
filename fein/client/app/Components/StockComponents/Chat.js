'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';
import { getUsername } from '../../../api/api.mjs'


export default function Chat() {
    const params = useParams();
    const userName = getUsername();

    var socket = io.connect('http://localhost:3001');

    useEffect(() => {
        const handleJoin = () => {
            if (userName !== "" && roomId !== "") {
                console.log(userName, "userName", roomId, "roomId");
                socket.emit("join_room", roomId);
            } 
        }
        handleJoin();
    }, []);

    const [currentMessage, setCurrentMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendData = async (e) => {
        e.preventDefault();
        if(currentMessage !== '') {
            const msgData = {
                roomID: params.symbol,
                user: getUsername(),
                message: currentMessage
            };
            await socket.emit('send-message', msgData);
            setCurrentMessage('');
        }
    };

    useEffect(() =>  {
        socket.on('receive-message', (message) => {
            setChat((prevChat) => [...prevChat, message]);
        });
    }, [socket]);

    return (
        <div className="mr-20 w-1/5 h-screen flex">
            <div className="justify-self-center self-center rounded-3xl px-4 py-6 bg-navbar max-h-2/3 w-full flex flex-col">
                <h1 className="py-4 px-8 text-white justify-self-center self-center">{params.symbol + " "}Chat</h1>
                <div className="">
                    <div className=" bg-gray-300 text-black flex flex-col h-80 max-h-96 overflow-y-scroll">
                        <div className="flex">
                            {chat.map(( {roomID, userName, message }, index) => (
                                <div>
                                    <p key={index}>{userName + ": " + message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form className="flex" onSubmit={(e) => sendData(e)}>
                        <input 
                            className="bg-gray-300 text-black w-full p-2" 
                            type="text" 
                            placeholder="Enter message..." 
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <button className="p-2 bg-gray-300 text-black">Send</button>
                    </form>

                </div>
            </div>
        </div>
    );
}