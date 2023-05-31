import React from 'react';
import Lobby from './Lobby';
import { Socket } from 'socket.io-client';
import Start from './Start';

interface IHostProps {
  socket: Socket
}

export default function HostApp(props: IHostProps) {
  const gameIdFromStorage = Number(localStorage.getItem('game-id')) || -1;
  const [gameId, setGameId] = React.useState<number>(gameIdFromStorage);
  const [gameState, setGameState] = React.useState<string>('init');
  const { socket } = props;

  socket.emit('host-load', gameIdFromStorage);

  React.useEffect(() => {
    function onLoadSuccess(data: any) {
      setGameId(data.id);
      setGameState(data.gameState.state);
    }

    function onStartSuccess(idFromServer: number) {
      setGameId(idFromServer);
      localStorage.setItem('game-id', `${idFromServer}`);
      setGameState('lobby');
    }
  
    socket.on('host-start-success', onStartSuccess);
    socket.on('host-load-success', onLoadSuccess);

    return () => {
      socket.off('host-start-success', onStartSuccess);
      socket.off('host-load-success', onLoadSuccess);
    }
  }, [gameId, setGameId, gameState, setGameState]);

  return gameState === 'init' ? <Start socket={socket} /> : <Lobby socket={socket} gameId={gameId} />;
}
