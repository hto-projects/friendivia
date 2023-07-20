import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IQuestionnaireQuestion from "back-end/interfaces/IQuestionnaireQuestion";

interface ISettingsProps {
  socket: Socket;
  gameId: number;
  timePerQuestionSetting: number;
  numQuizQuestionsSetting: number;
}

export default function HostSettings(props: ISettingsProps) {
  const { socket, gameId, timePerQuestionSetting, numQuizQuestionsSetting } = props;
  const [timePerQuestion, setTimePerQuestion] = React.useState<number>(timePerQuestionSetting || 15);
  const [numQuizQuestions, setNumQuizQuestions] = React.useState<number>(numQuizQuestionsSetting || 5);
  const [addedQuestions, setAddedQuestions] = React.useState<IQuestionnaireQuestion[]>([{ text: "", quizText: "", fakeAnswers: ["", "", "", ""] }]);

  const addCustomQuestion = () => {
    setAddedQuestions((prevQuestions) => [
      ...prevQuestions,
      { text: "", quizText: "", fakeAnswers: ["", "", "", ""] },
    ]);
  };

  const removeCustomQuestion = (index: number) => {
    setAddedQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  async function onBack() {
    socket.emit("host-back", gameId, { timePerQuestion, numQuizQuestions, addedQuestions });
  }

  return (
    <div className="scroll">
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
        <p>Number of Quiz Questions:</p>
        <TextField
          className="idInput form"
          id="question#QuizQ"
          label="Num of Quiz Questions"
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 2 }}
          value={numQuizQuestions}
          onChange={(e) => setNumQuizQuestions(Number(e.target.value))}
        />
        <p>Custom Questions:</p>
        <p>
          text: "What is your favorite movie?", quizText: "What is
          &lt;PLAYER&gt;'s favorite movie?", fakeAnswers: ["The Godfather",
          "Despicable Me", "Into the Spiderverse", "Star Wars: A New Hope"]
        </p>
        {addedQuestions.map((question, index) => (
          <div key={index} className="customQuestion">
            <TextField
              className="idInput form"
              id="questionText"
              label="Question Text"
              variant="outlined"
              size="small"
              type="text"
              onChange={(e) => {
                const newQuestions = [...addedQuestions];
                newQuestions[index].text = e.target.value;
                setAddedQuestions(newQuestions);
              }}
            />
            <TextField
              className="idInput form"
              id="quizText"
              label="Quiz Text"
              variant="outlined"
              size="small"
              type="text"
              onChange={(e) => {
                const newQuestions = [...addedQuestions];
                newQuestions[index].quizText = e.target.value;
                setAddedQuestions(newQuestions);
              }}
            />
            <TextField
              className="idInput form"
              id="fakeAnswer1"
              label="Fake Answer 1"
              variant="outlined"
              size="small"
              type="text"
              onChange={(e) => {
                const newQuestions = [...addedQuestions];
                newQuestions[index].fakeAnswers[0] = e.target.value;
                setAddedQuestions(newQuestions);
              }}
            />
            <TextField
              className="idInput form"
              id="fakeAnswer2"
              label="Fake Answer 2"
              variant="outlined"
              size="small"
              type="text"
              onChange={(e) => {
                const newQuestions = [...addedQuestions];
                newQuestions[index].fakeAnswers[1] = e.target.value;
                setAddedQuestions(newQuestions);
              }}
            />
            <TextField
              className="idInput form"
              id="fakeAnswer3"
              label="Fake Answer 3"
              variant="outlined"
              size="small"
              type="text"
              onChange={(e) => {
                const newQuestions = [...addedQuestions];
                newQuestions[index].fakeAnswers[2] = e.target.value;
                setAddedQuestions(newQuestions);
              }}
            />
            <TextField
              className="idInput form"
              id="fakeAnswer4"
              label="Fake Answer 4"
              variant="outlined"
              size="small"
              type="text"
              onChange={(e) => {
                const newQuestions = [...addedQuestions];
                newQuestions[index].fakeAnswers[3] = e.target.value;
                setAddedQuestions(newQuestions);
              }}
            />
            <Button
              onClick={() => removeCustomQuestion(index)}
              variant="contained"
              sx={{
                bgcolor: "gray",
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          onClick={() => addCustomQuestion()}
          variant="contained"
          sx={{
            bgcolor: "black",
          }}
        >
          Add Custom Question
        </Button>
        <p>Click below to go back:</p>
        <Button
          variant="contained"
          sx={{
            bgcolor:
              getComputedStyle(document.body).getPropertyValue("--accent") +
              ";",
          }}
          onClick={onBack}
        >
          Save
        </Button>
      </Stack>
    </div>
  );
}
