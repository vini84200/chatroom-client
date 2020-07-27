import React from 'react';

interface Props {
    message: string,
    username: string
}

function Message(props: Props) {
    return (
        <div>
            <strong>{props.username}: </strong> {props.message}
        </div>
    );
};

export default Message;