import * as React from "react";
import "../style.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Socket } from "socket.io-client";
import PlayerWait from "./PlayerWait";

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

  let maxAnswer = 40;

  const questionnaireInputs = (
    <>
      {questions.map((q, i) => (
        <div key={i}>
          <p>{q}</p>
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
          />
        </div>
      ))}
      <br />
      <Button
        variant="contained"
        disabled={answers.some((a) => a.length === 0)}
        sx={{
          bgcolor:
            getComputedStyle(document.body).getPropertyValue("--accent") + ";",
        }}
        onClick={onSubmitQuestionnaire}
      >
        Submit
      </Button>
      <p style={{ color: "red" }}>{playerState.message}</p>
    </>
  );

  return playerState.state === "submitted-questionnaire-waiting" ? (
    <PlayerWait message={inMessage} />
  ) : (
    questionnaireInputs
  );
}
