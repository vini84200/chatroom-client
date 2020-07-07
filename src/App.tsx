import React, { useState } from 'react';
import './index.css'

import Messages from './components/organisms/Messages'
import BottomBar from './components/organisms/BottomBar'

const initialUsername = "anonimo"

function App() {
  const [username, setUsername] = useState(initialUsername)
  return (
    <div className="bg-gray-100 min-h-screen">
      <Messages />
      <BottomBar username={username} />
    </div>
  );
}

export default App;
