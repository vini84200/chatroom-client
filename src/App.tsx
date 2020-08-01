import React, { useState } from 'react';
import './index.css'

import Messages from './components/organisms/Messages'
import BottomBar from './components/organisms/BottomBar'
import { ProvideUser } from './services/useUsername';

function App() {
  return (
    <ProvideUser>
    <div className="flex flex-col bg-gray-100 h-screen">
      <h1 className="bg-blue-600 text-gray-200 font-bold text-xl text-center p-2">Chat</h1>
      <Messages />
      <BottomBar />
    </div>
    </ProvideUser>
  );
}

export default App;
