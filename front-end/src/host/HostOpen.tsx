import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";

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

  async function onHost() {
    //for each question in g questions check if it is empty stripped
    var submitGQuestions = [""];
    var submitRQuestions = [""];
    //for each question in r questions check if it is empty stripped
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
          submitGQuestions.push(gQuestions[i]);
          submitRQuestions.push(rQuestions[i]);
        }
      }
    }
    submitGQuestions = submitGQuestions.filter((str) => str !== "");
    submitRQuestions = submitRQuestions.filter((str) => str !== "");
    console.log(submitGQuestions);
    console.log(submitRQuestions);

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

  return (
    <>
      <p>Want to add your own questions?</p>
      <p>Question shown to guessers | question shown to respondent</p>
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
