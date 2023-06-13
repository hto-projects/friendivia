import React from 'react';
import Join from './Join';
import { Socket } from 'socket.io-client';
import Questionnaire from './Questionnaire';

interface PlayerAppProps {
  socket: Socket
}

export default function PlayerApp(props: PlayerAppProps) {
  const playerIdFromStorage = localStorage.getItem('player-id') || '';
  const [playerState, setPlayerState] = React.useState('');
  const [questionnaireQuestions, setQuestionnaireQuestions] = React.useState<string[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const { socket } = props;

  if (!loaded) {
    socket.emit('player-load', playerIdFromStorage);
  }

  React.useEffect(() => {
    function onLoadSuccess(data: any) {
      setLoaded(true);
      setPlayerState(data.player.playerState.state);
      if (data && data.gameData && data.gameData.questionnaireQuestions) {
        setQuestionnaireQuestions(data.gameData.questionnaireQuestions);
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
      return <Questionnaire socket={socket} playerState={playerState} questionnaireQuestions={questionnaireQuestions} />;
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
