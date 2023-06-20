import React from "react";
import PlayerJoin from "./PlayerJoin";
import { Socket } from "socket.io-client";
import PlayerQuestionnaire from "./PlayerQuestionnaire";
import PlayerQuizQuestion from "./PlayerQuizQuestion";
import PlayerWait from "./PlayerWait";
import logo from "../assets/friendpardylogo.png";
import { Chip } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

interface PlayerAppProps {
  socket: Socket;
}

export default function PlayerApp(props: PlayerAppProps) {
  const playerIdFromStorage = localStorage.getItem("player-id") || "";
  const [playerState, setPlayerState] = React.useState("");
  const [questionnaireQuestionsText, setQuestionnaireQuestionsText] =
    React.useState<string[]>([]);
  const [quizQuestionOptionsText, setQuizQuestionOptionsText] = React.useState<string[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const { socket } = props;

  if (!loaded) {
    socket.emit("player-load", playerIdFromStorage);
  }

  React.useEffect(() => {
    function onLoadSuccess(data: any) {
      setLoaded(true);
      setPlayerState(data.player.playerState.state);
      if (data && data.extraData && data.extraData.questionnaireQuestionsText) {
        setQuestionnaireQuestionsText(
          data.extraData.questionnaireQuestionsText
        );
      }

      if (data && data.extraData && data.extraData.quizQuestionOptionsText) {
        setQuizQuestionOptionsText(data.extraData.quizQuestionOptionsText);
      }
    }

    socket.on("player-load-success", onLoadSuccess);
    socket.on("player-next", onLoadSuccess);

    return () => {
      socket.off("player-load-success", onLoadSuccess);
      socket.off("player-next", onLoadSuccess);
    };
  }, [playerState, setPlayerState]);

  function getElementForState() {
    if (
      playerState === "filling-questionnaire" ||
      playerState === "submitted-questionnaire-waiting"
    ) {
      return (
        <PlayerQuestionnaire
          socket={socket}
          playerState={playerState}
          questionnaireQuestionsText={questionnaireQuestionsText}
        />
      );
    } else if (
      playerState === "seeing-question" ||
      playerState === "answered-quiz-question-waiting"
    ) {
      return (
        <PlayerQuizQuestion
          socket={socket}
          optionsList={quizQuestionOptionsText}
          playerState={playerState}
        />
      );
    } else if (playerState === "question-about-me") {
      return (
        <PlayerWait message="Please wait while the other players answer this question about you..." />
      );
    } else if (playerState === "seeing-answer") {
      return (
        <PlayerWait message={`See the correct answer on the host screen.`} />
      );
    } else if (playerState === "pre-leader-board") {
      return <PlayerWait message={`Calculating final scores...`} />;
    } else if (playerState === "leader-board") {
      return <PlayerWait message={`gg`} />;
    } else {
      return <PlayerJoin socket={socket} playerState={playerState} />;
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className = "align_center">
            <Chip label={playerName} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className = "align_center">
              <img className="logo" src={logo} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className = "align_center">{/*Place holder for */}</div>
        </Grid>
      </Grid>
{getElementForState()}

    </>
  );
}
