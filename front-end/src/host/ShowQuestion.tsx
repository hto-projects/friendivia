import * as React from 'react';
import '../style.css';

interface IShowQuestionProps {
  playerName: string,
  questionText: string,
  options: string[]
}

export default function ShowQuestion(props: IShowQuestionProps) {
  const { options, questionText, playerName } = props;
  return (
    <>
      <p>How did <b>{playerName}</b> answer this question?</p>
      <p><b>{questionText}</b></p>
      <ul>
      {options.map((o: String, i: number) => (
        <li key={i}>{o}</li>
      ))}
      </ul>
    </>
  );
}
