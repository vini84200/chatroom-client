import React from 'react';

interface Props {
    username: string
}

function BottomBar(props: Props) {
    return (
        <div>
        <h1>Username: {props.username}</h1>
            
        </div>
    );
};

export default BottomBar;