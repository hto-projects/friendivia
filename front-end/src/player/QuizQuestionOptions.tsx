import * as React from 'react';
import '../style.css';
import { Button } from '@mui/material';
import { Socket } from 'socket.io-client';

interface IQuizQuestionOptionsProps {
  optionsList: string[],
  socket: Socket
}

export default function QuizQuestionOptions(props: IQuizQuestionOptionsProps) {
  const { optionsList, socket } = props;

  const answerQuestion = async (answerIndex: number): Promise<void> => {
    socket.emit('answer-question', answerIndex);
  }

  return (
    <div>
      <h4>Select your answer below</h4>
      {optionsList.map((o: String, i: number) => (
        <Button key={i} onClick={() => answerQuestion(i)}>{o}</Button>
      ))}
    </div>
  );
}
