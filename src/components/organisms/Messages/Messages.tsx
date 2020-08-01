import React, { useEffect, useReducer } from 'react';
import Message from '../../molecules/Message';
import * as consts from '../../../consts'
import { useSocket } from '../../../services/useSocket';

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
                case "clear":
                    return []
                default:
                    return state
            }
        }, []
    )
    
    // Creates the connection and configures it

    const connection = useSocket()

    useEffect(() => { // Disconects the socket on end.
        return () => {
            connection.disconnect()
        }
    }, [connection])


    // Recieves on the event of the messages
    useEffect(() => {
        let mounted = true;
        connection.on(consts.ALL_MESSEGES, 
            function (msgs: Message[]) {
                if (!mounted) return
                dispacthMessages({type: "clear"})
                msgs.forEach(msg => dispacthMessages({type: "newMessage", payload: msg}))
            })
        return () => {mounted = false}
    }, [connection])

    useEffect(() => {
        let mounted = true;
        connection.on(consts.RESEND_MESSAGE, 
            function (msg: Message) {
                if (!mounted) return
                dispacthMessages({type: "newMessage", payload: msg})
            })
        return () => {mounted = false}
    }, [connection])

    return (
        <div className="flex-1">
            <h1>Messages</h1>
            <div>
                {messages.map(
                    (msg: Message, index) => (
                        <Message key={index} username={msg.username} message={msg.message} />
                    )
                )}
            </div>
        </div>
    );
};

export default Messages;