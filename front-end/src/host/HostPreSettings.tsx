import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface IPreSettingsProps {
  socket: Socket;
  preSettingsId: string;
  timePerQuestionSetting: number;
  numQuestionnaireQuestionsSetting: number;
  numQuizQuestionsSetting: number;
}

export default function HostPreSettings(props: IPreSettingsProps) {
  const { socket, preSettingsId, timePerQuestionSetting, numQuestionnaireQuestionsSetting, numQuizQuestionsSetting } = props;
  const [timePerQuestion, setTimePerQuestion] = React.useState<number>(timePerQuestionSetting || 15);
  const [numQuestionnaireQuestions, setNumQuestionnaireQuestions] = React.useState<number>(numQuestionnaireQuestionsSetting || 5);
  const [numQuizQuestions, setNumQuizQuestions] = React.useState<number>(numQuizQuestionsSetting || 5);

  async function onPSBack() {
    socket.emit("host-ps-back", preSettingsId, {timePerQuestion, numQuestionnaireQuestions, numQuizQuestions});
  }

  return (
    <>
      <Stack className="joinForm" spacing={2}>
        <p>Time Per Question:</p>
        <TextField
          className="idInput form"
          id="questionTime"
          label="Time (In Seconds)"
          variant="outlined"
          size="small"
          type="number"
          value={timePerQuestion}
          onChange={(e) => setTimePerQuestion(Number(e.target.value))}
        />
        <p>Number of Questionnaire Questions:</p>
        <TextField
          className="idInput form"
          id="question#QuestionnaireQ"
          label="Number of Questionnaire Questions"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 2, max: 24}}
          value={numQuestionnaireQuestions}
          onChange={(e) => {
            setNumQuestionnaireQuestions(Number(e.target.value));
            if (numQuestionnaireQuestions < 2) {setNumQuestionnaireQuestions(2);}
            if (numQuestionnaireQuestions > 24) {setNumQuestionnaireQuestions(24);}
          }}
        />
        <p>Number of Quiz Questions:</p>
        <TextField
          className="idInput form"
          id="question#QuizQ"
          label="Number of Quiz Questions"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 2 }}
          value={numQuizQuestions}
          onChange={(e) => {
            setNumQuizQuestions(Number(e.target.value));
            if (numQuizQuestions < 2) {setNumQuizQuestions(2);}
          }}
        />
        <p>Click below to go back:</p>
        <Button
          variant="contained"
          sx={{
            bgcolor:
              getComputedStyle(document.body).getPropertyValue("--accent") + ";",
          }}
          onClick={onPSBack}
        >
          Back
        </Button>
      </Stack>
    </>
  );
}
