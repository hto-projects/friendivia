import React from 'react';
import Join from './Join';
import { Socket } from 'socket.io-client';
import Questionnaire from './Questionnaire';
import QuizQuestionOptions from './QuizQuestionOptions';

interface PlayerAppProps {
  socket: Socket
}

export default function PlayerApp(props: PlayerAppProps) {
  const playerIdFromStorage = localStorage.getItem('player-id') || '';
  const [playerState, setPlayerState] = React.useState('');
  const [questionnaireQuestionsText, setQuestionnaireQuestionsText] = React.useState<string[]>([]);
  const [quizQuestionOptionsText, setQuizQuestionOptionsText] = React.useState<string[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const { socket } = props;

  if (!loaded) {
    socket.emit('player-load', playerIdFromStorage);
  }

  React.useEffect(() => {
    function onLoadSuccess(data: any) {
      setLoaded(true);
      setPlayerState(data.player.playerState.state);
      if (data && data.extraData && data.extraData.questionnaireQuestionsText) {
        setQuestionnaireQuestionsText(data.extraData.questionnaireQuestionsText);
      }

      if (data && data.extraData && data.extraData.quizQuestionOptionsText) {
        setQuizQuestionOptionsText(data.extraData.quizQuestionOptionsText);
      }
    }
  
    socket.on('player-load-success', onLoadSuccess);
    socket.on('player-next', onLoadSuccess);

    return () => {
      socket.off('player-load-success', onLoadSuccess);
      socket.off('player-next', onLoadSuccess);
    }
  }, [playerState, setPlayerState]);

  function getElementForState() {
    if (playerState === 'filling-questionnaire' || playerState === 'submitted-questionnaire-waiting') {
      return <Questionnaire socket={socket} playerState={playerState} questionnaireQuestionsText={questionnaireQuestionsText} />;
    } else if (playerState === 'seeing-question') {
      debugger;
      return <QuizQuestionOptions socket={socket} optionsList={quizQuestionOptionsText} />
    } else {
      return <Join socket={socket} playerState={playerState} />;
    }
  }

  return (
    <>
      <h1>Friendpardy</h1>
      {getElementForState()}
    </>
  );
}
