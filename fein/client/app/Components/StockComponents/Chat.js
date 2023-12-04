'use client'

import React, { useEffect, useState, useRef, use } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';
import { getUsername } from '../../../api/api.mjs'


export default function Chat() {
    const params = useParams();
    const userName = getUsername();
    const roomId = params.symbol;
    const scrollableDiv = useRef(null);

    var socket = io.connect('http://localhost:3001');

    const scrollToBottom = () => {
        if(scrollableDiv.current) {
            const { scrollHeight, clientHeight } = scrollableDiv.current;
            scrollableDiv.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    useEffect(() => {
        const handleJoin = () => {
            if (userName !== "" && roomId !== "") {
                console.log(userName, "userName", roomId, "roomId");
                socket.emit("join-room", roomId);
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

    useEffect(() => {
        const handleReceiveMessage = (message) => {
            setChat((prevChat) => [...prevChat, message]);
            scrollToBottom(); // Move scrollToBottom here
        };
        socket.on('receive-message', handleReceiveMessage);
        return function cleanup() {
            socket.off("receive-message", handleReceiveMessage);
            socket.off("join-room");
            socket.off("send-message");
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    return (
        <div className="mr-20 w-1/5 h-screen flex">
            <div className="justify-self-center self-center rounded-3xl px-4 py-6 bg-navbar max-h-2/3 w-full flex flex-col">
                <h1 className="py-4 px-8 text-white font-bold text-lg justify-self-center self-center">{params.symbol + " "}Chat</h1>
                <div className="">
                    <div ref={scrollableDiv} className=" bg-gray-300 text-black flex flex-col h-80 max-h-96 overflow-y-scroll">

                        {chat.map(( {roomID, user, message }, index) => (
                            <div key={index}>
                                {user === getUsername() ? (
                                    <p className="text-green-700">{user + "(You): " + message}</p>
                                ) : (
                                    <p className="text-black">{user + ": " + message}</p>
                                )
                                }
                            </div>
                        ))}

                    </div>

                    <form className="flex" onSubmit={(e) => sendData(e)}>
                        <input 
                            className="bg-gray-300 text-black w-full p-2" 
                            type="text" 
                            placeholder="Enter message..." 
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <button type="submit" className="p-2 bg-gray-300 text-black">Send</button>
                    </form>

                </div>
            </div>
        </div>
    );
}