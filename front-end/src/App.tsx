import React from 'react';
import { socket } from './socket';
import PlayerApp from './player/PlayerApp';
import HostApp from './host/HostApp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import AboutPage from './AboutPage';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlayerApp socket={socket} />} />
          <Route path="/host" element={<HostApp socket={socket} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
      {/* <p><a href="/about">About</a></p>
      <Button onClick={() => socket.emit("delete-please")}>Clear Data</Button> */}
    </>
  );
}
