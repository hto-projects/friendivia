import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import Player from '../models/Player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import { Server } from 'socket.io';

export default {
  allPlayersGoToNextQuestion: async (gameId: number, io: Server): Promise<void> => {

    const currentGameData: IGame | null = await hostDb.getGameData(gameId);
    if (currentGameData === null) {
      return;
    }

    const currentQuestionIndex = currentGameData.currentQuestionIndex;
    const quizQuestionOptionsText: string[] = currentGameData.quizQuestions[currentQuestionIndex].optionsList || [];
    const allPlayersInGame = await playerDb.getPlayers(gameId);
    for (let i = 0; i < allPlayersInGame.length; i++) {
      const player = allPlayersInGame[i]

      if (allPlayersInGame[i].id === currentGameData.quizQuestions[currentQuestionIndex].playerId) {
        await Player.updateOne({
          id: currentGameData.quizQuestions[currentQuestionIndex].playerId
        }, { 
          $set: { 
            'playerState.state': PlayerStates.QuestionAboutMe
          }
        });      
        const updatedPlayer = await playerDb.getPlayer(player.id);
        io.to(allPlayersInGame[i].playerSocketId).emit('player-next', { player: updatedPlayer, extraData: {quizQuestionOptionsText}});}
         else {
          await Player.updateOne({
            id: allPlayersInGame[i].id
          }, { 
            $set: { 
              'quizQuestionOptionsText': quizQuestionOptionsText,
              'playerState.state': PlayerStates.SeeingQuestion
            }
          });   
          const updatedPlayer = await playerDb.getPlayer(player.id);
          io.to(allPlayersInGame[i].playerSocketId).emit('player-next', { player: updatedPlayer, extraData: {quizQuestionOptionsText}});
           }
    }    
  }
}
