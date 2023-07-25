import * as React from "react";
import "../style.css";
import PlayAudio from "../PlayAudio";
import theme from "../assets/audio/theme.mp3";
import Speak from "../Speak";
import { Socket } from "socket.io-client";
import IPlayer from "back-end/interfaces/IPlayer";
import HostQuestionnaireView from "./HostQuestionnaireView";

interface IQuestionnaireProps {
  socket: Socket;
  gameId: number;
  playersInGame: IPlayer[];
}

function getPlayerNamesForState(players: IPlayer[], state: string) {
  if (!players) {
    return [];
  }
  return players
    .filter((p) => p.playerState.state === state)
    .map((p) => p.name);
}

export default function HostQuestionnaire(props: IQuestionnaireProps) {
  const { socket, gameId, playersInGame } = props;

  const donePlayersStart = getPlayerNamesForState(
    playersInGame,
    "submitted-wyr-questionnaire"
  );
  const waitingPlayersStart = getPlayerNamesForState(
    playersInGame,
    "wyr-questionnaire"
  );

  const [donePlayers, setDonePlayers] = React.useState<string[]>(
    donePlayersStart
  );
  const [waitingPlayers, setWaitingPlayers] = React.useState<string[]>(
    waitingPlayersStart
  );

  React.useEffect(() => {
    function onStatusReceived(playerStatusList: any) {
      setDonePlayers(playerStatusList[0]);
      setWaitingPlayers(playerStatusList[1]);
    }

    socket.on("update-host-wyr-view", onStatusReceived);

    function onPlayersUpdated(playersObject: any) {
      console.log("players updated");
      const updatedDonePlayers = getPlayerNamesForState(
        playersObject.players,
        "submitted-wyr-questionnaire"
      );
      const updatedWaitingPlayers = getPlayerNamesForState(
        playersObject.players,
        "wyr-questionnaire"
      );
      onStatusReceived([updatedDonePlayers, updatedWaitingPlayers]);
    }

    socket.on("players-updated", onPlayersUpdated);

    return () => {
      socket.off("update-host-wyr-view", onStatusReceived);
    };
  }, [socket]);

  return (
    <>
      <Speak text={"Fill out your questionnaires please."} cloud={true} />
      <PlayAudio src={theme} loop={true} />
      <HostQuestionnaireView
        donePlayers={donePlayers}
        waitingPlayers={waitingPlayers}
        gameId={gameId}
        socket={socket}
      />
    </>
  );
}
