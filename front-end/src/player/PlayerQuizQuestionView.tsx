import * as React from 'react';
import '../style.css';
import { Button } from '@mui/material';
import { Socket } from 'socket.io-client';
import PlayerWait from './PlayerWait';

interface IQuizQuestionViewProps {
  optionsList: string[],
  socket: Socket,
  playerState: {
    state: string,
    message: string
  }
}

export default function PlayerQuizQuestionView(props: IQuizQuestionViewProps) {
  const { optionsList, socket, playerState } = props;

  const guessReceivedMessage = `Guess received! Hang tight...`;

  const answerQuestion = async (answerIndex: number): Promise<void> => {
    socket.emit('player-answer-question', answerIndex);
  }

  const optionsForm = (
    <div>
      <h4>Select your answer below</h4>
      {optionsList.map((o: String, i: number) => (
        <Button key={i} onClick={() => answerQuestion(i)}>{o}</Button>
      ))}
      <p style={{color: 'red'}}>{playerState.message}</p>
    </div>
  );

  if (playerState.state === 'answered-quiz-question-waiting') {
    return <PlayerWait message={guessReceivedMessage} />;
  } else {
    return optionsForm;
  }
}
