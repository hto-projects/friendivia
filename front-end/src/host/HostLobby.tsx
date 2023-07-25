import * as React from 'react';
import '../style.css';
import { Socket } from 'socket.io-client';
import HostLobbyView from './HostLobbyView';
import Speak from '../Speak';

interface ILobbyProps {
  socket: Socket,
  gameId: number
}

export default function HostLobby(props: ILobbyProps) {
  const [playerNames, setPlayerNames] = React.useState<string[]>([]);
  const { socket, gameId } = props;

  React.useEffect(() => {
    function onPlayersUpdated(playersObject: any) {
      if (gameId !== -1 && playersObject.gameId === gameId) {
        setPlayerNames(playersObject.players.map(p => p.name));
      }
    }
  
    socket.on('players-updated', onPlayersUpdated);

    return () => {
      socket.off('players-updated', onPlayersUpdated);
    }
  }, [playerNames, setPlayerNames]);

  return (
    <>
      <div>
        {playerNames.map(p => <Speak text={`Welcome to the game, "${p}"!`} />)}
      </div>
      <HostLobbyView playerNames={playerNames} gameId={gameId} socket={socket} />
    </>
  );
}
