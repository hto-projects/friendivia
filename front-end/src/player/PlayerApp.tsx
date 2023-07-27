import React from "react";
import PlayerJoin from "./PlayerJoin";
import { Socket } from "socket.io-client";
import PlayerQuestionnaire from "./PlayerQuestionnaire";
import PlayerQuizQuestion from "./PlayerQuizQuestion";
import PlayerWait from "./PlayerWait";
import logo from "../assets/friendpardylogo.png";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PlayerCorrect from "./PlayerCorrect";
import PlayerIncorrect from "./PlayerIncorrect";
import PlayerIsSubject from "./PlayerIsSubject";
import PlayerRanOutOfTime from "./PlayerRanOutOfTime";
import PlayerOver from "./PlayerOver";
import Button from "@mui/material/Button";
import PlayerWyrQuestionnaire from "./PlayerWyrQuestionnaire";

interface PlayerAppProps {
  socket: Socket;
}

export default function PlayerApp(props: PlayerAppProps) {
  const playerIdFromStorage = localStorage.getItem("player-id") || "";
  const [playerState, setPlayerState] = React.useState("");
  const [playerName, setPlayerName] = React.useState("");
  const [playerScore, setPlayerScore] = React.useState(0);
  const [
    questionnaireQuestionsText,
    setQuestionnaireQuestionsText,
  ] = React.useState<string[]>([]);
  const [quizQuestionOptionsText, setQuizQuestionOptionsText] = React.useState<
    string[]
  >([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [wyrQuestion, setWyrQuestion] = React.useState<string>("");
  const [wyrA, setWyrA] = React.useState<string>("");
  const [wyrB, setWyrB] = React.useState<string>("");

  const { socket } = props;

  var bottomButtons;

  if (!loaded) {
    socket.emit("player-load", playerIdFromStorage);
  }

  React.useEffect(() => {
    function onLoadSuccess(data: any) {
      setLoaded(true);
      setPlayerState(data.player.playerState.state);
      setPlayerName(data.player.name);
      setPlayerScore(data.player.score);
      if (data && data.extraData && data.extraData.questionnaireQuestionsText) {
        setQuestionnaireQuestionsText(
          data.extraData.questionnaireQuestionsText
        );
      }

      if (data && data.extraData && data.extraData.wyrQuestion) {
        setWyrQuestion(data.extraData.wyrQuestion);
      }
      if (data && data.extraData && data.extraData.wyrA) {
        setWyrA(data.extraData.wyrA);
      }
      if (data && data.extraData && data.extraData.wyrB) {
        setWyrB(data.extraData.wyrB);
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
      bottomButtons = false;
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
      bottomButtons = false;
      return (
        <PlayerQuizQuestion
          socket={socket}
          optionsList={quizQuestionOptionsText}
          playerState={playerState}
        />
      );
    } else if (playerState === "did-not-answer-question-waiting") {
      bottomButtons = false;
      return <PlayerRanOutOfTime />;
    } else if (playerState === "question-about-me") {
      bottomButtons = false;
      return <PlayerIsSubject />;
    } else if (playerState === "seeing-answer-correct") {
      bottomButtons = false;
      return <PlayerCorrect />;
    } else if (playerState === "seeing-answer-incorrect") {
      bottomButtons = false;
      return <PlayerIncorrect />;
    } else if (playerState === "seeing-answer") {
      bottomButtons = false;
      return <PlayerIsSubject />;
    } else if (playerState === "pre-wyr") {
      return <PlayerWait message={`Time for round 2: Would you rather`} />;
    } else if (playerState === "wyr-questionnaire") {
      const random = Math.floor(Math.random() * wyrQuestion.length);
      return (
        <PlayerWyrQuestionnaire
          socket={socket}
          playerState={playerState}
          wyrQuestion={wyrQuestion[random]}
          wyrA={wyrA[random]}
          wyrB={wyrB[random]}
        />
      );
    } else if (playerState === "pre-leader-board") {
      bottomButtons = false;
      return <PlayerWait message={`Calculating final scores...`} />;
    } else if (playerState === "leader-board") {
      bottomButtons = false;
      return <PlayerOver rank={0} />;
    } else if (playerState === "rank-one") {
      bottomButtons = false;
      return <PlayerOver rank={1} />;
    } else if (playerState === "rank-two") {
      bottomButtons = false;
      return <PlayerOver rank={2} />;
    } else if (playerState === "rank-three") {
      bottomButtons = false;
      return <PlayerOver rank={3} />;
    } else if (playerState === "") {
      bottomButtons = true;
      return <PlayerJoin socket={socket} playerState={playerState} />;
    } else {
      bottomButtons = false;
      return <PlayerJoin socket={socket} playerState={playerState} />;
    }
  }

  function getButtonsForState() {
    if (playerState === "init" || playerState === null || playerState === "") {
      return (
        <div className="bottomContainer" id="btmContainPlayerApp">
          <p>
            <Button
              className="button"
              id="HostPlayerApp"
              variant="contained"
              sx={{
                bgcolor:
                  getComputedStyle(document.body).getPropertyValue("--accent") +
                  ";",
                m: 2,
              }}
              href="/host"
            >
              Host A Game
            </Button>
            <Button
              className="button"
              id="AboutPlayerApp"
              variant="contained"
              sx={{
                bgcolor:
                  getComputedStyle(document.body).getPropertyValue("--accent") +
                  ";",
                m: 2,
              }}
              href="/about"
            >
              About
            </Button>
          </p>
        </div>
      );
    } else {
      return <></>;
    }
  }

  function getScreenForState() {
    if (playerState === "init" || playerState === null || playerState === "") {
      return "element";
    } else {
      return "noBtnElement";
    }
  }

  return (
    <div
      className={
        playerState != "filling-questionnaire" ? "fillScreen" : "scroll"
      }
    >
      <div className="player_join">
        <div className="banner">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <div className="align_center">
                {/*if player name has not been inputted do not display username chip*/}
                {playerName != "" ? <Chip label={playerName} /> : ""}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="align_center">
                <img className="logo" src={logo} />
              </div>
            </Grid>
            <Grid item xs={3}>
              {/*if player name has not been inputted do not display score chip*/}
              <div className="align_center">
                {playerState != "filling-questionnaire" ? (
                  playerName != "" ? (
                    <Chip label={playerScore} />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={getScreenForState()}>{getElementForState()}</div>
        {bottomButtons ? (
          <div className="bottomContainer">
            <p>
              <Button
                className="button"
                variant="contained"
                sx={{
                  bgcolor:
                    getComputedStyle(document.body).getPropertyValue(
                      "--accent"
                    ) + ";",
                  m: 2,
                }}
                style={{ marginBottom: 0 }}
                href="/host"
              >
                Host A Game
              </Button>
              <Button
                className="button"
                variant="contained"
                sx={{
                  bgcolor:
                    getComputedStyle(document.body).getPropertyValue(
                      "--accent"
                    ) + ";",
                  m: 2,
                }}
                style={{ marginBottom: 0 }}
                href="/about"
              >
                About
              </Button>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
