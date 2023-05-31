import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import PlayerApp from './player/PlayerApp';
import HostApp from './host/HostApp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IPlayer from '../../back-end/interfaces/IPlayer';
import Button from '@mui/material/Button';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlayerApp socket={socket} />} />
          <Route path="/host" element={<HostApp socket={socket} />} />
        </Routes>
      </BrowserRouter>
      <Button onClick={() => socket.emit("delete-please")}>Clear Data</Button>
    </>
  );
}
