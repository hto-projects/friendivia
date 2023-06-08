import * as React from 'react';
import '../style.css';
import { Button } from '@mui/material';
import { Socket } from 'socket.io-client';

interface ILobbyViewProps {
  playerNames: string[],
  gameId: number,
  socket: Socket
}

export default function LobbyView(props: ILobbyViewProps) {
  const { playerNames, gameId, socket } = props;

  async function onStart() {
    socket.emit('host-start', gameId);
  }

  return (
    <>
      <p>Game ID: {gameId}</p>
      <p>These players have joined the game:</p>
      <ul>
        {playerNames.map((name: String) => (
          <li>{name}</li>
        ))}
      </ul>
      <Button onClick={onStart}>Start</Button>
    </>
  );
}
