import * as React from "react";
import "../style.css";
import { Button, Paper, Grid } from "@mui/material";

interface IShowQuestionProps {
  playerName: string;
  questionText: string;
  options: string[];
}

export default function HostShowQuestion(props: IShowQuestionProps) {
  const { options, questionText, playerName } = props;

  function App() {
    const [counter, setCounter] = React.useState(10);
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
    </>
  );
}
