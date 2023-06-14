import { Socket } from 'socket.io';
import hostDb from '../db/host.ts';
import playerDb from '../db/player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import IGame from '../interfaces/IGame.ts';

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
        socket.emit('host-load-success', {...data, quizQuestionGuesses});
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
      const questionnaireQuestionsText = await hostDb.moveGameToQuestionnaire(gameId);
      await playerDb.updateAllPlayerStates(gameId, PlayerStates.FillingQuestionnaire, io, { questionnaireQuestionsText });
      const currentGameData: IGame | null = await hostDb.getGameData(gameId);
      io.to(currentGameData?.hostSocketId).emit('host-next', currentGameData);
    } catch (e) {
      console.error(`Failed to go to questionnaire: ${e}`)
    }
  }

  socket.on('host-open', onHostOpen);
  socket.on('host-load', onHostLoad);
  socket.on('delete-please', onDeletePlease);
  socket.on('host-start', onHostStart);
}
