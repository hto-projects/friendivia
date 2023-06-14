import * as React from 'react';
import '../style.css';

interface IShowAnswerProps {
  playerName: string,
  questionText: string,
  options: string[],
  correctAnswerIndex: number,
  playerGuesses: Array<any>
}

export default function HostShowAnswer(props: IShowAnswerProps) {
  const { options, questionText, playerName, correctAnswerIndex, playerGuesses } = props;

  function interpolatePlayerNameInQuestionText() {
    const [part1, part2] = questionText.split("<PLAYER>");
    return <p>{part1}<b>{playerName}</b>{part2}</p>;
  }

  return (
    <>
      {interpolatePlayerNameInQuestionText()}
      <div>
      {options.map((o: String, i: number) => (
        <div key={i} style={{border: "1px solid black", margin: "10px"}}>
          <p style={{background: i === correctAnswerIndex ? "yellow" : "white"}}>{o}</p>
          <p>Guessers: 
          {playerGuesses.filter(g => g.guess === i).map((g, j) => (
            <span key={j}>{g.name}</span>
          ))}
          </p>
        </div>
      ))}
      </div>
    </>
  );
}
