import * as React from "react";
import "../style.css";
import { Socket } from "socket.io-client";
import IPlayer from "back-end/interfaces/IPlayer";
import HostLobbyView from "./HostLobbyView";
import HostQuestionnaireView from "./HostQuestionnaireView";

interface IQuestionnaireProps {
  donePlayers: string[];
  waitingPlayers: string[];
  socket: Socket;
  gameId: number;
}

export default function HostLobby(props: IQuestionnaireProps) {
  const [players, setPlayers] = React.useState<IPlayer[]>([]);
  const { donePlayers, waitingPlayers, socket, gameId } = props;

  React.useEffect(() => {
    function onPlayersUpdated(playersObject: any) {
      if (gameId !== -1 && playersObject.gameId === gameId) {
        setPlayers(playersObject.players);
      }
    }

    socket.on("players-updated", onPlayersUpdated);

    return () => {
      socket.off("players-updated", onPlayersUpdated);
    };
  }, [players, setPlayers]);

  return (
    <HostQuestionnaireView
    donePlayers={players.filter((p) => p.playerState.state === p.playerState.state.DoneWithQuestionnaireWaiting).map((p) => p.name)}
      donePlayers= 
      waitingPlayers=
      playerNames={players.map((p) => p.name)}
      gameId={gameId}
      socket={socket}
    />
  );
}
