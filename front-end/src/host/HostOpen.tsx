import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import question from "back-end/db/question";
import Question from "back-end/models/Question";
import IQuestionnaireQuestion from "back-end/interfaces/IQuestionnaireQuestion";

interface IOpenProps {
  socket: Socket;
}

export default function HostOpen(props: IOpenProps) {
  const { socket } = props;
  const [gQuestions, setGQuestions] = React.useState([
    "What is <PLAYER>'s favorite animal?",
  ]);
  const [rQuestions, setRQuestions] = React.useState([
    "What is your favorite animal?",
  ]);
  const [fOne, setFOne] = React.useState(["dog"]);
  const [fTwo, setFTwo] = React.useState(["Cat"]);
  const [fThree, setFThree] = React.useState(["zebra"]);

  async function onHost() {
    for (let i = 0; i < gQuestions.length; i++) {
      if (
        gQuestions[i].trim() !== "" &&
        gQuestions[i].trim() !== "What is <PLAYER>'s favorite animal?" &&
        gQuestions[i].includes("<PLAYER>")
      ) {
        if (
          rQuestions[i].trim() != "" &&
          rQuestions[i].trim() != "What is your favorite animal?"
        ) {
          if (
            fOne[i].trim() !== "" &&
            fTwo[i].trim() !== "" &&
            fThree[i] !== ""
          ) {
            var newQuestion: IQuestionnaireQuestion = {
              text: rQuestions[i],
              quizText: gQuestions[i],
              fakeAnswers: [fOne[i], fTwo[i], fThree[i]],
            };
            question.addQuestion(newQuestion);
          }
        }
      }
    }

    socket.emit("host-open");
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
      <p>Want to add your own questions?</p>
      <p>
        Question shown to guessers | question shown to respondent | fake answers
      </p>
      <input
        type="text"
        className="editableQuestion"
        value={gQuestions[0]}
        onChange={(e) => onGChange(e, 0)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={rQuestions[0]}
        onChange={(e) => onRChange(e, 0)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fOne[0]}
        onChange={(e) => onFOneChange(e, 0)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fTwo[0]}
        onChange={(e) => onFTwoChange(e, 0)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fThree[0]}
        onChange={(e) => onFThreeChange(e, 0)}
      />
      <br />
      <input
        type="text"
        className="editableQuestion"
        value={gQuestions[1]}
        onChange={(e) => onGChange(e, 1)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={rQuestions[1]}
        onChange={(e) => onRChange(e, 1)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fOne[1]}
        onChange={(e) => onFOneChange(e, 1)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fTwo[1]}
        onChange={(e) => onFTwoChange(e, 1)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fThree[1]}
        onChange={(e) => onFThreeChange(e, 1)}
      />
      <br />
      <input
        type="text"
        className="editableQuestion"
        value={gQuestions[2]}
        onChange={(e) => onGChange(e, 2)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={rQuestions[2]}
        onChange={(e) => onRChange(e, 2)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fOne[2]}
        onChange={(e) => onFOneChange(e, 2)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fTwo[2]}
        onChange={(e) => onFTwoChange(e, 2)}
      />
      <input
        type="text"
        className="editableQuestion"
        value={fThree[2]}
        onChange={(e) => onFThreeChange(e, 2)}
      />
      <p>Click below to host a new game:</p>
      <Button
        variant="contained"
        sx={{
          bgcolor:
            getComputedStyle(document.body).getPropertyValue("--accent") + ";",
        }}
        onClick={onHost}
      >
        Host
      </Button>
    </>
  );
}
