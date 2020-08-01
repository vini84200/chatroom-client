import React from 'react';

interface Props {
    message: string,
    username: string
}

function Message(props: Props) {
    return (
        <div className="py-2">
            <strong className="pr-4">{props.username}: </strong> {props.message}
        </div>
    );
};

export default Message;