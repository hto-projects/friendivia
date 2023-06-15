import * as React from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";

interface IShowQuestionProps {
  playerName: string;
  questionText: string;
  options: string[];
}

export default function HostShowQuestion(props: IShowQuestionProps) {
  const { options, questionText, playerName } = props;

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
