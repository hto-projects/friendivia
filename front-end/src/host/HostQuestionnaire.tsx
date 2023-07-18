import * as React from "react";
import "../style.css";
import { Socket } from "socket.io-client";
import IPlayer from "back-end/interfaces/IPlayer";
import { IPlayerState } from "back-end/interfaces/IPlayerState";
import HostLobbyView from "./HostLobbyView";
import getPlayers from "back-end/db/player" 
import HostQuestionnaireView from "./HostQuestionnaireView";

interface IQuestionnaireProps {
  socket: Socket;
  gameId: number;
}

export default function HostQuestionnaire(props: IQuestionnaireProps) {
  const [players, setPlayers] = React.useState<IPlayer[]>([]);
  const { socket, gameId } = props;
  let donePlayers: any = []
  let waitingPlayers: any = []
  console.log(players, waitingPlayers, "after host questionnaire init")

  React.useEffect(() => {
    function onPlayersUpdated(playersObject: any) {
      if (gameId !== -1 && playersObject.gameId === gameId) {
        setPlayers(playersObject.players);
      }
    }

    function onStatusReceived(playerStatusList: any){
      console.log("goes to status")
      donePlayers = playerStatusList[0];
      waitingPlayers = playerStatusList[1];
      console.log(donePlayers, waitingPlayers, "in host questionnaire after emit")
      return(
        console.log("in status return", donePlayers, waitingPlayers),
        <HostQuestionnaireView
          donePlayers={donePlayers}
          waitingPlayers={waitingPlayers}
          gameId={gameId}
          socket={socket}
        />
      )
      
    }

    /*function onGameStart(playerNames: string[]) {
      console.log(playerNames)
      waitingPlayers = playerNames;
    }*/

    socket.on("players-updated", onPlayersUpdated);
    socket.on("update-host-view", onStatusReceived);
    //socket.on("get-waiting-players", onGameStart);

    return () => {
      socket.off("players-updated", onPlayersUpdated);
      socket.off("update-host-view", onStatusReceived);
      //socket.off("get-waiting-players", onGameStart)
    };
  }, [players, setPlayers]);

  return (
    console.log(donePlayers),
    console.log(waitingPlayers, "in return to view"),
    <HostQuestionnaireView
      donePlayers={donePlayers}
      waitingPlayers={waitingPlayers}
      gameId={gameId}
      socket={socket}
    />
  );
}
