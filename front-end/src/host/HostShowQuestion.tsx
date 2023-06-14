import * as React from 'react';
import '../style.css';

interface IShowQuestionProps {
  playerName: string,
  questionText: string,
  options: string[]
}

export default function HostShowQuestion(props: IShowQuestionProps) {
  const { options, questionText, playerName } = props;

  function interpolatePlayerNameInQuestionText() {
    const [part1, part2] = questionText.split("<PLAYER>");
    return <p>{part1}<b>{playerName}</b>{part2}</p>;
  }

  return (
    <>
      {interpolatePlayerNameInQuestionText()}
      <ul>
      {options.map((o: String, i: number) => (
        <li key={i}>{o}</li>
      ))}
      </ul>
    </>
  );
}
