import React, { useRef, useEffect, useReducer } from 'react';
import socketIOClient from "socket.io-client";
import Message from '../../molecules/Message';

interface Message {
    message: string,
    username: string
}

function Messages () {

    const [messages, dispacthMessages] = useReducer(
        function (state: Array<Message>, action) {
            switch (action.type) {
                case "newMessage":
                    return [
                        ...state,
                        action.payload
                    ]
                default:
                    return state
            }
        }, []
    )
    

    const connection = useRef(socketIOClient.connect("localhost:8000"))

    useEffect(() => { // Disconects the socket on end.
        return () => {connection.current.disconnect()}
    }, [connection])

    useEffect(() => {
        connection.current.on("message:back", (msgs: Message[]) => {
            msgs.forEach(msg => dispacthMessages({type: "newMessage", payload: msg}))
        })
    }, [connection])

    return (
        <div className="bg-blue-500 flex-1">
            <h1>Messages</h1>
            <div>
                {messages.map((msg: Message, index) => (<Message key={index} username={msg.username} message={msg.message} />))}
            </div>
        </div>
    );
};

export default Messages;