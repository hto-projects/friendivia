import * as React from "react";
import "../style.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Socket } from "socket.io-client";
import PlayerWait from "./PlayerWait";
import { Paper } from "@mui/material";

interface IWyrQuestionnaireProps {
  socket: Socket;
  playerState: any;
  wyrQuestion: string;
  wyrA: string;
  wyrB: string;
}

export default function PlayerWyrQuestionnaireForm(
  props: IWyrQuestionnaireProps
) {
  const { socket, playerState, wyrQuestion, wyrA, wyrB } = props;

  const inMessage = `Submission accepted! Please wait for the other players to finish.`;

  function onAnswerA() {
    socket.emit("player-submit-wyr-questionnaire", {
      question: wyrQuestion,
      answer: "A",
    });
  }

  function onAnswerB() {
    socket.emit("player-submit-wyr-questionnaire", {
      question: wyrQuestion,
      answer: "B",
    });
  }

  const questionnaireInputs = (
    <div
      className="questionnaireWyrInputs"
      style={{
        display: "flex",
        flexDirection: "column",
        verticalAlign: "middle",
      }}
    >
      <h1
        style={{ textAlign: "center", marginLeft: "2vw", marginRight: "2vw" }}
      >
        {wyrQuestion}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "75vh",
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
          onClick={onAnswerA}
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
            {wyrA}
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
          onClick={onAnswerB}
          className="questionnaireWyrPaper"
        >
          <h1
            style={{
              textAlign: "center",
              justifySelf: "center",
              color: "white",
            }}
          >
            {wyrB}
          </h1>
        </Paper>
      </div>
    </div>
  );

  return playerState.state === "submitted-wyr-questionnaire" ? (
    <PlayerWait message={inMessage} />
  ) : (
    questionnaireInputs
  );
}
