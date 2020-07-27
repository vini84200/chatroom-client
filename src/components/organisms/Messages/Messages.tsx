import React, { useRef, useEffect, useReducer } from 'react';
import socketIOClient from "socket.io-client";
import Message from '../../molecules/Message';
import * as consts from '../../../consts'

interface Message {
    message: string,
    username: string
}

function Messages () {

    // State for all the messages

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
    
    // Creates the connection and configures it

    const connection = useRef(socketIOClient.connect(consts.CONNECTION_STRING))

    useEffect(() => { // Disconects the socket on end.
        return () => {
            console.log("disconeting...")
            connection.current.disconnect()
            console.log("disconeted")
        }
    }, [connection])


    // Recieves on the event of the messages
    useEffect(() => {
        connection.current.on(consts.ALL_MESSEGES, 
            function (msgs: Message[]) {
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