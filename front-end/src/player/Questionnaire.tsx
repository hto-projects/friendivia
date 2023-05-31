import * as React from 'react';
import '../style.css';
import { Socket } from 'socket.io-client';
import QuestionnaireForm from './QuestionnaireForm';

interface IQuestionnaireProps {
  socket: Socket,
  playerState: string
}

const questionsToAsk = [
  "What is your favorite movie?",
  "What do you do for fun?",
  "Where were you born?"
]

export default function Questionnaire(props: IQuestionnaireProps) {
  const { socket, playerState } = props;
  const [questionnairePlayerState, setQuestionnairePlayerState] = React.useState({});

  React.useEffect(() => {
    if (playerState === 'submitted-questionnaire-waiting') {
      setQuestionnairePlayerState({
        state: 'submitted-questionnaire-waiting',
        message: ''
      });
    }
  }, [questionnairePlayerState, setQuestionnairePlayerState]);
  
  React.useEffect(() => {
    function onSubmitQuestionnaireSuccess(playerId: string) {
      localStorage.setItem('player-id', playerId);

      setQuestionnairePlayerState({
        state: 'submitted-questionnaire-waiting',
        message: ''
      });
    }

    function onSubmitQuestionnaireError(errorMsg: string) {
      setQuestionnairePlayerState({
        state: 'filling-questionnaire',
        message: errorMsg
      });
    }
  
    socket.on('player-submit-questionnaire-success', onSubmitQuestionnaireSuccess);
    socket.on('player-submit-questionnaire-error', onSubmitQuestionnaireError);

    return () => {
      socket.off('player-submit-questionnaire-success', onSubmitQuestionnaireSuccess);
      socket.off('player-submit-questionnaire-error', onSubmitQuestionnaireError);
    }
  }, [questionnairePlayerState, setQuestionnairePlayerState]);

  return (
    <QuestionnaireForm socket={socket} playerState={questionnairePlayerState} questions={questionsToAsk} />
  )
}
