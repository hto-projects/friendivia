import React from 'react';
import Join from './Join';
import { Socket } from 'socket.io-client';
import Questionnaire from './Questionnaire';

interface PlayerAppProps {
  socket: Socket
}

export default function PlayerApp(props: PlayerAppProps) {
  const playerIdFromStorage = localStorage.getItem('player-id') || '';
  const [playerState, setPlayerState] = React.useState('');

  const { socket } = props;

  if (!playerState) {
    socket.emit('player-load', playerIdFromStorage);
  }

  React.useEffect(() => {
    function onLoadSuccess(data: any) {
      setPlayerState(data.playerState.state);
    }
  
    socket.on('player-load-success', onLoadSuccess);
    socket.on('player-next', onLoadSuccess);

    return () => {
      socket.off('player-load-success', onLoadSuccess);
      socket.off('player-next', onLoadSuccess);
    }
  }, [playerState, setPlayerState]);

  return (
    <>
      <h1>Friendpardy</h1>
      {playerState === 'filling-questionnaire' ? <Questionnaire socket={socket} playerState={playerState} /> : <Join socket={socket} playerState={playerState} /> }
    </>
  );
}
