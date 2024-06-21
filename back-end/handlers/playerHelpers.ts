import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import Player from '../models/Player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import { Server } from 'socket.io';
import IQuizOption from '../interfaces/IQuizOption.ts';

export default {
  allPlayersGoToNextQuestion: async (gameId: number, io: Server): Promise<void> => {

    const currentGameData: IGame | null = await hostDb.getGameData(gameId);
    if (currentGameData === null) {
      return;
    }

    const currentQuestionIndex = currentGameData.currentQuestionIndex;
    const quizQuestionOptionsText: IQuizOption[] = currentGameData.quizQuestions[currentQuestionIndex].optionsList || [];
    const allPlayersInGame = await playerDb.getPlayers(gameId);
    for (let i = 0; i < allPlayersInGame.length; i++) {
      const player = allPlayersInGame[i]
      var state = "";
      if (allPlayersInGame[i].id === currentGameData.quizQuestions[currentQuestionIndex].playerId) {
        state = PlayerStates.QuestionAboutMe;
      } else {state = PlayerStates.QuestionBeingRead;}

      await Player.updateOne({
        id: player.id
      }, { 
        $set: { 
          'playerState.state': state
        }
      });      
      const updatedPlayer = await playerDb.getPlayer(player.id);
      if (!updatedPlayer) {
        return;
      }

      io.to(updatedPlayer.playerSocketId).emit('player-next', { player: updatedPlayer, extraData: {quizQuestionOptionsText}});}   
  },
     
  allPlayersTimesUp: async (gameId: number, io: Server): Promise<void> => {

    const currentGameData: IGame | null = await hostDb.getGameData(gameId);
    if (currentGameData === null) {
      return;
    }

    const allPlayersInGame = await playerDb.getPlayers(gameId);
    for (let i = 0; i < allPlayersInGame.length; i++) {
      const player = allPlayersInGame[i]
      var state = "";
      if (!(player.playerState.state === 'answered-quiz-question-waiting' || player.playerState.state === 'question-about-me')) {
        state = PlayerStates.DidNotAnswerQuestionWaiting;
        await Player.updateOne({
          id: player.id
        }, { 
          $set: { 
            'playerState.state': state
          }
        });

        const updatedPlayer = await playerDb.getPlayer(player.id);
        if (!updatedPlayer) {
          return;
        }

        io.to(updatedPlayer.playerSocketId).emit('player-next', { player: updatedPlayer });
      }
    }
  },

  allPlayersQuizTimerStarted: async (gameId: number, io: Server): Promise<void> => {
    const allPlayersInGame = await playerDb.getPlayers(gameId);
    for (let i = 0; i < allPlayersInGame.length; i++) {
      const player = allPlayersInGame[i];
      if (player.playerState.state === PlayerStates.QuestionBeingRead) {
        await Player.updateOne({
          id: player.id
        }, { 
          $set: { 
            'playerState.state': PlayerStates.SeeingQuestion
          }
        });
      }
      const updatedPlayer = await playerDb.getPlayer(player.id);

      io.to(player.playerSocketId).emit('player-next', { player: updatedPlayer});
    }
  }
}

  