import { Socket } from 'socket.io';
import hostDb from '../db/host.ts';
import playerDb from '../db/player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import IGame from '../interfaces/IGame.ts';
import Game from '../models/Game.ts';

export default (io, socket: Socket) => {
  const onHostOpen = async () => {
    try {
      const newGameId = await hostDb.hostOpenGame(socket.id);
      socket.emit('host-open-success', newGameId);
    } catch (e) {
      socket.emit('host-open-error', e);
    }
  };

  const onHostLoad = async (gameId: number) => {
    if (gameId === -1) {
      return;
    }

    try {
      const dataForGame: any = await hostDb.getGameData(gameId);
      if (dataForGame) {     
        const data = dataForGame;
        const quizQuestionGuesses = await playerDb.getPlayerGuessesForQuizQuestion(gameId, data.currentQuestionIndex);
        const playerScores = await playerDb.getPlayerScores(gameId);
        await Game.updateOne({
          id: gameId
        }, { 
          $set: { 
            'hostSocketId': socket.id
          }
        });  
        socket.emit('host-load-success', {...data, quizQuestionGuesses, playerScores});
        
        const playersForGame = await playerDb.getPlayers(gameId);
        socket.emit('players-updated', {
          gameId: gameId,
          players: playersForGame
        });
            }
    } catch (e) {
      socket.emit('host-load-error', e);
    }
  };

  const onDeletePlease = async () => {
    try {
      await playerDb.deleteAllPlayers();
      await hostDb.deleteAllGames();
    } catch (e) {
      console.error("failed to delete all");
    }
  };

  const onHostStart = async (gameId) => {
    try {
      if ((await playerDb.getPlayers(gameId)).length >= 2) {
      const questionnaireQuestionsText = await hostDb.moveGameToQuestionnaire(gameId);
      await playerDb.updateAllPlayerStates(gameId, PlayerStates.FillingQuestionnaire, io, { questionnaireQuestionsText });
      const currentGameData: IGame | null = await hostDb.getGameData(gameId);
      io.to(currentGameData?.hostSocketId).emit('host-next', currentGameData);
      } else{console.log("Need at least two players")}
    } catch (e) {
      console.error(`Failed to go to questionnaire: ${e}`)
    }
  }

  socket.on('host-open', onHostOpen);
  socket.on('host-load', onHostLoad);
  socket.on('delete-please', onDeletePlease);
  socket.on('host-start', onHostStart);
}
