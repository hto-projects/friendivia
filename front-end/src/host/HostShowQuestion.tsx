import * as React from "react";
import "../style.css";
import { Button, Paper, Grid } from "@mui/material";
import { Socket } from "socket.io-client";

interface IShowQuestionProps {
  playerName: string;
  questionText: string;
  options: string[];
  socket: Socket;
  gameId: number;
}

export default function HostShowQuestion(props: IShowQuestionProps) {
  const { options, questionText, playerName, socket, gameId } = props;

  function App() {
    const [counter, setCounter] = React.useState(15);
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
      <p>
        {part1}
        <b>{playerName}</b>
        {part2}
      </p>
    );
  }

  function onTimerSkipBtn() {
    socket.emit('timer-skip', gameId);
  }

  return (
    <>
      <App />
      {interpolatePlayerNameInQuestionText()}
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
      </div>
    </>
  );
}
