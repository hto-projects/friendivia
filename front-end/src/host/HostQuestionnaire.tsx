import * as React from "react";
import "../style.css";
import { Socket } from "socket.io-client";
import IPlayer from "back-end/interfaces/IPlayer";
import { IPlayerState } from "back-end/interfaces/IPlayerState";
import HostLobbyView from "./HostLobbyView";
import HostQuestionnaireView from "./HostQuestionnaireView";

interface IQuestionnaireProps {
  socket: Socket;
  gameId: number;
}

export default function HostQuestionnaire(props: IQuestionnaireProps) {
  const [players, setPlayers] = React.useState<IPlayer[]>([]);
  const { socket, gameId } = props;

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
      donePlayers={players
        .filter(
          (p) => p.playerState.state === "submitted-questionnaire-waiting"
        )
        .map((p) => p.name)}
      waitingPlayers={players
        .filter((p) => p.playerState.state === "filling-questionnaire")
        .map((p) => p.name)}
      gameId={gameId}
      socket={socket}
    />
  );
}
