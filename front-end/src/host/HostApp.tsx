import React from 'react';
import Lobby from './Lobby';
import { Socket } from 'socket.io-client';
import HostOpen from './Open';
import HostQuestionnaire from './HostQuestionnaire';
import PreQuiz from './PreQuiz';

interface IHostProps {
  socket: Socket
}

export default function HostApp(props: IHostProps) {
  const gameIdFromStorage = Number(localStorage.getItem('game-id')) || -1;
  const [gameId, setGameId] = React.useState<number>(gameIdFromStorage);
  const [gameState, setGameState] = React.useState<string>('init');
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const { socket } = props;

  if (!loaded) {
    socket.emit('host-load', gameIdFromStorage);
  }

  React.useEffect(() => {
    function onLoadSuccess(data: any) {
      setLoaded(true);
      setGameId(data.id);
      setGameState(data.gameState.state);
    }

    function onOpenSuccess(idFromServer: number) {
      setGameId(idFromServer);
      localStorage.setItem('game-id', `${idFromServer}`);
      setGameState('lobby');
    }
  
    socket.on('host-open-success', onOpenSuccess);
    socket.on('host-load-success', onLoadSuccess);
    socket.on('host-next', onLoadSuccess);

    return () => {
      socket.off('host-open-success', onOpenSuccess);
      socket.off('host-load-success', onLoadSuccess);
      socket.off('host-next', onLoadSuccess);
    }
  }, [gameId, setGameId, gameState, setGameState]);

  function getElementForState(state: string) {
    if (state === 'lobby') {
      return <Lobby socket={socket} gameId={gameId} />;
    } else if (state === 'questionnaire') {
      return <HostQuestionnaire />;
    } else if (state === 'pre-quiz') {
      return <PreQuiz />;
    } else {
      return <HostOpen socket={socket} />;
    }
  }

  return (
    <>
    <h1 style={{color: 'darkblue'}}>Friendpardy</h1>
      {getElementForState(gameState)}
    </>
  );
}
