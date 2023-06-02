import React from 'react';
import Lobby from './Lobby';
import { Socket } from 'socket.io-client';
import Start from './Start';
import HostQuestionnaire from './HostQuestionnaire';

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
    socket.on('host-next', onLoadSuccess);

    return () => {
      socket.off('host-start-success', onStartSuccess);
      socket.off('host-load-success', onLoadSuccess);
      socket.off('host-next', onLoadSuccess);
    }
  }, [gameId, setGameId, gameState, setGameState]);

  function getElementForState(state: string) {
    if (state === 'lobby') {
      return <Lobby socket={socket} gameId={gameId} />;
    } else if (state === 'questionnaire') {
      return <HostQuestionnaire socket={socket} />;
    } else {
      return <Start socket={socket} />;
    }
  }

  return (
    <>
    <h1 style={{color: 'darkblue'}}>Friendpardy</h1>
      {getElementForState(gameState)}
    </>
  );
}
