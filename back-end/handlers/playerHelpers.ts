import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import Player from '../models/Player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';

export default {
  allPlayersGoToNextQuestion: async (gameId: number): Promise<void> => {

    const currentGameData: IGame | null = await hostDb.getGameData(gameId);
    if (currentGameData === null) {
      return;
    }

    const currentQuestionIndex = currentGameData.currentQuestionIndex;
    const quizQuestionOptionsText: string[] = currentGameData.quizQuestions[currentQuestionIndex].optionsList || [];
    const allPlayersInGame = await playerDb.getPlayers(gameId);
    for (let i = 0; i < allPlayersInGame.length; i++) {
      if (allPlayersInGame[i].id === currentGameData.quizQuestions[currentQuestionIndex].playerId) {
        await Player.updateOne({
          id: currentGameData.quizQuestions[currentQuestionIndex].playerId
        }, { 
          $set: { 
            'playerState.state': PlayerStates.QuestionAboutMe
          }
        });      } else {
          await Player.updateOne({
            id: allPlayersInGame[i].id
          }, { 
            $set: { 
              'quizQuestionOptionsText': quizQuestionOptionsText,
              'playerState.state': PlayerStates.SeeingQuestion
            }
          });      }
    }    
  }
}
