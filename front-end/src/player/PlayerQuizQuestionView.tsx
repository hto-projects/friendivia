import * as React from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";
import { Socket } from "socket.io-client";
import PlayerWait from "./PlayerWait";

interface IQuizQuestionViewProps {
  optionsList: string[];
  socket: Socket;
  playerState: {
    state: string;
    message: string;
  };
}

export default function PlayerQuizQuestionView(props: IQuizQuestionViewProps) {
  const { optionsList, socket, playerState } = props;

  const guessReceivedMessage = `Guess received! Hang tight...`;

  function goTo(answerIndex: number) {
    answerQuestion(answerIndex);
    allPlayersAnswerQuestion(answerIndex);
  }

  const answerQuestion = async (answerIndex: number): Promise<void> => {
    socket.emit("player-answer-question", answerIndex);
  };

  const allPlayersAnswerQuestion = async (
    answerIndex: number
  ): Promise<void> => {
    socket.emit("check-all-players-answered", answerIndex);
  };

  const optionsForm =
    optionsList.length === 2 ? (
      <div
        className="questionnaireWyrInputs"
        style={{
          display: "flex",
          flexDirection: "column",
          verticalAlign: "middle",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "85vh",
            verticalAlign: "center",
          }}
        >
          <Paper
            style={{
              height: "100%",
              margin: "5vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
            onClick={() => goTo(0)}
            elevation={3}
            className="questionnaireWyrPaper"
          >
            <h1
              style={{
                textAlign: "center",
                justifySelf: "center",
                color: "white",
              }}
            >
              {optionsList[0]}
            </h1>
          </Paper>
          <Paper
            style={{
              height: "100%",
              margin: "5vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(45deg, #00008B 30%, #ADD8E6 90%)",
            }}
            elevation={3}
            onClick={() => goTo(1)}
            className="questionnaireWyrPaper"
          >
            <h1
              style={{
                textAlign: "center",
                justifySelf: "center",
                color: "white",
              }}
            >
              {optionsList[1]}
            </h1>
          </Paper>
        </div>
      </div>
    ) : (
      <div>
        <div className="answerOptions">
          {optionsList.map((o: String, i: number) => (
            <>
              <br />
              <Button
                style={{ textTransform: "none" }}
                className="answerButton"
                variant="contained"
                sx={{
                  bgcolor:
                    getComputedStyle(document.body).getPropertyValue(
                      "--accent"
                    ) + ";",
                }}
                key={i}
                onClick={() => goTo(i)}
              >
                {o}
              </Button>
            </>
          ))}
        </div>

        <p style={{ color: "red" }}>{playerState.message}</p>
      </div>
    );

  if (playerState.state === "answered-quiz-question-waiting") {
    return <PlayerWait message={guessReceivedMessage} />;
  } else {
    return optionsForm;
  }
}
