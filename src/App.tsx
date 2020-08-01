import React, { useState } from 'react';
import './index.css'

import Messages from './components/organisms/Messages'
import BottomBar from './components/organisms/BottomBar'

const initialUsername = "anonimo"

function App() {
  const [username, setUsername] = useState(initialUsername)
  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <h1 className="bg-blue-600 text-gray-200 font-bold text-xl text-center p-2">Chat</h1>
      <Messages />
      <BottomBar username={username} />
    </div>
  );
}

export default App;
