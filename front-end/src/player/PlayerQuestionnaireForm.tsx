import * as React from "react";
import "../style.css";
import { Button } from "../extra/FrdvButton"
import TextField from "@mui/material/TextField";
import { Socket } from "socket.io-client";
import PlayerWait from "./PlayerJoinWait";

interface IQuestionnaireFormProps {
  socket: Socket;
  playerState: any;
  questions: string[];
}

export default function PlayerQuestionnaireForm(
  props: IQuestionnaireFormProps
) {
  const { socket, playerState, questions } = props;

  const [answers, setAnswers] = React.useState<string[]>(
    Array(questions.length).fill("")
  );
  const inMessage = `Submission accepted! Please wait for the other players to finish.`;

  function onSubmitQuestionnaire() {
    for (let i = 0; i < answers.length; i++) {
      answers[i] = answers[i].trim();
      if (answers[i] === "") {
        alert("Please fill out all answers not just spaces.");
        return;
      }
    }
    socket.emit("player-submit-questionnaire", answers);
  }

  function onInputChange(newValue: string, index: number) {
    const newAnswers: string[] = [];
    for (let i = 0; i < questions.length; i++) {
      if (index === i) {
        newAnswers[i] = newValue;
      } else {
        newAnswers[i] = answers[i];
      }
    }

    setAnswers(newAnswers);
  }

  let maxAnswer = 50;

  const questionnaireInputs = (
    <>
      <div style={{ height: "5vh" }}></div>
      <div
        style={{
          width: "90%",
          margin: "auto",
          borderRadius: "20px",
          background: "white",
          padding: "20px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          position: "relative",
          height: "75vh",
          overflowY: "scroll",
        }}
      >
        {questions.map((q, i) => (
          <div key={i}>
            <p
              style={{
                textAlign: "left",
                marginBottom: "0",
                marginLeft: "1%",
                marginTop: "5px",
              }}
            >
              {q}
            </p>
            <TextField
              id={"question-" + i}
              label={"Answer " + (i + 1)}
              variant="outlined"
              size="small"
              className="questionnaireInput"
              margin="dense"
              value={answers[i]}
              inputProps={{ maxLength: maxAnswer }}
              onChange={(e) => onInputChange(e.target.value, i)}
              sx={{
                width: "100%",
                fontWeight: "bold",
                fontSize: "18px",
                fontFamily: "Inter",
                marginBottom: "10px",
              }}
            />
          </div>
        ))}
        <Button
          variant="contained"
          disabled={answers.some((a) => a.length === 0)}
          sx={{
            color: "white",
            width: "100%",
            fontWeight: "light",
            fontSize: "1.29em",
            marginBottom: "0px",
            marginTop: "10px",
          }}
          onClick={onSubmitQuestionnaire}
        >
          submit
        </Button>
        <p style={{ color: "red" }}>{playerState.message}</p>
      </div>
      <div style={{ height: "20vh" }}></div>
    </>
  );

  return playerState.state === "submitted-questionnaire-waiting" ? (
    <PlayerWait />
  ) : (
    questionnaireInputs
  );
}
