import * as React from 'react';
import '../style.css';
import { Socket } from 'socket.io-client';
import JoinForm from './JoinForm';

interface IJoinProps {
  socket: Socket,
  playerState: string
}

export default function Join(props: IJoinProps) {
  const { socket, playerState } = props;
  const [joiningPlayerState, setJoiningPlayerState] = React.useState({});

  React.useEffect(() => {
    if (playerState === 'joined-waiting') {
      setJoiningPlayerState({
        state: 'joined-waiting',
        message: ''
      });
    }
  }, [playerState, setJoiningPlayerState]);
  
  React.useEffect(() => {
    function onJoinSuccess(playerId: string) {
      localStorage.setItem('player-id', playerId);

      setJoiningPlayerState({
        state: 'joined-waiting',
        message: ''
      });
    }

    function onJoinError(errorMsg: string) {
      setJoiningPlayerState({
        state: 'init',
        message: errorMsg
      });
    }
  
    socket.on('join-success', onJoinSuccess);
    socket.on('join-error', onJoinError);

    return () => {
      socket.off('join-success', onJoinSuccess);
      socket.off('join-error', onJoinError);
    }
  }, [joiningPlayerState, setJoiningPlayerState]);

  return (
    <JoinForm socket={socket} playerState={joiningPlayerState} />
  )
}
