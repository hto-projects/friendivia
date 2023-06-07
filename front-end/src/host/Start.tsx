import * as React from 'react';
import '../style.css';
import { Button } from '@mui/material';
import { Socket } from 'socket.io-client';

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
      <p>Click below to hot a new game:</p>
      <Button variant="contained" onClick={onHost}>Host</Button>
    </>
  );
}
