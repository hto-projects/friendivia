import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import baseQuestions from "back-end/db/basequestions";
import Grid from "@mui/material/Grid";

interface ISettingsProps {
  socket: Socket;
  gameId: number;
  timePerQuestionSetting: number;
}

export default function HostSettings(props: ISettingsProps) {
  const { socket, gameId, timePerQuestionSetting } = props;
  var questions = baseQuestions;
  const [editQuestions, setEditQuestions] = React.useState(false);
  const [gQuestions, setGQuestions] = React.useState([
    "What is <PLAYER>'s favorite animal?",
  ]);
  const [rQuestions, setRQuestions] = React.useState([
    "What is your favorite animal?",
  ]);
  const [fOne, setFOne] = React.useState(["dog"]);
  const [fTwo, setFTwo] = React.useState(["Cat"]);
  const [fThree, setFThree] = React.useState(["zebra"]);
  const [timePerQuestion, setTimePerQuestion] = React.useState<number>(
    timePerQuestionSetting || 15
  );

  async function onBack() {
    socket.emit("host-back", gameId, { timePerQuestion });
  }

  function onGChange(e, i) {
    const updatedArray = [...gQuestions];
    updatedArray[i] = e.target.value;
    setGQuestions(updatedArray);
  }

  function onRChange(e, i) {
    const updatedArray = [...rQuestions];
    updatedArray[i] = e.target.value;
    setRQuestions(updatedArray);
  }

  function onFOneChange(e, i) {
    const updatedArray = [...fOne];
    updatedArray[i] = e.target.value;
    setFOne(updatedArray);
  }

  function onFTwoChange(e, i) {
    const updatedArray = [...fTwo];
    updatedArray[i] = e.target.value;
    setFTwo(updatedArray);
  }

  function onFThreeChange(e, i) {
    const updatedArray = [...fThree];
    updatedArray[i] = e.target.value;
    setFThree(updatedArray);
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
        {/* Only display all of the questions if the host says yes they do want to edit questions */}
        {editQuestions ? (
          <>
            {questions.map((question, index) => (
              <div key={index}>
                <h4>Question {index + 1}</h4>
                <Grid container spacing={2}>
                  {/* Question shown to guessers */}
                  <Grid item xs={12} sm={4}>
                    <label>Question shown to guessers:</label>
                    <input
                      type="text"
                      className="editableQuestion"
                      value={question.quizText}
                      //onChange={(e) => handleInputChange(index, "guesser", null, e)}
                    />
                  </Grid>
                  {/* Question shown to respondent */}
                  <Grid item xs={12} sm={4}>
                    <label>Question shown to respondent:</label>
                    <input
                      type="text"
                      className="editableQuestion"
                      value={question.text}
                      //onChange={(e) => handleInputChange(index, "respondent", null, e)}
                    />
                  </Grid>
                  {/* Fake answers */}
                  <Grid item xs={12} sm={4}>
                    <label>Fake answers:</label>
                    {question.fakeAnswers.map((answer, inputType) => (
                      <input
                        key={inputType}
                        type="text"
                        className="editableQuestion"
                        value={answer}
                        // onChange={(e) =>
                        //   handleInputChange(index, "fakeAnswers", inputType, e)
                        // }
                      />
                    ))}
                  </Grid>
                </Grid>
                <Button
                  //onClick={() => removeQuestion(index)}
                  variant="contained"
                  sx={{
                    bgcolor:
                      getComputedStyle(document.body).getPropertyValue(
                        "--accent"
                      ) + ";",
                  }}
                >
                  Remove Question
                </Button>
                <hr />
              </div>
            ))}
          </>
        ) : (
          <Button
            variant="contained"
            sx={{
              bgcolor:
                getComputedStyle(document.body).getPropertyValue("--accent") +
                ";",
            }}
            onClick={() => setEditQuestions(true)}
          >
            Edit Questions
          </Button>
        )}
        <Button
          variant="contained"
          sx={{
            bgcolor:
              getComputedStyle(document.body).getPropertyValue("--accent") +
              ";",
          }}
          //onClick={addNewQuestion}
        >
          Add New Question
        </Button>

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
    </>
  );
}
