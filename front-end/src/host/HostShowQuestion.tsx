import * as React from "react";
import "../style.css";
import { Button, Paper, Grid } from "@mui/material";
import { Socket } from "socket.io-client";
import Speak from "../Speak";

interface IShowQuestionProps {
  playerName: string;
  questionText: string;
  options: string[];
  socket: Socket;
  gameId: number;
  timePerQuestion: number;
}

function HostShowQuestion(props: IShowQuestionProps) {
  const {
    options,
    questionText,
    playerName,
    socket,
    gameId,
    timePerQuestion,
  } = props;

  function App() {
    const [counter, setCounter] = React.useState(timePerQuestion);
    React.useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
    return (
      <div className="dot">
        <div className="timer">
          <div>{counter}</div>
        </div>
      </div>
    );
  }

  function interpolatePlayerNameInQuestionText() {
    const [part1, part2] = questionText.split("<PLAYER>");
    return (
      <p className="question">
        {part1}
        <b>{playerName}</b>
        {part2}
      </p>
    );
  }

  function quizText() {
    const [part1, part2] = questionText.split("<PLAYER>");
    var res = "";
    res += part1 + `"${playerName}"` + part2 + " .... is it ";
    for (var i = 0; i < options.length; i++) {
      if (i == options.length - 1) {
        res += `or "${options[i]}"?`;
      } else {
        res += `"${options[i]}", `;
      }
    }
    return res;
  }

  function onTimerSkipBtn() {
    socket.emit("timer-skip", gameId);
  }

  return (
    <>
      <App />
      <Speak text={quizText()} cloud={true} />
      {interpolatePlayerNameInQuestionText()}
      {options.length > 2 ? (
        <>
          {" "}
          <ul className="ul">
            {options.map((o: String, i: number) => (
              <Paper elevation={3} className="paper">
                <li className="answer" key={i}>
                  {o}
                </li>
              </Paper>
            ))}
          </ul>
          <div>
            <Button
              className="button"
              variant="contained"
              sx={{
                bgcolor:
                  getComputedStyle(document.body).getPropertyValue("--accent") +
                  ";",
                m: 2,
              }}
              onClick={onTimerSkipBtn}
            >
              Show Answers
            </Button>
          </div>{" "}
        </>
      ) : (
        <>
          <ul
            className="ul"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              verticalAlign: "middle",
            }}
          >
            {options.map((o: String, i: number) => (
              <Paper
                elevation={3}
                className="paper"
                style={{
                  width: "40vw",
                  height: "30vh",
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                  verticalAlign: "middle",
                  background:
                    i === 0
                      ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                      : "linear-gradient(45deg, #00008B 30%, #ADD8E6 90%)",
                }}
              >
                <li
                  className="answer"
                  style={{
                    color: "white",
                    fontSize: "2em",
                    textAlign: "center",
                    justifySelf: "center",
                  }}
                  key={i}
                >
                  {o}
                </li>
              </Paper>
            ))}
          </ul>
          <div>
            <Button
              className="button"
              variant="contained"
              sx={{
                bgcolor:
                  getComputedStyle(document.body).getPropertyValue("--accent") +
                  ";",
                m: 2,
              }}
              onClick={onTimerSkipBtn}
            >
              Show Answers
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default React.memo(HostShowQuestion);
