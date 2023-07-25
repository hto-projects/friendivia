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
  const [timePerQuestionInput, setTimePerQuestionInput] = React.useState<number>(timePerQuestion);
  const [numQuestionnaireQuestions, setNumQuestionnaireQuestions] = React.useState<number>(numQuestionnaireQuestionsSetting || 5);
  const [numQuestionnaireQuestionsInput, setNumQuestionnaireQuestionsInput] = React.useState<number>(numQuestionnaireQuestions);
  const [numQuizQuestions, setNumQuizQuestions] = React.useState<number>(numQuizQuestionsSetting || 5);
  const [numQuizQuestionsInput, setNumQuizQuestionsInput] = React.useState<number>(numQuizQuestions);

  React.useEffect(() => {
    if (timePerQuestion < 1) {
      setTimePerQuestion(1);
    } else if (timePerQuestion > 90) {
      setTimePerQuestion(90);
    }
  }, [timePerQuestion, setTimePerQuestion]);

  React.useEffect(() => {
    if (numQuestionnaireQuestions < 2) {
      setNumQuestionnaireQuestions(2);
    } else if (numQuestionnaireQuestions > 32) {
      setNumQuestionnaireQuestions(32);
    }
  }, [numQuestionnaireQuestions, setNumQuestionnaireQuestions]);

  React.useEffect(() => {
    if (numQuizQuestions < 2) {
      setNumQuizQuestions(2);
    }
  }, [numQuizQuestions, setNumQuizQuestions]);

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
          inputProps={{ min: 1, max: 90 }}
          defaultValue={timePerQuestion}
          error={(timePerQuestionInput < 1) || (timePerQuestionInput > 90)}
          helperText={(timePerQuestionInput < 1) || (timePerQuestionInput > 90) ? 'Warning: you must choose a time between 1 and 90 seconds' : ''}
          onChange={(e) => {
            setTimePerQuestion(Number(e.target.value));
            setTimePerQuestionInput(Number(e.target.value));}}
        />
        <p>Number of Questionnaire Questions:</p>
        <TextField
          className="idInput form"
          id="question#QuestionnaireQ"
          label="Number of Questionnaire Questions"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 2, max: 32 }}
          defaultValue={numQuestionnaireQuestions}
          error={(numQuestionnaireQuestionsInput < 2) || (numQuestionnaireQuestionsInput > 32)}
          helperText={(numQuestionnaireQuestionsInput < 2) || (numQuestionnaireQuestionsInput > 32) ? 'Warning: you must choose a number of questionnaire questions greater than 1 and less than 25' : ''}
          onChange={ (e) => {
            setNumQuestionnaireQuestions(Number(e.target.value));
            setNumQuestionnaireQuestionsInput(Number(e.target.value));}}
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
          defaultValue={numQuizQuestions}
          error={(numQuizQuestionsInput < 2) }
          helperText={(numQuizQuestionsInput < 2) ? 'Warning: you must choose a number of questionnaire questions greater than 1 and less than 25' : ''}
          onChange={(e) => {
            setNumQuizQuestions(Number(e.target.value));
            setNumQuizQuestionsInput(Number(e.target.value));
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
