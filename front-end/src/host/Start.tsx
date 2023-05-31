import * as React from 'react';
import '../style.css';
import { Button } from '@mui/material';
import axios from 'axios';
import { Socket } from 'socket.io-client';
axios.defaults.baseURL = 'http://localhost:4000';

interface IStartProps {
  socket: Socket
}

export default function Start(props: IStartProps) {
  const { socket } = props;

  async function onHost() {
    socket.emit('host-start');
  }

  return (
    <>
      <h1>Friendpardy</h1>
      <p>Click below to host a new game:</p>
      <Button variant="contained" onClick={onHost}>Host</Button>
    </>
  );
}
